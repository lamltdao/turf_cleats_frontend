import React, { Component } from 'react'

export default class SearchField extends Component {
    render() {
        return (
            <div className='searchfield'>
                <form className='col-12'>
                    <input className='form-control' type='text' placeholder='Search' onChange={this.props.onKeyWordChange}/>
                </form>
            </div>
        )
    }
}
