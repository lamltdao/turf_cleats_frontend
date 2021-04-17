import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Sneakers extends Component {
  render() {
    return (
      <div className="sneakers col-4">
        <Link to={`/sneakers/` + this.props._id}>
          <img className="sneakers_img" src={this.props.image} alt="" />
          <div className="sneakers_name">{this.props.name}</div>
          <div className="sneakers_price">
            {this.props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            VND
          </div>
        </Link>
      </div>
    );
  }
}
