import React, { Component } from 'react';
import {NavbarBrand} from 'reactstrap';

export default class Logo extends Component {
    render() {
        return (
            <div className='Logo'>
                {/* <a href='/'>SNEAKERS</a> */}
                <NavbarBrand href="/" id='Logo'>HOME</NavbarBrand>
            </div>
        )
    }
}
