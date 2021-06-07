import React, { Component } from "react";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Hotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
    };
  }
  render() {
    return (
      <Container style={{ padding: "10px" }}>
        <Card border="success">
          <Card.Body>
            <Row>
              <Col xl={3} xs={12}>
                <Card
                  border="light"
                  bg="secondary"
                  style={{ minHeight: "200px" }}
                >
                  <img src={this.state.data.imgUrl} alt="img" />
                </Card>
              </Col>
              <Col xl={9} xs={12}>
                <Card border="light" bg="light" style={{ minHeight: "240px" }}>
                  <Card.Body style={{ textAlign: "left" }}>
                    <Card.Title>{this.state.data.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {this.state.data.mark}
                    </Card.Subtitle>
                    <Card.Text>{this.state.data.description}</Card.Text>
                    <Link to={"/hotel/book/" + this.state.data.id}>
                      <Button
                        variant="outline-success"
                        className="float-right"
                        style={{ marginLeft: "5px", marginBottom: "auto" }}
                      >
                        Book Now
                      </Button>
                    </Link>
                    <Button
                      variant="outline-secondary"
                      className="float-right"
                      style={{ marginBottom: "auto" }}
                    >
                      Show Prices
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Hotel;
