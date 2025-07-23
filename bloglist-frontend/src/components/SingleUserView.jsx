import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SingleUserView = () => {
  const { id } = useParams();
  const user = useSelector((state) =>
    (state.users.list || []).find((u) => u.id === id),
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div>
      <Button
        variant="primary"
        onClick={() => {
          dispatch(logoutUser());
          navigate("/login");
        }}
        className="mb-3"
      >
        logout
      </Button>
      <h2>{user.name}</h2>
      <h4>Added blogs</h4>
      <ListGroup className="pb-3">
        {user.blogs && user.blogs.length > 0 ? (
          user.blogs.map((blog) => (
            <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No blogs added.</ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default SingleUserView;
