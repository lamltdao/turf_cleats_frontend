import React, { Component } from 'react';
import SearchField from './SearchField';
import Category from './Category';
import Logo from './Logo';
export default class NavBar extends Component {
    render() {
        return (
            <div className="navbar">
                <div className="container">
                    <SearchField/>
                    <Category/>
                    <Logo/>
                </div>
            </div>
        )
    }
}
