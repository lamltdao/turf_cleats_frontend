import React, { Component } from 'react';
import  {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class Cart extends Component {
    state={
        cart:[]
    }
    
    componentWillMount(){
      var cart= window.localStorage.getItem('cart');
      cart=JSON.parse(cart);
      console.log(cart);
      cart.map((item,index)=>{
          this.state.cart.push(item);
      })
      //this.setState({cart:cart})
      console.log(this.state.cart);
      
    }
    render() {
        return (
            <div className='cart'>
                {this.renderSneakers}            
            </div>
        )
    }

    renderSneakers= (event)=>{
        this.state.cart.map((item,index)=>{
            return <div className='item'>
                <Link to={`/sneakers/`+item.id}>Name of Sneakers </Link>
                <div>{item.quantity}</div>
                <Button type='button' item={item} onClick={this.removeFromCart}>Remove</Button>
            </div>
        })
    };
    removeFromCart=(event)=>{
        var cart=window.localStorage.getItem('cart');
        cart=JSON.parse(cart);
        cart.pop(event.target.props.item);
        window.localStorage.setItem('cart',cart);
        this.setState({cart:cart});
    }
}
