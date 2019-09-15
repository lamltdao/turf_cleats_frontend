import React, { Component } from 'react';

export default class Banner extends Component {
    render() {
        return (
            <div className='banner'>
                <img src={require('../../images/banner/banner.jpg')}/>
            </div>
        )
    }
}
