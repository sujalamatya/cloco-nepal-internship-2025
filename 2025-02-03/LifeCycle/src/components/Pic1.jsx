import React, { Component } from "react";
import pic from "../../public/bg.jpg";

export default class Pic1 extends Component {
  componentWillUnmount() {
    console.log("ComponentWillUnmount is called");
  }

  render() {
    return (
      <div>
        <img
          src={pic}
          alt="Flowers"
          style={{
            width: `${this.props.imgSize}px`,
            height: `${this.props.imgSize}px`,
            transition: "0.3s ease-in-out", // Smooth animation
          }}
        />
      </div>
    );
  }
}
