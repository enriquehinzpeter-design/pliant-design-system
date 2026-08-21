// C7 — the 404 page. No nav rail: the error state replaces the whole app frame.
function ErrorScreen({ onNavigate }) {
  const { ErrorPage, Button, Icon } = window.PliantDesignSystem_8f7377;
  if (!ErrorPage) return null;
  return (
    <ErrorPage icon={<Icon name="CloudX" size={34} />}
      title="Error 404 page not found"
      message="Sorry, we couldn't find the page you're looking for."
      action={<Button onClick={() => onNavigate && onNavigate('dashboard')}>Back to home</Button>} />
  );
}

Object.assign(window, { ErrorScreen });
