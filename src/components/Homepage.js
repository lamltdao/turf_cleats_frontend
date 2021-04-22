import React, { Component } from "react";
import Filter from "./body/Filter";
import SneakersList from "./body/SneakersList";
import { Button } from "reactstrap";
import axios from "axios";
import { base_url } from "../config";

export default class Homepage extends Component {
  state = {
    brandSelected: [],
    priceRangeSelected: [],
    isSortedAscending: false,
    sneakersList: [],
    currentPage: 1,
    sneakersShownNumber: 6,
  };
  componentDidMount() {
    axios({
      url: `${base_url}/api/sneakers`,
      method: "GET",
    })
      .then((data) => {
        this.setState({ sneakersList: data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="homepage">
        {this.state.sneakersList.length > 0 
        ?
        <div className="container">
          <div className="row">
            <div className="col-3">
              <Filter
                selectBrand={this.selectBrand}
                selectPriceRange={this.selectPriceRange}
                selectSortType={this.selectSortType}
              />
            </div>
            <div className="col-9">
              <SneakersList
                sneakersShownNumber={this.state.sneakersShownNumber}
                sneakersList={this.state.sneakersList}
                keyWordSearch={this.props.keyWordSearch}
                brandSelected={this.state.brandSelected}
                priceRangeSelected={this.state.priceRangeSelected}
                isSortedAscending={this.state.isSortedAscending}
              />
            </div>
          </div>

          <br />
          <div className="row">
            <div className="col-3"></div>
            <div className="row col-9">
              <div className="col-5"></div>
              <Button
                className="col-2"
                type="button"
                onClick={this.viewMoreSneakers}
                color="primary"
              >
                View More
              </Button>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-3"></div>
            <div className="row col-9">
              <div className="col-5"></div>
              <Button
                className="col-2"
                type="button"
                onClick={this.viewLessSneakers}
                color="danger"
              >
                View Less
              </Button>
            </div>
          </div>
        </div>
        : 
        <div className="container">
          <div className="row justify-content-center">
            <h5>LOADING...</h5>
          </div>
        </div>
        }
      </div>
    );
  }

  viewMoreSneakers = () => {
    const sneakersAddedPerClick = 6;
    if (this.state.sneakersShownNumber < this.state.sneakersList.length)
      this.setState({
        sneakersShownNumber:
          this.state.sneakersShownNumber + sneakersAddedPerClick,
      });
  };
  viewLessSneakers = () => {
    const sneakersRemovedPerClick = 6;
    if (this.state.sneakersShownNumber > 6) {
      this.setState({
        sneakersShownNumber:
          this.state.sneakersShownNumber - sneakersRemovedPerClick,
      });
    }
  };

  selectSortType = (event) => {
    this.setState({ sneakersShownNumber: 6 });
    if (event.target.value === "ascending")
      this.setState({ isSortedAscending: true });
    else this.setState({ isSortedAscending: false });
  };
  selectBrand = (event) => {
    this.setState({ sneakersShownNumber: 6 });
    let { brandSelected } = this.state;
    if (!brandSelected.includes(event.target.value)) {
      brandSelected.push(event.target.value);
      this.setState({ brandSelected });
    } else {
      brandSelected = brandSelected.filter((item, index) => {
        return item !== event.target.value;
      });
      this.setState({ brandSelected });
    }
  };
  selectPriceRange = (event) => {
    this.setState({ sneakersShownNumber: 6 });
    let { priceRangeSelected } = this.state;
    if (event.target.checked) {
      priceRangeSelected.push(event.target.value);
      this.setState({ priceRangeSelected });
    } else {
      priceRangeSelected = priceRangeSelected.filter((item, index) => {
        return item !== event.target.value;
      });
      this.setState({ priceRangeSelected });
    }
  };
}
