import { useState, useEffect } from "react";
import {
  Blog,
  LoginForm,
  Menu,
  Notification,
  Users,
  SingleUserView,
} from "./components";
import blogService from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "./reducers/notificationsReducer";
import { getUsersList, loginUser, setUser } from "./reducers/userReducer";
import { initializeBlogs } from "./reducers/blogsReducer";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

const AppContent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();

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
    const result = await dispatch(loginUser({ username, password }));
    if (result) {
      setUsername("");
      setPassword("");
      dispatch(getUsersList());
      navigate("/");
    }
  };

  const loginForm = () => {
    return (
      <div>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
        <br />
      </div>
    );
  };

  return (
    <div className="container">
      <h1>Blogs</h1>
      <Notification />
      <Menu />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={loginForm()} />
        <Route path="/users/:id" element={<SingleUserView />} />
      </Routes>
    </div>
  );
};
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
