import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className='filter'>
                <h1>Category</h1>
                <ul id='sort_list'>
                    <li>Brand</li>
                    <li>Prize</li>
                </ul>
            </div>
        )
    }
}
