import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationsReducer";
import blogService from "../services/blogs";
import { setBlogs } from "../reducers/blogsReducer";
import { Button, ListGroup } from "react-bootstrap";

const Blog = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const updateBlog = async (blog) => {
    const blogToUpdate = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    try {
      await blogService.update(blogToUpdate, blog.id);
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (error) {
      dispatch(
        setNotification(`Error updating the blog ${blog.title}`, "error", 5),
      );
    }
  };

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog);
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
        dispatch(
          setNotification(`The blog ${blog.title}, was deleted.`, "success", 5),
        );
      } catch (error) {
        dispatch(
          setNotification(`Error deleting the blog ${blog.title}`, "danger", 5),
        );
      }
    }
  };

  const [visibleBlogs, setVisibleBlogs] = useState(new Set());

  const toggleVisible = (id) => {
    setVisibleBlogs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <ListGroup>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => {
          const isVisible = visibleBlogs.has(blog.id);
          return (
            <ListGroup.Item key={blog.id}>
              {blog.title}
              {". "}
              <span style={{ fontWeight: "bold" }}>{blog.author}</span>
              <div style={{ display: isVisible ? "none" : "" }}>
                <Button
                  variant="primary"
                  onClick={() => toggleVisible(blog.id)}
                >
                  view
                </Button>
              </div>
              <div style={{ display: isVisible ? "" : "none" }}>
                <div>
                  <Button
                    variant="secondary"
                    onClick={() => toggleVisible(blog.id)}
                  >
                    hide
                  </Button>
                </div>
                <p>{blog.url}</p>
                <p>
                  {blog.likes}{" "}
                  <Button variant="success" onClick={() => updateBlog(blog)}>
                    like
                  </Button>
                </p>
                <p>{blog.user?.name}</p>
                <Button variant="danger" onClick={() => removeBlog(blog)}>
                  remove
                </Button>
              </div>
            </ListGroup.Item>
          );
        })}
    </ListGroup>
  );
};

export default Blog;
