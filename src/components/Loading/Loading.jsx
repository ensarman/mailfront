import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => (
  <div className="d-flex h-100 w-100">
    <Spinner animation="border" role="status" className="m-auto">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);

export default Loading;
