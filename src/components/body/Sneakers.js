import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Sneakers extends Component {
    

    render() {
        return (
            <div className='sneakers'>
                <Link to={`/sneakers/`+this.props._id}>
                    <img src={this.props.image} alt='' />
                    <div className='sneakers_name'>
                        {
                            this.props.name
                        }
                    </div>
                    <div className='sneakers_prize'>
                        {
                            this.props.prize
                        }
                    </div>
                </Link>
            </div>
        )
    }
}
