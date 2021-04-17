import React, { Component } from "react";
import { NavbarBrand } from "reactstrap";

export default class Logo extends Component {
  render() {
    return (
      <div className="Logo">
        <NavbarBrand href="/" id="Logo">
          HOME
        </NavbarBrand>
      </div>
    );
  }
}
