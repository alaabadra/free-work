import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import {
  LandingPage,
  Login,
  Signup,
  Home,
  Header,
  Footer,
  PageNotFound,
  
} from './Components';
import MyApplications from './Components/MyApplications';


export default class App extends Component{
  state={
    islogged:true,
    userInfo: null,
  }
  render(){
    const {islogged} = this.state;
    return(
      <>
      <Router>
      <Header islogged={islogged} />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/myapps" component={MyApplications} />
            <Route component={PageNotFound} />
          </Switch>
          <Footer />
      </Router>
      </>
    )
  }
}

