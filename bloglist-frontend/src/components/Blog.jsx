import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationsReducer";
import blogService from "../services/blogs";
import { setBlogs } from "../reducers/blogsReducer";
import { ListGroup } from "react-bootstrap";
import BlogForm from "./BlogForm";
import Togglable from "./Toggable";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.users.user);
  const blogFormRef = useRef();
  const dispatch = useDispatch();

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
    <div>
      {user && (
        <div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
        </div>
      )}
      <ListGroup style={{ paddingBottom: 20 }}>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => {
            return (
              <Link
                to={`/blogs/${blog.id}`}
                key={blog.id}
                style={{ textDecoration: "none" }}
              >
                <ListGroup.Item>
                  {blog.title}
                  {". "}
                  <span style={{ fontWeight: "bold" }}>{blog.author}</span>
                </ListGroup.Item>
              </Link>
            );
          })}
      </ListGroup>
    </div>
  );
};

export default Blog;
