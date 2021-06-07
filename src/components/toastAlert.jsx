import React from "react";
import { Toast } from "react-bootstrap";

export default function ToastAlert(props) {
  const toastCss = {
    top: "10px",
    right: "10px",
    zIndex: "1",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  };

  return (
    <div style={props.show ? toastCss : null}>
      <Toast
        style={{ maxWidth: "inherit" }}
        className={`border text-white ${
          props.type === "success"
            ? "border-success bg-success"
            : "border-danger bg-danger"
        }`}
        show={props.show}
      >
        <Toast.Body>{props.message}</Toast.Body>
      </Toast>
    </div>
  );
}
