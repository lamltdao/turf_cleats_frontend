import React, { Component } from 'react';
import Sneakers from '../body/Sneakers';
import axios from 'axios';
import { base_url } from '../../config';
export default class SneakersList extends Component {
  state = {
    // sneakerslist: [],
    brandSelected:[],
    priceRangeSelected:[],
    currentPage:null,
    newsPerPage:6
  }
  componentWillMount() {
    // axios({
    //   url: base_url + '/api/sneakers',
    //   method: 'GET'
    // })
    //   /**data contains arr of obj: {
    //    * img
    //    * name
    //    * price
    //    * } */
    //   .then(data => {
    //     this.setState({sneakerslist:data.data});
    //     console.log(this.state);
        
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })
  }
  renderSneakers=()=>{
    const {keyWordSearch } = this.props;
    const {brandSelected}=this.props;
    const {priceRangeSelected}=this.props;
    const {sneakersList}=this.props;
    const {sneakersShownNumber}=this.props;
    const {isSortedAscending}=this.props;
    let minPrice = 0;
    let maxPrice = 0;
    priceRangeSelected.forEach(item => {
      let min = Number(item.split('-')[0]);
      let max = Number(item.split('-')[1]);

      if(minPrice == 0 || minPrice > min) minPrice = min
      if(maxPrice == 0 || maxPrice < max) maxPrice = max

    })
    
    return sneakersList
            .sort((item1,item2)=>{
              return (item2.price-item1.price)
                      // * isSortedAscending? 1: -1 ;
            })
            .filter((item,index)=>{
              if(keyWordSearch) return item.name.toLowerCase().indexOf(keyWordSearch.toLowerCase()) > -1; 
              return true;
             })
            .filter((item,index)=>{
              if(brandSelected && brandSelected.length > 0){
                return brandSelected.includes(item.brand.name)
              }
              return true;
            }) 
            .filter((item,index)=>{
              if(minPrice!=0 && maxPrice!=0){
                return item.price >=Number(minPrice)&&item.price<=Number(maxPrice);
              }
              return true;
            })
            .filter((item,index)=>{
              return index<sneakersShownNumber
            })
            .map((item, index) => {
              
              return <Sneakers key={index} {...item} />//{...item}=object.asign(key,item) return a new obj 
            })
  }

  render() {
    
    return (
      
      <div className='sneakers_list row' >
        
          {
            this.renderSneakers()

          }
        
      </div>
    
    )
  }
}

