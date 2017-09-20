import  React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

const Home = (props) => {
    return (
        <div className = 'home'>
            <h1>Welcome to Word Hero</h1>
            <div><Login handleLoginSubmit = {props.handleLoginSubmit} /></div>
            <div className = 'register-link'>New user? <Link to ='/register'>Register here</Link></div>
        </div>
    )
}

export default Home;