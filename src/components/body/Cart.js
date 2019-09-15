import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../../config';
import '../../Cart.css';
export default class Cart extends Component {
    state = {
        cart: []
    }


    componentWillMount() {
        var cart = window.localStorage.getItem('cart');
        cart = JSON.parse(cart);
        if(cart){
            cart.map((item, index) => {
                this.state.cart.push(item);
            })
        }
        
        //this.setState({cart:cart})
    }
    render() {
        console.log(this.state.cart);

        return (
            <div className='cart_detail'>
                <Table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Product's Name</th>
                            <th>Quantity</th>
                            <th>Size</th>
                            <th>Prize</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderSneakers()}
                    </tbody>
                </Table>
            </div>
        )
    }
    renderSneakers = (event) => {
        return this.state.cart.map((item, index) => {
            return <tr>
                <td scope='row'>{index+1}</td>
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
                    {item.prize* item.quantity}
                </td>
                <td>
                    <Button color='danger'type='button' onClick={() => { this.removeFromCart(index) }}>
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
