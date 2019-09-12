import React, { Component } from 'react';
import SearchField from './SearchField';
import DropDownAuth from './DropDownAuth';
import Logo from './Logo';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

export default class NavBar extends Component {
  state = {
    isOpen: false
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md" >
          <Logo />
          <SearchField onKeyWordChange={this.props.onKeyWordChange} />
          <NavItem>{this.props.userInfo.name}</NavItem>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>

              <NavItem>
                <NavLink href="/cart">Cart</NavLink>
              </NavItem>

              <NavItem>
                <NavLink href="/help">Help</NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Account
                </DropdownToggle>
                
                  <DropdownMenu right>
                    <DropDownAuth userInfo={this.props.userInfo.name}/>
                  </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}
