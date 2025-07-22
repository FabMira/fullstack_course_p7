import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);

  return (
    notification.message != "" && (
      <Alert
        variant={notification.className}
        className={notification.className}
      >
        <Alert.Heading>{notification.message}</Alert.Heading>
      </Alert>
    )
  );
};

export default Notification;
