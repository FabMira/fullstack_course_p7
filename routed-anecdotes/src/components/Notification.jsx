import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);

  if (!notification) {
    return null;
  }

  return (
    <Alert variant="success" style={{ marginTop: "10px" }}>
      {notification}
    </Alert>
  );
};

export default Notification;
