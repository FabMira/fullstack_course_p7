import PropTypes from "prop-types";
import { Button, Form, InputGroup } from "react-bootstrap";

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Login</h2>

      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            data-testid="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">🔒</InputGroup.Text>
          <Form.Control
            type="password"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon2"
            data-testid="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </InputGroup>
        <Form.Group className="mb-3">
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
