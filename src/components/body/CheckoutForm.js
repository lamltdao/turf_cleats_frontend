import React, { Component } from "react";
import axios from "axios";
import { base_url } from "../../config";
import { CardElement, injectStripe } from "react-stripe-elements";

const cardStyles = () => {
  return {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        fontFamily: "Open Sans, sans-serif",
        letterSpacing: "0.025em",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#c23d4b",
      },
    },
  };
};

class CheckoutForm extends Component {
  submit = async (e) => {
    if (window.localStorage.getItem("userId")) {
      e.preventDefault();
      let { token } = await this.props.stripe.createToken({ name: "Name" });
      axios({
        method: "POST",
        url: base_url + "/charge",
        data: {
          source: token.id,
          package: {
            address: this.props.address,
            cart: this.props.cart,
            totalPrice: this.props.totalPrice,
          },
        },
      })
        .then((data) => {
        })
        .catch((err) => {
        });
    }
  };

  render() {
    return (
      <div className="CardDemo">
        <form onSubmit={this.submit}>
          <label>Card details</label>
          <CardElement onChange={this.handleChange} {...cardStyles()} />
          <div className="error" role="alert">
          </div>
          <div className="text-center">
            <button disabled>Pay</button>
          </div>
        </form>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
