import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationsReducer";
import blogService from "../services/blogs";
import { setBlogs } from "../reducers/blogsReducer";
import { Button, ListGroup } from "react-bootstrap";
import BlogForm from "./BlogForm";
import Togglable from "./Toggable";
import { logoutUser } from "../reducers/userReducer";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.users.user);
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  // const updateBlog = async (blog) => {
  //   const blogToUpdate = {
  //     user: blog.user.id,
  //     likes: blog.likes + 1,
  //     author: blog.author,
  //     title: blog.title,
  //     url: blog.url,
  //   };
  //   try {
  //     await blogService.update(blogToUpdate, blog.id);
  //     const blogs = await blogService.getAll();
  //     dispatch(setBlogs(blogs));
  //   } catch (error) {
  //     dispatch(
  //       setNotification(`Error updating the blog ${blog.title}`, "error", 5),
  //     );
  //   }
  // };

  // const removeBlog = async (blog) => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
  //     try {
  //       await blogService.remove(blog);
  //       const blogs = await blogService.getAll();
  //       dispatch(setBlogs(blogs));
  //       dispatch(
  //         setNotification(`The blog ${blog.title}, was deleted.`, "success", 5),
  //       );
  //     } catch (error) {
  //       dispatch(
  //         setNotification(`Error deleting the blog ${blog.title}`, "danger", 5),
  //       );
  //     }
  //   }
  // };

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
          <Button
            variant="primary"
            style={{ marginBottom: 10 }}
            onClick={() => dispatch(logoutUser())}
          >
            logout
          </Button>
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
