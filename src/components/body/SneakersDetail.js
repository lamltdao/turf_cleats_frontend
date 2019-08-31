import React, { Component } from 'react';
import '../../SneakersDetail.css';
import {Button} from 'reactstrap';
import axios from 'axios';
export default class SneakersDetail extends Component {
    state={ name:null,
            prize:null,
            image:null
        }
    componentWillMount(){
        const sneakersId=this.props.match.params.id;
        axios({url:'#'+sneakersId,
               method:'GET'})
        .then(data=>{
            this.setState({});
        })
        .catch(err=>{
            console.log(err);
            
        })
    }
    
    render() {
        return (
            <div className='sneakers_detail'>
                <div className='sneakers_img'></div>
                <div className='description'>
                    <div className='sneakers_name'>{this.state.name}</div>
                    <div className='sneakers_prize'>{this.state.prize}</div>
                    <Button id='btn_add_to_cart'>Add to cart</Button>
                </div>
            </div>
        )
    }
}
