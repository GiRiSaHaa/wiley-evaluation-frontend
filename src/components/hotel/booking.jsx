import React, { Component } from "react";
import axios from "axios";
import authToken from "../../utils/authUtils";
// import { checkAvailability } from "../../services/index";
import {
  Row,
  Col,
  Card,
  Container,
  Form,
  Button,
  Table,
  Alert,
} from "react-bootstrap";
import ToastAlert from "../toastAlert";

class Booking extends Component {
  constructor(props) {
    super(props);
    // this.state = this.initialState;
    this.state = {
      id: this.props.match.params.id,
      hotel: [],
      isAvailable: false,
    };

    // this.bookChange = this.bookChange.bind(this);
  }

  initialState = {
    checkin: "",
    checkout: "",
    adults: 0,
    rooms: 0,
    children: 0,
  };

  componentDidMount() {
    if (localStorage.getItem("jwtToken") === null) {
      return this.props.history.push("/login");
    }
    this.findHotel(this.state.id);
  }

  findHotel(id) {
    if (localStorage.jwtToken) {
      authToken(localStorage.jwtToken);
    }
    axios
      .get("http://localhost:8080/hotels/hotel/" + this.props.match.params.id)
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          hotel: data.body,
        });
        console.log(this.state.hotel);
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("jwtToken");
      });
  }

  bookingChange = (event) => {
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState(() => ({
      [event.target.name]: event.target.value,
    }));
    // this.setState((prevState) => {
    //   console.log(event.target.name);
    //   const newState = Object.assign({}, prevState);
    //   newState.booking. = event.target.value;
    //   return newState;
    // });
  };

  checkRoomAvailability = (event) => {
    event.preventDefault();
    console.log(event);

    const booking = {
      hotelId: this.props.match.params.id,
      checkin: this.state.checkin,
      checkout: this.state.checkout,
      rooms: this.state.rooms,
      adults: this.state.adults,
      children: this.state.children,
    };
    console.log(booking);
    axios
      .post("http://localhost:8080/hotels/availability", booking)
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          isAvailable: data.body,
        });
        console.log(this.state.hotel);
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("jwtToken");
      });
    this.setState(this.initialState);
  };

  render() {
    return (
      <Container style={{ paddingTop: "120px", paddingBottom: "80px" }}>
        <Row>
          <Col xl={3} xs={12}>
            <Card>
              <Card.Img variant="top" src={this.state.hotel.imgUrl} />
              <Card.Body>
                <Card.Title>{this.state.hotel.name}</Card.Title>
                <Card.Text>{this.state.hotel.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={9} xs={12}>
            <Card>
              <Card.Body>
                <Row>
                  <Col xl={12} xs={12}>
                    <Card>
                      <Card.Body>
                        <Card.Title style={{ textAlign: "left" }}>
                          Availability
                        </Card.Title>
                        <Row>
                          <Form
                            onSubmit={this.checkRoomAvailability}
                            id="availabilityForm"
                          >
                            <Row className="mb-3">
                              <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Check-in Date</Form.Label>
                                <Form.Control
                                  name="checkin"
                                  type="date"
                                  onChange={this.bookingChange}
                                />
                              </Form.Group>

                              <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Check-out Date</Form.Label>
                                <Form.Control
                                  name="checkout"
                                  type="date"
                                  onChange={this.bookingChange}
                                />
                              </Form.Group>
                            </Row>
                            <Row>
                              <Col>
                                <Form.Group as={Col}>
                                  <Form.Label>Rooms</Form.Label>
                                  <Form.Control
                                    name="rooms"
                                    type="number"
                                    value={this.state.rooms}
                                    onChange={this.bookingChange}
                                  />
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Group as={Col}>
                                  <Form.Label>Adults</Form.Label>
                                  <Form.Control
                                    name="adults"
                                    type="number"
                                    value={this.state.adults}
                                    onChange={this.bookingChange}
                                  />
                                </Form.Group>
                              </Col>
                              <Col>
                                <Form.Group as={Col}>
                                  <Form.Label>Children</Form.Label>
                                  <Form.Control
                                    type="number"
                                    name="children"
                                    value={this.state.children}
                                    onChange={this.bookingChange}
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Button
                              type="submit"
                              variant="outline-success"
                              style={{ width: "100%" }}
                            >
                              CHECK AVAILABILITY
                            </Button>
                          </Form>
                        </Row>
                      </Card.Body>
                      <Card.Footer>
                        <div
                          style={{
                            display: this.state.isAvailable ? "block" : "none",
                          }}
                        >
                          <ToastAlert
                            show={this.state.show}
                            message={
                              this.state.isAvailable
                                ? "Property is available for your stay. Please proceed booking."
                                : "Sorry, Not available at this moment. Please try another date."
                            }
                            type={"success"}
                            style={{ maxWidth: "inherit" }}
                          />
                        </div>
                      </Card.Footer>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Container>
              <Row>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Accommodation Type</th>
                      <th>Today's price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div>Double Room with Bathroom</div>
                      </td>
                      <td>US$108</td>
                      <td>
                        <Form.Group as={Col}>
                          <Form.Control
                            type="number"
                            style={{ width: "60px" }}
                          />
                        </Form.Group>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div>Twin Room with Private Bathroom</div>
                      </td>
                      <td>US$121</td>
                      <td>
                        <Form.Group as={Col}>
                          <Form.Control
                            type="number"
                            style={{ width: "60px" }}
                          />
                        </Form.Group>
                      </td>
                      <th rowSpan="4" style={{ border: "aliceblue" }}>
                        <Button variant="outline-success">Reserve</Button>
                      </th>
                    </tr>
                    <tr>
                      <td>
                        <div>Single Bed Private Bathroom</div>
                      </td>
                      <td>US$58</td>
                      <td>
                        <Form.Group as={Col}>
                          <Form.Control
                            type="number"
                            style={{ width: "60px" }}
                          />
                        </Form.Group>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Booking;
