import React, { Component } from 'react';
import { Button, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import {Elements, StripeProvider} from 'react-stripe-elements';
import 'react-stripe-elements/dist/react-stripe-elements'
import CheckoutForm from './CheckoutForm';

import '../../Cart.css';
class Cart extends Component {
    state = {
        cart: [],
        package: [],
        address: '',


    }


    componentWillMount() {
        var cart = window.localStorage.getItem('cart');
        cart = JSON.parse(cart);

        cart.map((item, index) => {
            this.state.cart.push(item);
        })
        //this.setState({cart:cart})


    }
    render() {

        return (
            <div className='cart_detail'>
                <Table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Product's Name</th>
                            <th>Quantity</th>
                            <th>Size</th>
                            <th>Price(VND)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderSneakers()}
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Total:</th>
                        <th>{this.renderTotalPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</th>
                    </tbody>
                </Table>

                {/* <form onSubmit={this.submitPackage} > */}
                    {/* <Button type='button' color='primary' id='submitPackage' onclick={this.submitPackage} >
                        Submit
                    </Button>
                     */}
                    <div className='row'>
                        <div className='col-3'></div>
                        <div className='col-6 text-center'>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleText">Write Your Address Here</Label>
                                    <Input type="textarea" name="text" id="exampleText" onChange={this.onAddressChange} />
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                    <div className='col-6 offset-3'>
                        
                        <div className="checkout">
                            {/* <p>Insert Your Card Number Below</p> */}

                            <StripeProvider apiKey="pk_test_q58H7MWrSfERSzuacF1SmkP200AnDPO91e">
                                <Elements>
                                    <CheckoutForm
                                        address={this.state.address}
                                        cart={this.state.cart}
                                        totalPrice={this.renderTotalPrice()}
                                    />
                                </Elements>
                            </StripeProvider>
                            {/* <button id='btn_purchase'onClick={this.submit}>Purchase</button> */}
                        </div>
                    </div>
                {/* </form> */}
            </div>
        )
    }

    onAddressChange = (event) => {
        this.setState({ address: event.target.value })
    }
    submitPackage = (event) => {

    }

    renderTotalPrice = (event) => {
        var price = 0;
        const totalPrice = this.state.cart.reduce((price, item) => {
            return price + Number(item.price * item.quantity);
        }, 0);
        price += totalPrice;
        return price;
    }
    renderSneakers = (event) => {
        return this.state.cart.map((item, index) => {
            this.state.package.push({
                sneakers: item.sneakersId,
                quantity: item.quantity,
                size: item.size
            });
            return <tr>
                <td scope='row'>{index + 1}</td>
                <td>
                    <Link to={`/sneakers/` + item.sneakersId}>
                        {item.name}
                    </Link>
                </td>
                <td>
                    {item.quantity}
                </td>
                <td>
                    {item.size}
                </td>
                <td>
                    {Number(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td>
                    <Button color='danger' type='button' onClick={() => { this.removeFromCart(index) }}>
                        Remove
                    </Button>
                </td>
            </tr>
        })
    };

    removeFromCart = (removedIndex) => {
        var cart = window.localStorage.getItem('cart');
        cart = JSON.parse(cart);
        cart = cart.filter((item, index) => {
            return index !== removedIndex
        })
        window.localStorage.setItem('cart', JSON.stringify(cart));
        this.setState({ cart: cart });
    }
}
export default Cart;
