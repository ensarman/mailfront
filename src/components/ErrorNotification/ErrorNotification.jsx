import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import "./ErrorNotification.scss";

const ErrorNotification = (props) => {
  const [show, setShow] = useState(true);

  const error = props.error.message;

  return (
    <div>
      <Toast
        className="flex ml-auto"
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        animation
      >
        <Toast.Header>
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>{error}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ErrorNotification;
