import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";

class Register extends Component {
  state = {};
  render() {
    return (
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Form style={{ padding: 50, minWidth: 300 }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter Username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="outline-warning" type="submit">
            REGISTER
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Register;
