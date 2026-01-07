import { Alert } from "react-bootstrap";
const AlertSample = () => {
  return (
    <div>
      {['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'].map((variant) => (
        <Alert key={variant} variant={variant} dismissible>
          This is a {variant} alert—check it out!
        </Alert>
      ))}
    </div>
  );
}
export default AlertSample;