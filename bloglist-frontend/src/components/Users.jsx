import { useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/userReducer";

const Users = () => {
  const users = useSelector((state) => state.users.list);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Users</h2>
      {user ? (
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
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Blogs</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.blogs.length}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <Navigate replace to="/login" />
      )}
    </div>
  );
};

export default Users;
