import React, { Component } from 'react';
import Sneakers from '../body/Sneakers';
import axios from 'axios';
import { base_url } from '../../config';
export default class SneakersList extends Component {
  state = {
    sneakerslist: []
  }
  componentWillMount() {
    axios({
      url: base_url + '/api/sneakers',
      method: 'GET'
    })
      /**data contains arr of obj: {
       * img
       * name
       * prize
       * } */
      .then(data => {
        
        
        this.setState({sneakerslist:data.data});
        
        
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    return (
      <div className='sneakers_list'>
        <div className='sneakers_per_row'>
          {
            this.state.sneakerslist.map((item, index) => {
              return <Sneakers key={index} {...item} />//{...item}=object.asign(key,item) return a new obj 
            })
          }
        </div>
      </div>
    )
  }
}

