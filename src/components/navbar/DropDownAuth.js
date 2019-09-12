import React, { Component } from 'react';
import {DropdownItem,NavLink} from 'reactstrap';

export default class DropDownAuth extends Component {
    render() {
        return (
               <div className='sign_in/sign_up/log_out'>
                    {!this.props.userInfo.name ?
                      <div>
                      <DropdownItem>
                        <NavLink href='/sign_in'>Sign in</NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink href='/sign_up'>Sign up</NavLink>
                      </DropdownItem>
                      </div>
                      : 
                      <div>
                      <DropdownItem>
                        <NavLink href='/' onClick={this.logOut}>Log out</NavLink>
                      </DropdownItem>
                      </div>}
                  </div>
        )
    }
    logOut=(event)=>{
        event.preventDefault();
        window.localStorage.removeItem('access_token');
        window.location.href='/';
    }
}
