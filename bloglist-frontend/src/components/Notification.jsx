import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);

  if (!notification) {
    return null;
  }

  return (
    <Alert variant="success" className={notification.className}>
      {notification.message}
    </Alert>
  );
};

export default Notification;
