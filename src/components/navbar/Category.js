import React, { Component } from 'react';
//import {Button} from 'reactstrap';
export default class Category extends Component {
    state={
        category:['Account','Cart','Help']
    }
    render() {
        return (
            <div className="category">
                {
                this.state.category.map((item,index)=>{
                    return <a className={item.replace(/\s+/g, '')} href='#' >{item}</a>
                })  
                }              
            </div>
        )
    }
}
