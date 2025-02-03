import React, { Component } from "react";
import Pic1 from "./components/Pic1";
import { motion } from "framer-motion";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      show: true,
      imgSize: 100,
    };
    console.log("constructor is called");
  }

  componentDidMount() {
    console.log("componentDidMount is called");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("ComponentDidUpdate is called");
  }

  // Function to increase image size
  increaseImageSize = () => {
    this.setState((prevState) => ({
      imgSize: prevState.imgSize + 50,
    }));
  };

  render() {
    console.log("render is called");

    return (
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="ml-[100px] place-self-center"
      >
        <h1>REACT LIFECYCLE METHODS</h1>
        <p>ComponentDidMount | ComponentWillUnmount</p>

        {/* Top Pic1 (Can be toggled) */}
        {this.state.show ? <Pic1 imgSize={this.state.imgSize} /> : null}

        <button
          onClick={() => this.setState({ show: !this.state.show })}
          style={{ color: "green", marginBottom: "10px" }}
          className="border-1 rounded-xl mt-2 p-1"
        >
          Toggle Component
        </button>

        <p>ComponentDidUpdate</p>

        {/* Bottom Pic1 (Size Increases on Click) */}
        <Pic1 imgSize={this.state.imgSize} />

        <button
          onClick={this.increaseImageSize}
          style={{ color: "green", marginTop: "10px" }}
          className="border-1 rounded-xl mt-2 p-2"
        >
          Increase Image Size
        </button>
      </motion.div>
    );
  }
}
