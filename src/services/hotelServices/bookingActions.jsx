import axios from "axios";

export const checkAvailability = (booking) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8081/rest/books", booking)
      .then((response) => {
        console.log(response);
        // dispatch(bookSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        // dispatch(bookFailure(error));
      });
  };
};
