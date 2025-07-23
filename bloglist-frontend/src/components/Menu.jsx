import { Link, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";

const Menu = () => {
  const location = useLocation();
  const user = useSelector((state) => state.users.user);
  const padding = {
    paddingRight: 5,
    textDecoration: "none",
  };

  return (
    <Nav variant="pills" defaultActiveKey="/" activeKey={location.pathname}>
      <Nav.Item>
        <Link to="/" style={padding}>
          <Nav.Link href="/" as="span">
            Blogs
          </Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/users" style={padding}>
          <Nav.Link href="/users" as="span">
            Users
          </Nav.Link>
        </Link>
      </Nav.Item>
      <Nav.Item>
        {user ? (
          <div>
            <em>{user.name} logged in</em>
          </div>
        ) : (
          <Link to="/login" style={padding}>
            <Nav.Link href="/login" as="span">
              Login
            </Nav.Link>
          </Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default Menu;
