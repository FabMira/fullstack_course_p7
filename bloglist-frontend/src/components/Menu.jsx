import { Link, useLocation } from "react-router-dom";
import { Button, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import blogService from "../services/blogs";

const Menu = () => {
  const location = useLocation();
  const user = useSelector((state) => state.users.user);
  const padding = {
    paddingRight: 5,
    textDecoration: "none",
  };
  const dispatch = useDispatch();

  return (
    <Nav variant="pills" defaultActiveKey="/" activeKey={location.pathname}>
      <Nav.Item>
        <Link to="/" style={padding} className="nav-link">
          <Nav.Link href="/" as="span">
            Blogs
          </Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/users" style={padding} className="nav-link">
          <Nav.Link href="/users" as="span">
            Users
          </Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        {user ? (
          <div>
            <em style={{ paddingRight: 10 }}>{user.name} logged in</em>
          </div>
        ) : (
          <Link to="/login" style={padding} className="nav-link">
            <Nav.Link href="/login" as="span">
              Login
            </Nav.Link>
          </Link>
        )}
      </Nav.Item>
      {user && (
        <Button
          variant="danger"
          onClick={() => {
            window.localStorage.removeItem("loggedBlogAppUser");
            dispatch(setUser(null));
            blogService.setToken(null);
          }}
        >
          Logout
        </Button>
      )}
    </Nav>
  );
};

export default Menu;
