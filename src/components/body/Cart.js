import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {base_url} from '../../config';
export default class Cart extends Component {
    state = {
        cart: []
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
        console.log(this.state.cart);
        
        return (
            <div className='cart_detail'>
                {this.renderSneakers()}

            </div>
        )
    }
    renderSneakers = (event) => {
        return this.state.cart.map((item, index) => {
            
            return <div className='item' item={item}>
                <Link to={`/sneakers/` + item.id}>{item.name}</Link>
                <div>{item.quantity}</div>
                <Button type='button' onClick={()=>{this.removeFromCart(index)}}>Remove</Button>
            </div>
        })
    };

    removeFromCart = (removedIndex) => {
        console.log(removedIndex);
        
        var cart=window.localStorage.getItem('cart');
        cart=JSON.parse(cart);
        cart=cart.filter((item,index)=>{
        
            return index!==removedIndex
        })
        console.log(cart);
        
        
        window.localStorage.setItem('cart',JSON.stringify(cart));
        this.setState({cart:cart});
    }
}
