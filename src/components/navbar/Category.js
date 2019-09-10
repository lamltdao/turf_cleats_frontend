import React, { Component } from 'react';
//import {Button} from 'reactstrap';
export default class Category extends Component {
    
    render() {
        return (
            <div className="category">
                {!this.props.userInfo.name ? <a className='account' href='/account' >Account</a> : <a href='#' onClick={this.logOut} className='log_out'>Log Out</a>}
                
                <a className='cart' href='/cart' >Cart</a>
                <a className='help' href='/help' >Help</a>
            </div>
        )
    }

    logOut=(event)=>{
        event.preventDefault();
        window.localStorage.removeItem('access_token');
        window.location.href='/';
    }
}
