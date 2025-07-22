import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });
  return (
    <div>
      <div style={hideWhenVisible}>
        <Form.Group className="mb-3">
          <Button variant="primary" onClick={toggleVisibility}>
            {props.buttonLabel}
          </Button>
        </Form.Group>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Form.Group className="mb-3">
          <Button variant="danger" onClick={toggleVisibility}>
            cancel
          </Button>
        </Form.Group>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
