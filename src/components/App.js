import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import NavBar from './navbar/NavBar';
import Footer from './footer/Footer';
import Homepage from './Homepage';
import Auth from './Auth';
import {Switch,Route,BrowserRouter} from 'react-router-dom';
import SneakersDetail from './body/SneakersDetail';
import Cart from './body/Cart';
export default class App extends Component {
  
  render() {
    return (
      <div>
          <NavBar/>
          <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Homepage}/>
            <Route path='/account' component={Auth}/>
            <Route path='/sneakers/:id' component={SneakersDetail}/>
            <Route path='/cart' component={Cart}/>
          </Switch>
          </BrowserRouter>
          <Footer/>
      </div>
    )
  }
}
