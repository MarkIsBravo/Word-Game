import  React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';

const Home = (props) => {
    return (
        <div className = 'home'>
            <h1>Welcome to the World Game</h1>
            <ul>
                <li><Login handleLoginSubmit = {props.handleLoginSubmit} /></li>
                <li>New user? <Link to ='/register'>Register here</Link></li>
            </ul>
        </div>
    )
}

export default Home;