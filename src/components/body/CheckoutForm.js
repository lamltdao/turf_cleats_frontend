import React, { Component } from 'react';
import axios from 'axios';
import { base_url } from '../../config';
import { CardElement, injectStripe } from 'react-stripe-elements';

const createOptions = () => {
    return {
        style: {
            base: {
                fontSize: '16px',
                color: '#424770',
                fontFamily: 'Open Sans, sans-serif',
                letterSpacing: '0.025em',
                '::placeholder': {
                    color: '#aab7c4',
                },
            },
            invalid: {
                color: '#c23d4b',
            },
        }
    }
};

class CheckoutForm extends Component {
    constructor(props) {
        super(props);
    }

    submit = async (ev) => {
        if(window.localStorage.getItem('userId')!=null){
            ev.preventDefault();
            let { token } = await this.props.stripe.createToken({ name: "Name" });
            axios({
                method: "POST",
                url: base_url + '/charge',
                data: {
                    source: token.id,
                    package: {
                        address: this.props.address,
                        cart: this.props.cart,
                        totalPrice: this.props.totalPrice,
                    }
                }
            })
                .then(data => { console.log(data) })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    render() {
        return (
            <div className="CardDemo">
                <form onSubmit={this.submit}>
                    <label>
                        Card details
                    </label>
                    <CardElement
                        onChange={this.handleChange}
                        {...createOptions()}
                    />
                    <div className="error" role="alert">
                        {/* {this.state.errorMessage} */}
                    </div>
                    <div className='text-center'>
                    <button >Pay</button>
                    </div>
                </form>
            </div>
            //   <div className="checkout">
            //     <p>Would you like to complete the purchase?</p>
            //     <CardElement />
            //     <button onClick={this.submit}>Purchase</button>
            //   </div>
        );
    }
}

export default injectStripe(CheckoutForm);