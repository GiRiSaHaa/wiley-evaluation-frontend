import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logoutUser } from "../../services/index";

class NavigationBar extends Component {
  logout = () => {
    this.props.logoutUser();
  };

  render() {
    const guestLinks = (
      <>
        <div className="mr-auto"></div>
        <Link to="/register" className="nav-link">
          <Button variant="outline-warning">REGISTER</Button>
        </Link>
        <Link to="/login" className="nav-link">
          <Button variant="outline-success">SIGN IN</Button>
        </Link>
      </>
    );

    const authLinks = (
      <>
        <div className="mr-auto"></div>
        <Link to="/logout" className="nav-link">
          <Button variant="outline-success" onClick={this.logout}>
            LOGOUT
          </Button>
        </Link>
      </>
    );
    return (
      <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
        <Link to="/" className="navbar-brand">
          <img
            src="https://djuandererstravel.com/wp-content/uploads/2017/12/hotelbook-1024x359.png"
            alt="logo"
            style={{ width: 200 }}
          />
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/deals" className="nav-link">
              Deals
            </Link>
          </Nav>
          <Nav className="ml-auto">
            {localStorage.getItem("jwtToken") != null ? authLinks : guestLinks}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
