import React, { Component } from 'react';
import { Button, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../../config';
import { PayPalButton } from 'react-paypal-button-v2';
import { CardElement, injectStripe } from 'react-stripe-elements';

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

                <form onSubmit={this.submitPackage} >
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
                    <div className='text-center'>
                        {/* <PayPalButton
                            amount={{
                                currency_code: "VND",
                                value: this.renderTotalPrice
                            }}
                            onSuccess={(details) => {
                                alert("Transaction completed by " + details.payer.name.given_name);
                                axios({
                                    method: 'POST',
                                    url: base_url + '/api/package',
                                    data: {
                                        address: this.state.address,
                                        cart: this.state.cart,
                                        totalPrice: this.props.amount.value
                                    }
                                })
                                    .then(data => {
                                        console.log(data);
                                    })
                                    .catch(err => {
                                        console.log(err);

                                    })
                                console.log(details);
                            }}
                        /> */}
                        <div className="checkout">
                            <p>Would you like to complete the purchase?</p>
                            <CardElement />
                            <button onClick={this.submit}>Purchase</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    submit = async (ev) => {
        ev.preventDefault();
        let { token } = await this.props.stripe.createToken({ name: "Name" });
        axios({
            method: "POST",
            url: base_url + '/charge',
            data: {
                source: token.id,
                package: {
                    address: this.state.address,
                    cart: this.state.cart,
                    totalPrice: this.renderTotalPrice()
                }
            }
            })
            .then(data => { console.log(data) })
            .catch(err => {
                console.log(err);
            })

        console.log(token);

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
export default injectStripe(Cart);
