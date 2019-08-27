import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import NavBar from './navbar/NavBar';
import Footer from './footer/Footer';
import Filter from './body/Filter';
import Sneakers from './body/Sneakers';
import Banner from './body/Banner';
export default class App extends Component {
  state={
    sneakers:['1','2','3','4']
  }
  render() {
    return (
      <div>
          <NavBar/>
          <Banner/>
          <Filter/>
          <div className="container">
          <div class='sneakers_per_row'>
          {
            this.state.sneakers.map((item,index)=>{
              return  <Sneakers/>
            })
          }
          </div>
          </div>
          <Footer/>
          

      </div>
    )
  }
}
