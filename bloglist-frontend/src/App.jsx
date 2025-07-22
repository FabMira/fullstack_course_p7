import { useState, useEffect, useRef } from "react";
import { Blog, BlogForm, LoginForm, Notification } from "./components";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Toggable from "./components/Toggable";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNotification,
  setNotification,
} from "./reducers/notificationsReducer";
import { initializeBlogs, setBlogs } from "./reducers/blogsReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginVisible(false);
    // Handle login logic here
    try {
      const user = await loginService.login({
        username,
        password,
      });

      blogService.setToken(user.token);
      setUser(user);
      dispatch(
        setNotification(
          `User ${username} successfully logged in`,
          "notification",
          5,
        ),
      );
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
    } catch (error) {
      dispatch(setNotification("Wrong credentials", "error", 5));
    }
  };

  useEffect(() => {
    console.log("Initializing blogs...");
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
      setUser(user);
      // blogService.setToken(user.token)
    }
  }, []);

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
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
          "notification",
          5,
        ),
      );
    } catch (error) {
      dispatch(setNotification("Error saving new blog", "error", 5));
    }
  };

  return (
    <div>
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
