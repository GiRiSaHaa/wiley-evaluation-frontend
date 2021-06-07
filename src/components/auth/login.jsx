import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authenticateUser } from "../../services/index";
import {
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUser,
  faLock,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    username: "",
    password: "",
    error: "",
  };

  credentialChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  validateUser = () => {
    this.props.authenticateUser(this.state.username, this.state.password);
    setTimeout(() => {
      if (this.props.auth.isLoggedIn) {
        const { location } = this.props;
        console.log(this.props);
        if (location && location.pathname && location.pathname !== "/login") {
          console.log(location.pathname);
          this.props.history.push(location.pathname);
        } else {
          this.props.history.push("/");
        }
      } else {
        this.resetLoginForm();
        this.setState({ error: "Invalid username or password" });
      }
    }, 500);
  };

  resetLoginForm = () => {
    this.setState(() => this.initialState);
  };

  render() {
    const formStyle = {
      position: "absolute",
      top: "45%",
      left: "50%",
      marginTop: "-100px",
      marginLeft: "-155px",
    };
    const { username, password, error } = this.state;
    return (
      <Row className="justify-content-md-center" style={formStyle}>
        <Col style={{ minWidth: "max-content" }}>
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Card.Header>
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      autoComplete="off"
                      type="text"
                      name="username"
                      value={username}
                      onChange={this.credentialChange}
                      className={"bg-dark text-white"}
                      placeholder="Enter Username"
                    />
                  </InputGroup>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faLock} />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      required
                      autoComplete="off"
                      type="password"
                      name="password"
                      value={password}
                      onChange={this.credentialChange}
                      className={"bg-dark text-white"}
                      placeholder="Enter Password"
                    />
                  </InputGroup>
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "center" }}>
              <Button
                size="sm"
                type="button"
                variant="outline-success"
                onClick={this.validateUser}
                disabled={
                  this.state.username.length === 0 ||
                  this.state.password.length === 0
                }
              >
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Button>{" "}
              <Button
                size="sm"
                type="button"
                variant="outline-info"
                onClick={this.resetLoginForm}
                disabled={
                  this.state.username.length === 0 &&
                  this.state.password.length === 0 &&
                  this.state.error.length === 0
                }
              >
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>
              <div style={{ fontSize: 10 }}>
                <span>Don't have an account?</span>
                <Link to="/register" className="nav-link">
                  <Button
                    size="sm"
                    style={{ padding: "initial" }}
                    variant="outline-secondary"
                  >
                    REGISTER
                  </Button>
                </Link>
              </div>
            </Card.Footer>
          </Card>
          {error && <Alert variant="danger">{error}</Alert>}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: (username, password) =>
      dispatch(authenticateUser(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
