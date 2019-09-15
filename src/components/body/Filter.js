import React, { Component } from 'react';
import {Input } from 'reactstrap';

export default class Filter extends Component {
    render() {
        return (
            <div className='filter'>
                <h1>Filter</h1>
                <div id='sort_list'>
                    <div className='filter_by_brand'>
                        <h6>Brand</h6>
                        <Input type='checkbox' onChange={this.props.selectBrand} value='Nike'/>Nike
                        <Input type='checkbox' onChange={this.props.selectBrand} value='Adidas'/>Adidas
                        <Input type='checkbox' onChange={this.props.selectBrand} value='Puma'/>Puma
                    </div>

                    <br/>
                    <div className='filter_by_prize'>
                        <h6>Prize</h6>
                        <Input type='checkbox' onChange={this.props.selectPrizeRange} value='500000-1500000'/>500.000-1.500.000
                        <Input type='checkbox' onChange={this.props.selectPrizeRange} value='1500000-3000000'/>1.500.000-3.000.000
                        <Input type='checkbox' onChange={this.props.selectPrizeRange} value='3000000-9000000'/>>3.000.000
                    </div>
                </div>
            </div>
        )
    }
}
