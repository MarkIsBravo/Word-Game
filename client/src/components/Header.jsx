import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header>
            <div className = 'header'>
                <h2>Word Hero</h2>
                {props.auth ? <div className = 'welcome-head'><h4>Welcome, {props.user.nickname}({props.user.username})</h4></div> : ''}
                {props.auth ? <div className = 'logout-btn' onClick = {props.logOut}><Link to = '/'>Logout</Link></div> : '' }
            </div>
        </header>
    )
}

export default Header;