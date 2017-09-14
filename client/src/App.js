import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

class App extends Component {
  constructor(){
    super();
    this.state = {
      auth: false,
      user: null,
      currentPage: 'dashboard',
      redirect: '/'
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.requireLogin = this.requireLogin.bind(this);
  }

  requireLogin = () => {
    if(!this.state.auth) {
      this.setState({
        redirect: '/login',
      });
    } else {
      this.setState({
        redirect: '/user',
      })
    }
  };

  handleLoginSubmit(e, username, password) {
    e.preventDefault();
    axios.post('/auth/login', {
      username,
      password,
    })
    .then(res => {
      this.setState({
        auth: res.data.auth,
        user: res.data.user,
      });
    })
    .then(() => {
      if(this.state.user){
        this.setState({
          redirect: '/user',
        })
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleRegisterSubmit = (e, username, password, email) => {
    e.preventDefault();
    axios.post('/auth/register', {
      username,
      password,
      email
    })
    .then(res => {
      this.setState({
        auth: res.data.auth,
        user: res.data.user,
      });
    })
    .then(
      this.setState({
        redirect: '/user',
      })
    )
    .catch(err => {
      console.log(err);
    })
  }

  logOut = () => {
    axios.get('/auth/logout')
    .then(res => {
      console.log(res);
      this.setState({
        auth: false,
        redirect: '/',
      });
    }).catch(err => 
      console.log(err));
  }

  render() {
    if(this.state.redirect !== null) {
      let redir = this.state.redirect;
      this.setState({
        redirect: null,
      });
      return ( 
        <Router>
          <Redirect push to = {redir} />
        </Router>
      )
    } else {
      return (
        <Router>
          <div className="App">
            <Header />
            <main>
              <Route exact path = '/' render = {() => <Home handleLoginSubmit = {this.handleLoginSubmit}/>} />
              <Route exact path = '/register' render = {() => <Register handleRegisterSubmit = {this.handleRegisterSubmit} />} />
              <Route exact path = '/user' render = {() => <Dashboard user = {this.state.user} />} />
            </main>
            <Footer />
          </div>
        </Router>
      );
    }
  }
}

export default App;
