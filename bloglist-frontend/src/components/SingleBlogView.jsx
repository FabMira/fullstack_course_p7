import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Card, Form, ListGroup } from "react-bootstrap";
import blogService from "../services/blogs";
import { setBlogs } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationsReducer";
import { useDispatch } from "react-redux";

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
      comments: blog.comments || [],
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

  const addComment = async (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    if (!comment) {
      dispatch(setNotification("Comment cannot be empty", "danger", 5));
      return;
    }
    try {
      await blogService.postComment(blog.id, comment);
      event.target.comment.value = ""; // Clear the input field
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (error) {
      dispatch(setNotification("Error adding comment", "danger", 5));
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
          <strong>Likes:</strong> {blog.likes}
          <Button className="ms-3" onClick={() => updateBlog(blog)}>
            Like
          </Button>
        </Card.Text>
        <Card.Text>
          <strong>Added by:</strong> {blog.user?.name || "Unknown"}
        </Card.Text>
        <strong>Comments:</strong>
        <Form onSubmit={addComment}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Add a comment"
              name="comment"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mb-3">
            add comment
          </Button>
        </Form>
        <ListGroup className="mt-3">
          {blog.comments && blog.comments.length > 0 ? (
            blog.comments.map((comment, index) => (
              <ListGroup.Item key={index}>{comment}</ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No comments yet.</ListGroup.Item>
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default SingleBlogView;
