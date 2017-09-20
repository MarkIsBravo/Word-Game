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
      currentUserId: null,
      currentPage: 'dashboard',
      currentContent: 'dashboard',
      redirect: '/',
      currency: null,
    }
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.requireLogin = this.requireLogin.bind(this);
    this.userSelectEdit = this.userSelectEdit.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.setContent = this.setContent.bind(this);
    this.setPage = this.setPage.bind(this);
    this.addCurrency = this.addCurrency.bind(this);
  }

  requireLogin(){
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
        currency: res.data.user.currency,
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
  };

  handleRegisterSubmit(e, username, password, nickname, email){
    e.preventDefault();
    axios.post('/auth/register', {
      username,
      password,
      nickname,
      email
    })
    .then(res => {
      console.log(res);
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
  };

  logOut = () => {
    axios.get('/auth/logout')
    .then(res => {
      console.log(res);
      this.setState({
        currentPage: 'dashboard',
        currentContent: 'dashboard',
        auth: false,
        redirect: '/',
      });
    })
    .catch(err => {
      console.log(err)
    })
  };

  editUser(e){
    e.preventDefault();
    let nickname = e.target.nickname.value;
    let email = e.target.email.value;
    axios.put(`/user/${this.state.user.id}`, {
      nickname: e.target.nickname.value,
      email: e.target.email.value,
    }).then(res => {
      let newUserData = this.state.user;
      newUserData.nickname = nickname;
      newUserData.email = email;
        this.setState({
          user: newUserData,
          redirect: '/user',  
          currentUserId: null,
        })
    }).catch(err => {
      console.log(err) 
    })
  };

  userSelectEdit(id){
    this.setState({
      currentUserId: id,
    })
  }

  deleteUser(id){
    let confirm = window.confirm(`Are you sure you want to delete your profile ${this.state.user.username}?`);
    if(confirm === false) {
      this.setState({
        redirect: null,
      });
    } else { 
      axios.delete(`/user/${id}`)
      .then(res => {
        this.setState({
          user: null,
          redirect: '/',
          auth: false,
          currentContent: 'dashboard',
          currentPage: 'dashboard',
          });
      }).catch(err => {
          console.log(err);
      });
    }
  };

  setContent(content){
    this.setState({
      currentContent: content,
    });
  };

  setPage(page){
    this.setState({
      currentPage: page
    });
  };

  addCurrency(times){
    this.setState({
      currency: this.state.currency + 1 * times
    })
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
            <Header user = {this.state.user} auth = {this.state.auth} logOut = {this.logOut} />
            <main>
              <Route exact path = '/' render = {() => <Home handleLoginSubmit = {this.handleLoginSubmit}/>} />
              <Route exact path = '/register' render = {() => <Register handleRegisterSubmit = {this.handleRegisterSubmit} />} />
              <Route exact path = '/user' render = {() => <Dashboard 
                                                            auth = {this.state.auth}
                                                            user = {this.state.user}
                                                            deleteUser = {this.deleteUser}
                                                            userSelectEdit = {this.userSelectEdit}
                                                            editUser = {this.editUser}
                                                            setContent = {this.setContent}
                                                            currentContent = {this.state.currentContent}
                                                            setPage = {this.setPage}
                                                            currentPage = {this.state.currentPage}
                                                            currentUserId = {this.state.currentUserId}
                                                            currency = {this.state.currency}
                                                            addCurrency = {this.addCurrency}
                                                             />} />
            </main>
            <Footer />
          </div>
        </Router>
      );
    }
  }
}

export default App;
