import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationsReducer";
import blogService from "../services/blogs";
import { setBlogs } from "../reducers/blogsReducer";

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
          setNotification(
            `The blog ${blog.title}, was deleted.`,
            "notification",
            5,
          ),
        );
      } catch (error) {
        dispatch(
          setNotification(`Error deleting the blog ${blog.title}`, "error", 5),
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
    <>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => {
          const isVisible = visibleBlogs.has(blog.id);
          return (
            <div key={blog.id} className="blogStyle">
              {blog.title}
              {". "}
              <span style={{ fontWeight: "bold" }}>{blog.author}</span>
              <div style={{ display: isVisible ? "none" : "" }}>
                <button onClick={() => toggleVisible(blog.id)}>view</button>
              </div>
              <div style={{ display: isVisible ? "" : "none" }}>
                <div>
                  <button onClick={() => toggleVisible(blog.id)}>hide</button>
                </div>
                <p>{blog.url}</p>
                <p>
                  {blog.likes}{" "}
                  <button onClick={() => updateBlog(blog)}>like</button>
                </p>
                <p>{blog.user?.name}</p>
                <button onClick={() => removeBlog(blog)}>remove</button>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Blog;
