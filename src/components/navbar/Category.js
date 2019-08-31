import React, { Component } from 'react';
//import {Button} from 'reactstrap';
export default class Category extends Component {
    
    render() {
        return (
            <div className="category">
                <a className='account' href='/account' >Account</a>
                <a className='cart' href='/cart' >Cart</a>
                <a className='help' href='/help' >Help</a>
            </div>
        )
    }
}
