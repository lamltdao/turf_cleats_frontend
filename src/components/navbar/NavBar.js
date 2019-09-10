import React, { Component } from 'react';
import SearchField from './SearchField';
import Category from './Category';
import Logo from './Logo';
export default class NavBar extends Component {
    render() {
        console.log(this.props);
        
        return (
            
            <div className="navbar">
                <div className="container">
                    <SearchField onKeyWordChange={this.props.onKeyWordChange}/>
                    <Category userInfo={this.props.userInfo}/>
                    <Logo/>
                    <div id='user_info'>{this.props.userInfo.name}</div>
                </div>
            </div>
        )
    }
}
