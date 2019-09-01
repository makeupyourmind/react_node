import React, { Component } from 'react'; 
import './App.css';
import { Provider } from 'react-redux';
import {store} from './store/index';
import MainPaige from './components';
import Login from './components/login/login';
import Home from './components/home/home';
import SignUp from './components/signUp/signUp';
import EditContact from './components/editContact/editContact'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/header/header';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Router>
            <Header/>   
              <Switch>
                <Route exact path="/" component={MainPaige} />
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/signUp" component={SignUp} />
                <Route path="/edit/:id" component={EditContact} />
              </Switch>
          </Router>
      </Provider>
    );
  }
}

export default App;
