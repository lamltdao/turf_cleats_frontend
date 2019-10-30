import React, { Component } from 'react';
import {Input } from 'reactstrap';

export default class Filter extends Component {
    render() {
        return (
            <div className='filter col-12'>
                <h1>Filter</h1>
                <div id='sort_list'>
                    <div className='filter_by_brand'>
                        <h5>Brand</h5>
                        <Input type='checkbox' onChange={this.props.selectBrand} value='Nike'/>Nike
                        <p/>
                        <Input type='checkbox' onChange={this.props.selectBrand} value='Adidas'/>Adidas
                        <p/>
                        {/* <Input type='checkbox' onChange={this.props.selectBrand} value='Puma'/>Puma
                        <p/> */}
                    </div>
                    <br/>
                    <div className='filter_by_price'>
                        <h5>Price</h5>
                        <Input type='checkbox' onChange={this.props.selectPriceRange} value='500000-1500000'/>500.000-1.500.000
                        <p/>
                        <Input type='checkbox' onChange={this.props.selectPriceRange} value='1500000-3000000'/>1.500.000-3.000.000
                        <p/>
                        <Input type='checkbox' onChange={this.props.selectPriceRange} value='3000000-9000000'/>>3.000.000
                    </div>
                    <br/>
                    {/* <div className='sort_by_price'>
                        <h5>Sort by price</h5>
                        <Input type='checkbox' onChange={this.props.selectSortType} value='ascending'/>Ascending
                        <p/>
                        <Input type='checkbox' onChange={this.props.selectSortType} value='descending'/>Descending
                        <p/>
                      
                    </div> */}
                </div>
            </div>
        )
    }
}
