import React, { Component } from "react";
import SearchField from "./SearchField";
import DropDownAuth from "./DropDownAuth";
import Logo from "./Logo";
import {
  Collapse,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

export default class NavBar extends Component {
  state = {
    isOpen: false,
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  render() {
    return (
      <div>
        <Navbar className="nav_bar" light expand="md">
          <Logo />
          <SearchField onKeyWordChange={this.props.onKeyWordChange} />
          <div id="user_info" className="text-white">
            {this.props.userInfo.name
              ? "Welcome, " + this.props.userInfo.name
              : ""}
          </div>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/cart" className="text-white">
                  Cart
                </NavLink>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="text-white">
                  Account
                </DropdownToggle>

                <DropdownMenu right>
                  <DropDownAuth userInfo={this.props.userInfo} />
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
