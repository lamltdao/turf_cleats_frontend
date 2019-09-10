import React, { Component } from 'react';
import Filter from './body/Filter';
import Sneakers from './body/Sneakers';
import Banner from './body/Banner';
import SneakersList from './body/SneakersList';

export default class Homepage extends Component {
    render() {
        return (
            <div className='homepage'>
                <Banner/>
                <Filter/>
                <SneakersList keyWordSearch={this.props.keyWordSearch}/>
            </div>
        )
    }
}
