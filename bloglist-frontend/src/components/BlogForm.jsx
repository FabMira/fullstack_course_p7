import { useState } from "react";
import { Button, Form, FloatingLabel } from "react-bootstrap";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [formData, setFormData] = useState({ title: "", author: "", url: "" });

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: formData.title,
      author: formData.author,
      url: formData.url,
    });
    setFormData({ title: "", author: "", url: "" });
  };

  const handleBlogChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Create a new Blog</h2>

      <Form onSubmit={addBlog}>
        <FloatingLabel
          controlId="floatingInput_title"
          label="Title of the blog"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Title"
            value={formData.title}
            data-testid="title"
            name="title"
            onChange={handleBlogChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput_author"
          label="Author of the blog"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Author"
            value={formData.author}
            data-testid="author"
            name="author"
            onChange={handleBlogChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput_url"
          label="Url of the blog"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Url"
            value={formData.url}
            data-testid="url"
            name="url"
            onChange={handleBlogChange}
          />
        </FloatingLabel>
        <Form.Group className="mb-3">
          <Button variant="primary" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
