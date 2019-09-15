import React, { Component } from 'react';
import '../../SneakersDetail.css';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import axios from 'axios';
import { base_url } from '../../config';
export default class SneakersDetail extends Component {
    state = {
        name: null,
        prize: null,
        image: null,
        quantity: null,
        sneakersId: null,
        size: null,
        modal: false,
        dropdownOpen:false,
        dropDownValue:'Choose Your Size'
    }
    componentWillMount() {

        const sneakersId = this.props.match.params.id;
        axios({
            url: base_url + '/api/sneakers/' + sneakersId,
            method: 'GET'
        })
            .then(data => {
                this.setState({
                    name: data.data.name,
                    prize: data.data.prize,
                    image: data.data.image,
                    sneakersId: data.data._id,
                });
            })
            .catch(err => {
                console.log(err);
            });


    }

    render() {
        return (
            <div className='sneakers_detail container'>
                <div class="row">
                <div className='sneakers_img_detail col-6'> 
                <img src={this.state.image} 
                style={{width:"100%"}}/>
                </div>
                <div className='description col-6'> 
                    <div className='sneakers_name_detail'>{this.state.name}</div>
                    <div className='sneakers_prize_detail'>{this.state.prize}</div>
                    
                    <div className='sneakers_quantity_detail row'>
                        <div class="col-8"><p>How many pairs do you want to buy ?</p></div>
                        <div class="col-4"><Input type="number" onChange={this.quantityChange} step={1} min={0} placeholder='' />
                    </div>
                    </div>
                    <div className='sneakers_size_detail row'>
                        <div class="col-8" ><p>Size:</p></div>
                        <div class="col-4">
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.DropDownToggle}>
                            <DropdownToggle caret color='info'>
                                {this.state.dropDownValue}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Note: These are US sizes</DropdownItem>
                                <DropdownItem divider />
                                {
                                [8,8.5,9,9.5,10,10.5,11,11.5,12]
                                .map((item,index)=>{
                                    return <DropdownItem onClick={this.selectSize}>{item}</DropdownItem>
                                })
                                }
                            </DropdownMenu>
                        </Dropdown>
                        </div>
                    </div>
                    <div className="center">
                    <Button id='btn_add_to_cart' type='button' onClick={this.addToCartAndDisplayMessage}>Add to cart</Button>
                    <Modal toggle={this.ModalToggle} isOpen={this.state.modal}>
                        <ModalHeader toggle={this.ModalToggle}></ModalHeader>
                        <ModalBody>{this.state.quantity <= 0 ? "Please fill in the quantity" : (typeof(this.state.dropDownValue) == "string" ? "Please Choose Your Size" : 'This product has been added to your cart')}</ModalBody>
                        <ModalFooter>
                            <Button color='primary' type='button' onClick={this.ModalToggle}>OK</Button>
                        </ModalFooter>
                    </Modal>
                                </div>
                </div>
                </div>
            </div>
        )
    }
    quantityChange = (event) => {
        const quantity = event.target.value;
        this.setState({ quantity: Number(quantity) });
    }

    selectSize=(event)=>{
        this.setState({
            dropdownOpen:!this.state.dropdownOpen,
            size:event.target.innerText,
            dropDownValue:event.target.innerText
        })
    }

    DropDownToggle=()=>{
        this.setState({dropdownOpen:!this.state.dropdownOpen})
    }
    ModalToggle = () => {
        this.setState({ modal: !this.state.modal });
    }

    addToCartAndDisplayMessage = (event) => {
        
        
        //display message
        this.setState({ modal: !this.state.modal });
        //add to cart
        console.log(typeof(this.state.dropDownValue))
        
            if (window.localStorage.getItem('cart')) {
                var cart = window.localStorage.getItem('cart');
                cart = JSON.parse(cart);
                const isExist = cart.filter((item, index) => {
                    if (this.state.sneakersId === item.sneakersId&&this.state.size===item.size) {
                        cart[index].quantity = this.state.quantity;
                        return true;
                    } else return false;
                })[0];
                if (!isExist) {
                    cart.push({
                        sneakersId: this.state.sneakersId,
                        quantity: this.state.quantity,
                        name: this.state.name,
                        prize: this.state.prize,
                        size:this.state.size
                    });
                }
                
                window.localStorage.setItem('cart', JSON.stringify(cart));
                console.log(cart);
            }
            else {
                const initiate_cart = []
                window.localStorage.setItem('cart', JSON.stringify(initiate_cart));
                var cart = window.localStorage.getItem('cart');
                cart = JSON.parse(cart);
                cart.push({
                    sneakersId: this.state.sneakersId,
                    quantity: this.state.quantity,
                    name: this.state.name,
                    prize: this.state.prize,
                    size:this.state.size
                });
                window.localStorage.setItem('cart', JSON.stringify(cart));
                
            }
        
    }
}
