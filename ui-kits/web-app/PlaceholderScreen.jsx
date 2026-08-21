function PlaceholderScreen({ screen, title, breadcrumb, onNavigate }) {
  return (
    <AppShell active={screen} onNavigate={onNavigate} breadcrumb={breadcrumb} title={title}>
      <EmptyState message="Not captured in the reference screenshots." />
    </AppShell>
  );
}
Object.assign(window, { PlaceholderScreen });
