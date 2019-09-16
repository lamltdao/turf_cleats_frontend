import React, { Component } from 'react';
import {Input } from 'reactstrap';

export default class Filter extends Component {
    render() {
        return (
            <div className='filter'>
                <h1 style={{fontSize:"60px"}}>Filter</h1>
                <div id='sort_list'>
                    <div className='filter_by_brand'>
                        <h5>Brand</h5>
                        <Input type='checkbox' onChange={this.props.selectBrand} value='Nike'/>Nike
                        <p/>
                        <Input type='checkbox' onChange={this.props.selectBrand} value='Adidas'/>Adidas
                        <p/>
                        <Input type='checkbox' onChange={this.props.selectBrand} value='Puma'/>Puma
                        <p/>
                    </div>

                    <br/>
                    <div className='filter_by_prize'>
                        <h5>Prize</h5>
                        <Input type='checkbox' onChange={this.props.selectPrizeRange} value='500000-1500000'/>500.000-1.500.000
                        <p/>
                        <Input type='checkbox' onChange={this.props.selectPrizeRange} value='1500000-3000000'/>1.500.000-3.000.000
                        <p/>
                        <Input type='checkbox' onChange={this.props.selectPrizeRange} value='3000000-9000000'/>>3.000.000
                    </div>
                </div>
            </div>
        )
    }
}
