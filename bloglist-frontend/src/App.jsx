import { useState, useEffect, useRef } from "react";
import { Blog, BlogForm, LoginForm, Notification } from "./components";
import blogService from "./services/blogs";
import Toggable from "./components/Toggable";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNotification,
  setNotification,
} from "./reducers/notificationsReducer";
import { loginUser, setUser } from "./reducers/userReducer";
import { initializeBlogs, setBlogs } from "./reducers/blogsReducer";
import { Button, Form } from "react-bootstrap";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginVisible, setLoginVisible] = useState(false);
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(clearNotification());
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      window.localStorage.clear();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginVisible(false);
    dispatch(loginUser({ username, password }));
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <Form.Group className="mb-3">
            <Button variant="primary" onClick={() => setLoginVisible(true)}>
              log in
            </Button>
          </Form.Group>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <Button variant="secondary" onClick={() => setLoginVisible(false)}>
            cancel
          </Button>
        </div>
      </div>
    );
  };

  const addBlog = async (blogObject) => {
    dispatch(clearNotification());
    try {
      const req = await blogService.create(blogObject);
      console.log("blogs updated:", blogs.concat(req));
      dispatch(setBlogs(blogs.concat(req)));
      blogFormRef.current.toggleVisibility();
      dispatch(
        setNotification(
          `a new blog ${req.title}, by ${req.author} added.`,
          "success",
          5,
        ),
      );
    } catch (error) {
      dispatch(setNotification("Error saving new blog", "danger", 5));
    }
  };

  return (
    <div className="container">
      <h1>Blogs</h1>
      <Notification />
      {!user && loginForm()}
      {user && (
        <div>
          <Toggable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Toggable>
        </div>
      )}
      <Blog />
    </div>
  );
};

export default App;
