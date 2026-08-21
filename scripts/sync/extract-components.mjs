#!/usr/bin/env node
/**
 * Extracts the @pliant/ui component library into `components/`.
 *
 * Source of truth: infinnity-frontend packages/ui/src — index.ts (the export
 * surface), components/<Name>/index.tsx (each component's real source), the
 * theme/overrides/* modules (where the Pliant restyling actually lives), and
 * components/<Name>/index.stories.tsx (canonical usage).
 *
 * Everything mechanical is read from that source. Everything interpretive —
 * grouping and per-component guidance — comes from ./component-notes.json,
 * which is reviewed by the design team. The two are merged here so a re-run
 * after a design-system release produces a reviewable diff instead of prose
 * drift.
 *
 * Usage:
 *   node scripts/sync/extract-components.mjs <path-to-infinnity-frontend>
 */

import { mkdir, readdir, readFile, writeFile, rm, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const frontend = process.argv[2];
if (!frontend) {
  console.error(
    'usage: node scripts/sync/extract-components.mjs <path-to-infinnity-frontend>'
  );
  process.exit(1);
}

const REPO = resolve(import.meta.dirname, '../..');
const UI = join(frontend, 'packages/ui/src');
const SRC = join(UI, 'components');
const OVERRIDES = join(UI, 'theme/overrides');
const OUT = join(REPO, 'components');

const notes = JSON.parse(
  await readFile(join(import.meta.dirname, 'component-notes.json'), 'utf8')
);

const exists = async (p) => {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
};

// ---------------------------------------------------------------------------
// The export surface. index.ts is the contract: what it re-exports is the
// library, in the order the package declares it.
// ---------------------------------------------------------------------------
const indexTs = await readFile(join(UI, 'index.ts'), 'utf8');
const componentNames = [
  ...indexTs.matchAll(/^export \* from '\.\/components\/([A-Za-z0-9]+)';$/gm),
].map((m) => m[1]);
const nonComponentExports = [
  ...indexTs.matchAll(/^export \* from '\.\/(?!components\/)([^']+)';$/gm),
].map((m) => m[1]);

if (!componentNames.length) {
  throw new Error(`${UI}/index.ts: no component exports matched — layout changed.`);
}

// ---------------------------------------------------------------------------
// Which theme override module restyles which component. The naming convention
// is Mui<Name>Overrides.tsx, and a module may target several MUI components
// (MuiAlertOverrides also styles MuiAlertTitle), so index by the MUI keys the
// module actually declares rather than by filename alone.
// ---------------------------------------------------------------------------
const overrideFiles = (await readdir(OVERRIDES)).filter((f) => f.endsWith('.tsx'));
const overridesByMuiKey = new Map();
for (const file of overrideFiles) {
  const source = await readFile(join(OVERRIDES, file), 'utf8');
  for (const [, key] of source.matchAll(/^\s{2}(Mui[A-Za-z]+):\s*\{$/gm)) {
    if (!overridesByMuiKey.has(key)) overridesByMuiKey.set(key, []);
    overridesByMuiKey.get(key).push({ file, source });
  }
}

// createTheme decides which override modules are actually wired in. A module on
// disk that createTheme never spreads has no effect, and saying otherwise would
// be a lie in 88 files at once.
const createThemeSource = await readFile(join(UI, 'theme/createTheme.ts'), 'utf8');
const wiredModules = new Set(
  [...createThemeSource.matchAll(/\.\.\.(Mui[A-Za-z]+Overrides),?$/gm)].map(
    (m) => `${m[1]}.tsx`
  )
);
const unwired = overrideFiles.filter((f) => !wiredModules.has(f));

// ---------------------------------------------------------------------------
// Per-component facts, read from its own source.
// ---------------------------------------------------------------------------
const collect = async (name) => {
  const dir = join(SRC, name);
  const file = (await exists(join(dir, 'index.tsx')))
    ? join(dir, 'index.tsx')
    : join(dir, 'index.ts');
  const source = await readFile(file, 'utf8');
  const ext = file.endsWith('.tsx') ? 'tsx' : 'ts';

  // A pure re-export forwards the default straight out of @mui/material.
  const reExport = source.match(
    /^export \{ default as \w+ \} from '@mui\/material\/(\w+)';$/m
  );
  // Only a PascalCase subpath is a MUI component; `@mui/material/styles` and
  // friends are utility imports and would otherwise be reported as the base
  // component of anything that imports `styled` or `alpha`.
  const muiImport = [...source.matchAll(/from '@mui\/material\/([A-Z]\w+)'/g)][0];
  const muiBase = reExport?.[1] ?? muiImport?.[1] ?? null;

  const typeExports = [
    ...source.matchAll(/^export (?:type|interface) ([A-Za-z0-9]+)/gm),
  ].map((m) => m[1]);
  const valueExports = [...source.matchAll(/^export const ([A-Za-z0-9]+)/gm)].map(
    (m) => m[1]
  );
  const reExportedTypes = [
    ...source.matchAll(/^export type \{ ([A-Za-z0-9]+)/gm),
  ].map((m) => m[1]);
  const reExportedValues = [
    ...source.matchAll(/^export \{ (?:default as )?([A-Za-z0-9]+)/gm),
  ].map((m) => m[1]);

  const types = new Set([...typeExports, ...reExportedTypes]);
  const values = [...new Set([...reExportedValues, ...valueExports])];
  const exportNames = [...new Set([...values, ...types])];

  // `declare module` blocks are how this library widens MUI's prop unions —
  // the tinted Chip variant, the neutral Button colour. They are real API and
  // invisible unless you read the source, so surface them.
  const augmentations = [];
  for (const [, target, bodyRaw] of source.matchAll(
    /declare module '([^']+)' \{([\s\S]*?)\n\}/g
  )) {
    const added = [
      ...bodyRaw.matchAll(/^\s{4}'?([A-Za-z0-9-]+)'?\??:\s*(?:true|boolean|CSSProperties)/gm),
    ].map((m) => m[1]);
    if (added.length) augmentations.push({ target, added });
  }

  const jsdoc = [...source.matchAll(/\/\*\*\s*\n([\s\S]*?)\*\//g)]
    .map(([, block]) =>
      block
        .split('\n')
        .map((l) => l.replace(/^\s*\*\s?/, '').trimEnd())
        .join('\n')
        .trim()
    )
    .filter((text) => text && !text.startsWith('The color of the component'));

  const storyFile = join(dir, 'index.stories.tsx');
  let stories = [];
  if (await exists(storyFile)) {
    const storySource = await readFile(storyFile, 'utf8');
    stories = [...storySource.matchAll(/^export const ([A-Za-z0-9_]+)/gm)].map(
      (m) => m[1]
    );
  }

  const applicable = [];
  const seen = new Set();
  for (const key of [`Mui${name}`, muiBase ? `Mui${muiBase}` : null].filter(Boolean)) {
    for (const entry of overridesByMuiKey.get(key) ?? []) {
      if (seen.has(entry.file)) continue;
      seen.add(entry.file);
      applicable.push({ ...entry, muiKey: key, wired: wiredModules.has(entry.file) });
    }
  }

  return {
    name,
    kind: reExport ? 're-export' : 'wrapper',
    sourcePath: `packages/ui/src/components/${name}/index.${ext}`,
    lines: source.split('\n').filter((l) => l.trim()).length,
    muiBase,
    exportNames,
    valueExports: values,
    typeExports: [...types],
    augmentations,
    jsdoc,
    stories,
    storyPath: stories.length
      ? `packages/ui/src/components/${name}/index.stories.tsx`
      : null,
    overrides: applicable,
    note: notes.components?.[name] ?? null,
    group: notes.components?.[name]?.group ?? 'Unsorted',
  };
};

const components = [];
for (const name of componentNames) components.push(await collect(name));

// ---------------------------------------------------------------------------
// Emit one doc per component.
// ---------------------------------------------------------------------------
const fence = (lang, body) => `\`\`\`${lang}\n${body.trim()}\n\`\`\``;

const renderDoc = (c) => {
  const out = [];
  out.push(`# ${c.name}`);
  out.push('');
  out.push(
    `**Group:** ${c.group} · **Kind:** ${
      c.kind === 're-export'
        ? `MUI re-export (\`@mui/material/${c.muiBase}\`)`
        : c.muiBase
          ? `Pliant wrapper around \`@mui/material/${c.muiBase}\``
          : 'Pliant component (no MUI base)'
    }`
  );
  out.push('');
  out.push(`> Synced from \`infinnity-frontend\` \`${c.sourcePath}\`.`);
  out.push('');

  if (c.note?.summary) {
    out.push(c.note.summary);
    out.push('');
  }

  for (const doc of c.jsdoc) {
    out.push(`> ${doc.replace(/\n/g, '\n> ')}`);
    out.push('');
  }

  out.push('## Import');
  out.push('');
  out.push(
    fence(
      'tsx',
      `import { ${(c.valueExports.length ? c.valueExports : [c.name]).join(', ')} } from '@pliant/ui';`
    )
  );
  out.push('');

  out.push('## API');
  out.push('');
  if (c.kind === 're-export') {
    out.push(
      `Re-exported from \`@mui/material/${c.muiBase}\`. Props are MUI's \`${c.muiBase}Props\`${
        c.augmentations.length
          ? ', widened by the augmentations below'
          : ' — this library adds no props of its own'
      }.`
    );
  } else {
    out.push(
      `Exports \`${c.valueExports.join('`, `')}\`${
        c.typeExports.length
          ? `, with types \`${c.typeExports.join('`, `')}\``
          : ''
      }.`
    );
  }
  out.push('');

  if (c.augmentations.length) {
    out.push(
      'Extends MUI\'s prop unions (via `declare module`) — these values are Pliant-only and will not appear in MUI\'s own docs:'
    );
    out.push('');
    for (const aug of c.augmentations) {
      out.push(
        `- \`${aug.target}\`: ${aug.added.map((a) => `\`${a}\``).join(', ')}`
      );
    }
    out.push('');
  }

  if (c.note?.api) {
    out.push(c.note.api);
    out.push('');
  }

  out.push('## Pliant restyling');
  out.push('');
  if (!c.overrides.length) {
    out.push(
      c.muiBase
        ? 'None. This component inherits the theme (palette, typography, `shape.borderRadius`) but has no component-level override module, so its MUI defaults stand.'
        : 'No override module — this component is not a MUI component, so it reads tokens directly in its own source (see the source path above).'
    );
    out.push('');
  } else {
    for (const o of c.overrides) {
      out.push(
        `\`${o.file}\`${o.wired ? '' : ' — **not wired into `createTheme`, so it has no effect**'}:`
      );
      out.push('');
      out.push(fence('tsx', o.source));
      out.push('');
    }
  }

  if (c.note?.rules?.length) {
    out.push('## Rules');
    out.push('');
    for (const rule of c.note.rules) out.push(`- ${rule}`);
    out.push('');
  }

  out.push('## Usage');
  out.push('');
  if (c.stories.length) {
    out.push(
      `Canonical usage is the Storybook story set — \`${c.storyPath}\` (${c.stories.length} ${
        c.stories.length === 1 ? 'story' : 'stories'
      }):`
    );
    out.push('');
    out.push(c.stories.map((s) => `\`${s}\``).join(' · '));
    out.push('');
  } else {
    out.push(
      'No Storybook story. Usage is not captured here — read the component source, or the call sites in `infinnity-frontend`, before assuming behaviour.'
    );
    out.push('');
  }

  if (c.note?.usage) {
    out.push(c.note.usage);
    out.push('');
  }

  return `${out.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`;
};

// A stale component folder from a previous sync would otherwise linger, so the
// tree is rebuilt from the current export surface every run.
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const c of components) {
  await mkdir(join(OUT, c.name), { recursive: true });
  await writeFile(join(OUT, c.name, `${c.name}.md`), renderDoc(c));
}

// ---------------------------------------------------------------------------
// Inventory.
// ---------------------------------------------------------------------------
const byGroup = new Map();
for (const c of components) {
  if (!byGroup.has(c.group)) byGroup.set(c.group, []);
  byGroup.get(c.group).push(c);
}
const groupOrder = notes.groupOrder ?? [...byGroup.keys()];
const groups = [...byGroup.keys()].sort(
  (a, b) =>
    (groupOrder.indexOf(a) + 1 || 999) - (groupOrder.indexOf(b) + 1 || 999) ||
    a.localeCompare(b)
);

const readme = [];
readme.push('# Components — `@pliant/ui`');
readme.push('');
readme.push(
  `Generated by \`scripts/sync/extract-components.mjs\` from \`infinnity-frontend\` \`packages/ui/src\`. Do not edit these files by hand — corrections belong in the codebase (for anything mechanical) or in \`scripts/sync/component-notes.json\` (for guidance), so they survive the next sync.`
);
readme.push('');
readme.push(
  `**${components.length} components.** ${
    components.filter((c) => c.kind === 're-export').length
  } are re-exported straight from MUI (${
    components.filter((c) => c.kind === 're-export' && c.augmentations.length).length
  } of those widen MUI's prop unions with Pliant-only values); ${
    components.filter((c) => c.kind === 'wrapper').length
  } are Pliant wrappers with their own code. ${
    components.filter((c) => c.stories.length).length
  } have Storybook stories. ${
    components.filter((c) => c.overrides.length).length
  } are restyled by a theme override module.`
);
readme.push('');
readme.push(notes.readmeIntro ?? '');
readme.push('');

for (const group of groups) {
  const list = byGroup.get(group);
  readme.push(`## ${group}`);
  readme.push('');
  readme.push('| Component | Kind | Restyled | Stories |');
  readme.push('|---|---|---|---|');
  for (const c of list.sort((a, b) => a.name.localeCompare(b.name))) {
    readme.push(
      `| [${c.name}](${c.name}/${c.name}.md) | ${
        c.kind === 're-export' ? `MUI \`${c.muiBase}\`` : 'wrapper'
      } | ${c.overrides.length ? c.overrides.map((o) => `\`${o.file.replace('.tsx', '')}\``).join(', ') : '—'} | ${
        c.stories.length || '—'
      } |`
    );
  }
  readme.push('');
}

readme.push('## Export surface');
readme.push('');
readme.push(
  `\`packages/ui/src/index.ts\` re-exports ${componentNames.length} components plus ${nonComponentExports.length} non-component entries — ${nonComponentExports
    .map((e) => `\`${e}\``)
    .join(', ')} — for ${
    componentNames.length + nonComponentExports.length
  } export statements in total.`
);
readme.push('');

if (unwired.length) {
  readme.push('## Override modules with no effect');
  readme.push('');
  readme.push(
    `These override modules exist under \`packages/ui/src/theme/overrides/\` but \`createTheme.ts\` never spreads them, so they do not reach any component: ${unwired
      .map((f) => `\`${f}\``)
      .join(', ')}.`
  );
  readme.push('');
}

readme.push(notes.readmeOutro ?? '');

await writeFile(
  join(OUT, 'README.md'),
  `${readme.join('\n').replace(/\n{3,}/g, '\n\n').trim()}\n`
);

const unsorted = components.filter((c) => c.group === 'Unsorted').map((c) => c.name);
console.log(
  `components/: ${components.length} docs written ` +
    `(${components.filter((c) => c.kind === 'wrapper').length} wrappers, ` +
    `${components.filter((c) => c.stories.length).length} with stories).`
);
if (unsorted.length) {
  console.log(
    `  ! ungrouped (add to component-notes.json): ${unsorted.join(', ')}`
  );
}
if (unwired.length) {
  console.log(`  ! override modules not wired into createTheme: ${unwired.join(', ')}`);
}
