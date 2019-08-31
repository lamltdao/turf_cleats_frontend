import React, { Component } from 'react';
import Sneakers from '../body/Sneakers';
import axios from 'axios';
export default class SneakersList extends Component {
    state={
        sneakerslist:[]
    }
    componentWillMount(){
      axios({
        url:'#',
        method:'GET'
      })
      /**data contains an obj: {
       * img
       * name
       * prize
       * } */
      .then(data=>{
        /**sneakerlist.push() */
      })
      .catch(err=>{
        console.log(err);
      })
    }
    render() {
        return (
        <div className='sneakers_list'>
            <div className='sneakers_per_row'>
          {
            this.state.sneakerslist.map((item,index)=>{
              return  <Sneakers key={index} />
            })
          }
            </div>
        </div>
        )
    }
}

