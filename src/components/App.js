import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import NavBar from './navbar/NavBar';
import Footer from './footer/Footer';
import Homepage from './Homepage';
import SignIn from '../Auth/SignIn';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import SneakersDetail from './body/SneakersDetail';
import Cart from './body/Cart';
import SignUp from '../Auth/SignUp';
import axios from 'axios';
import { base_url } from '../config';
import {Elements, StripeProvider} from 'react-stripe-elements';

const CartWithStripe = () => (
  <StripeProvider apiKey="pk_test_q58H7MWrSfERSzuacF1SmkP200AnDPO91e">
    <Elements>
      <Cart/>
    </Elements>
  </StripeProvider>
)

export default class App extends Component {
  state = {
    userInfo: {
      name: '',
      role: ''
    },
    keyWordSearch: ''
  }
  componentWillMount() {
    const access_token = window.localStorage.getItem('access_token');
    if (access_token) {
      axios({
        method: 'GET',
        url: base_url + '/api/auth/account',
        headers: { authentication: access_token }
      })
        .then(data => {
          this.setState({ userInfo: { name: data.data.name, role: data.data.role } })
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
  render() {
    return (
      <div className='main'>
        <NavBar userInfo={this.state.userInfo} onKeyWordChange={this.onKeyWordChange} />
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={(props) => <Homepage userInfo={this.state.userInfo} keyWordSearch={this.state.keyWordSearch} {...props} />} />
            <Route path='/sign_in' component={SignIn} />
            <Route path='/sign_up' component={SignUp} />
            <Route path='/sneakers/:id' component={SneakersDetail} />
            <Route path='/cart' component={CartWithStripe} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    )
  }
  onKeyWordChange = (event) => {
    this.setState({ keyWordSearch: event.target.value })
  }
}
