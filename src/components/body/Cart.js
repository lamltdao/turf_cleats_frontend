import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../../config';
import '../../Cart.css';
export default class Cart extends Component {
    state = {
        cart: [],
        package:[]
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
                        <th>{this.renderTotalPrice()}</th>
                    </tbody>
                </Table>

                <form onSubmit={this.submitPackage}>
                    <Button type='submit' color='primary' id='submitPackage' >
                        Submit
                    </Button>
                </form>
            </div>
        )
    }

    // submitPackage=(event)=>{
    //     event.preventDefault();
    //     axios({
    //         method:'POST',
    //         url:base_url+'/api/package/',
    //         data:{
    //             package:this.state.package
    //         }
    //     })
    //     .then(data=>{
    //         //modal :'...'
    //     })
    //     .catch(err=>{
    //         console.log(err);
    //     })
    // }

    renderTotalPrice=(event)=>{
        var price=0;
        const totalPrice=this.state.cart.reduce((price,item)=>{
            return price+Number(item.price*item.quantity);
        },0);
        price+=totalPrice;
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    renderSneakers = (event) => {
        return this.state.cart.map((item, index) => {
            this.state.package.push({
                sneakers:item.sneakersId,
                quantity:item.quantity,
                size:item.size
            });
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
                    {Number(item.price* item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
