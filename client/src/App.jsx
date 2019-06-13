import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  LandingPage,
  Login,
  Signup,
  Home,
  MyOffers,
  MyApplications,
  SavedOffers,
  CreateNewOffers,
  Header,
  Footer,
  PageNotFound,
  
} from './Components';


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
           
            <Route exact path="/app/my-offers" component={MyOffers} />
            <Route exact path="/app/my-applications" component={MyApplications} />
            <Route exact path="/app/saved-offers" component={SavedOffers} />
            <Route exact path="/app/new-offer" component={CreateNewOffers} />

            
            
            <Route component={PageNotFound} />
          </Switch>
          <Footer />
      </Router>
      </>
    )
  }
}

