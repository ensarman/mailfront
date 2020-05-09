import React from "react";
import "./login.scss";
import { FormControl } from "react-bootstrap";
import { Button } from "react-bootstrap";

function Login() {
  return (
    <div className="login">
      <div className="login_form">
        <div>
          <FormControl placeholder="username" />
        </div>
        <div>
          <FormControl type="password" placeholder="password" />
        </div>
        <div>
          <Button label="Login"> Login</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
