import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardImg, CardBody, CardTitle, CardText, CardSubtitle, Button } from 'reactstrap';

export default class Sneakers extends Component {


    render() {
        return (
            <div >
                <div className='sneakers'>
                    {/* <Link to={`/sneakers/` + this.props._id}>
                        <Card className='sneakers' width top='100%'>
                            <CardImg className='card_img'src='/assets/318x180.svg' alt="Card image cap" />
                            <CardBody>
                                <CardTitle className='sneakers_name'>{
                                    this.props.name
                                }</CardTitle>
                                <CardSubtitle className='sneakers_prize'>{
                                    this.props.prize
                                }</CardSubtitle>
                                <CardText>Some quick example text.</CardText>
                                <Button>Button</Button>
                            </CardBody>
                        </Card>
                    </Link> */}
                


                <Link to={`/sneakers/` + this.props._id}>
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
            </div>
        )
    }
}
