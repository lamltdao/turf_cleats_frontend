import React, { Component } from "react";
import { Input } from "reactstrap";
import axios from 'axios';
import { base_url } from '../../config';

export default class Filter extends Component {
  state = {
    brands: [],
    priceRanges: ["500000-1500000","1500000-3000000","3000000-9000000"]
  }
  componentDidMount() {
    axios({
      url: `${base_url}/api/brand/`,
      method: "GET",
    })
      .then((res) => {
        this.setState({
          brands: res.data,
        });
      })
      .catch((err) => {

      });

  }
  
  render() {
    return (
      <div className="filter col-12">
        <h1 style={{ fontFamily: "'Open Sans', sans-serif" }}>Filter</h1>
        <div id="sort_list">
          <div className="filter_by_brand">
            <h5>Brand</h5>
            {this.state.brands.map((brand) => (
              <div key={brand.id}>
                <Input
                type="checkbox"
                onChange={this.props.selectBrand}
                value={brand.name}
                />
                {brand.name}
                <p />
              </div>
            ))}
          </div>
          <div className="filter_by_price">
            <h5>Price</h5>
            {this.state.priceRanges.map((priceRange) => (
            <div key={priceRange}>
              <Input
              type="checkbox"
              onChange={this.props.selectPriceRange}
              value={priceRange}
              />
              {priceRange} VND
              <p />
            </div>
            ))}
          </div>
          <br />
        </div>
      </div>
    );
  }
}
