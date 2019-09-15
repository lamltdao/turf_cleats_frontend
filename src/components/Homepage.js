import React, { Component } from 'react';
import Filter from './body/Filter';
import Sneakers from './body/Sneakers';
import Banner from './body/Banner';
import SneakersList from './body/SneakersList';

export default class Homepage extends Component {
    state={
    brandSelected:[],
    prizeRangeSelected:[]
    }
    render() {
        // console.log(this.state.prizeRangeSelected);
        return (
            <div className='homepage' >

                <Banner/>
            <div class="container">
                <div class="row">
                    <div class="col-3">
                        <Filter selectBrand={this.selectBrand} selectPrizeRange={this.selectPrizeRange}/>
                    </div>
                <div class="col-9">
                    <SneakersList keyWordSearch={this.props.keyWordSearch} brandSelected={this.state.brandSelected} prizeRangeSelected={this.state.prizeRangeSelected}/>
                </div>
                </div>
            </div>
            </div>
        )
    }
    selectBrand=(event)=>{
        let {brandSelected}=this.state;
        if(!brandSelected.includes(event.target.value)){
            brandSelected.push(event.target.value);
            this.setState({brandSelected});
        }
        else{
            brandSelected = brandSelected.filter((item,index)=>{
                return item!=event.target.value;
            })
            this.setState({brandSelected});
        } 
    }
    selectPrizeRange=(event)=>{
        let {prizeRangeSelected}=this.state;
        if(event.target.checked){
            prizeRangeSelected.push(event.target.value);
            this.setState({prizeRangeSelected});
        }
        else{
            prizeRangeSelected= prizeRangeSelected.filter((item,index)=>{
                return item!=event.target.value;
            })
            this.setState({prizeRangeSelected});
        } 
    }
}
