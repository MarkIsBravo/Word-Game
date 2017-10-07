import  React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Footer from './Footer';

const Home = (props) => {
    return (
        <div>
            <div className = 'home'>
                <div className = 'decorations'>
                    <div className = 'headerimg'/>
                    {/* <div className='footerimg'/> */}
                </div>
                <h1>Welcome to Word Hero</h1>
                <div className = 'login-box'><Login handleLoginSubmit = {props.handleLoginSubmit} /></div>
                <div className = 'register-link'>New user? <Link to ='/register'>Register here</Link></div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;