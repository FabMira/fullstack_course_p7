import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import blogService from "../services/blogs";
import { setBlogs } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationsReducer";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

const SingleBlogView = () => {
  const { id } = useParams();
  const blog = useSelector((state) =>
    (state.blogs || []).find((b) => b.id === id),
  );
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

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          by {blog.author}
        </Card.Subtitle>
        <Card.Text>
          <strong>URL:</strong> <a href={blog.url}>{blog.url}</a>
        </Card.Text>
        <Card.Text>
          <strong>Likes:</strong> {blog.likes}{" "}
          <Button onClick={() => updateBlog(blog)}>Like</Button>
        </Card.Text>
        <Card.Text>
          <strong>Added by:</strong> {blog.user?.name || "Unknown"}
        </Card.Text>
        {/* You can add like/remove buttons here if needed */}
      </Card.Body>
    </Card>
  );
};

export default SingleBlogView;
