import React, { Component } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import Hotel from "./hotel";

class HotelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    this.findAllBooks();
  }

  findAllBooks() {
    axios
      .get("http://localhost:8080/hotels")
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          books: data.body,
        });
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("jwtToken");
        this.props.history.push("/");
      });
  }

  render() {
    const listHotels = this.state.books.map((data) => (
      <Hotel key={data.id} data={data} />
    ));
    return (
      <Container style={{ paddingTop: "100px", paddingBottom: "75px" }}>
        {listHotels}
      </Container>
    );
  }
}

export default HotelList;
