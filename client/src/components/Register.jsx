import React, { Component } from 'react';

// the new user registration component
class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            nickname: '',
            email: '',
        }
    }

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }

    render() {
        return (
            <div className = 'register'>
                <div className = 'decorations'>
                    <div className = 'headerimg'/>
                    <div className='footerimg'/>
                </div>
                <form className = 'register-form' onSubmit = {(e) => this.props.handleRegisterSubmit(e, this.state.username, this.state.password, this.state.nickname, this.state.email)}>
                    <input type = 'text' name = 'username' value = {this.state.username} placeholder = 'Username' onChange = {this.handleInputChange} />
                    <input type = 'password' name = 'password' value = {this.state.password} placeholder = 'Password' onChange = {this.handleInputChange} />
                    <input type = 'text' name = 'nickname' value = {this.state.nickname} placeholder = 'Nickname' onChange = {this.handleInputChange} />
                    <input type = 'email' name = 'email' value = {this.state.email} placeholder = 'email' onChange = {this.handleInputChange} />
                    <button type = 'submit'>Register</button>
                </form>
            </div>
        )
    }
}

export default Register;