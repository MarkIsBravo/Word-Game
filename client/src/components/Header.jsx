import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header>
            <div className = 'header'>
                <h2>Word Game</h2>
                {props.auth ? <h4>{props.user.nickname}</h4> : ''}
                {props.auth ? <div className = 'username'>{props.user.username}</div> : '' }
                {props.auth ? <div className = 'logout-btn' onClick = {props.logOut}><Link to = '/'>Logout</Link></div> : '' }
            </div>
        </header>
    )
}

export default Header;