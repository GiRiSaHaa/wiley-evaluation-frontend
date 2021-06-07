import React, { Component } from "react";
import { Navbar, Container, Col } from "react-bootstrap";

class Footer extends Component {
  render() {
    let year = new Date().getFullYear();
    return (
      <Navbar fixed="bottom" bg="dark" variant="dark">
        <Container>
          <Col lg={12} className="text-center text-muted">
            <div>
              <b>Travel Lodge Hotel System,</b> The world leader in online
              travel and related services.
              <br />
              <span style={{ fontSize: 12 }}>
                Copyright © {year} Travel Lodge Hotel System™. All rights
                reserved
              </span>
            </div>
          </Col>
        </Container>
      </Navbar>
    );
  }
}

export default Footer;
