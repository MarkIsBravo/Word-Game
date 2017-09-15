import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header>
            <div className = 'header'>
                <h2>Word Game</h2>
                {/* <h4>{this.props.user.username}</h4> */}
                <ul>
                    {props.auth ? <li className = 'username'>{props.user.username}</li> : '' }
                    {props.auth ? <li onClick = {props.logOut}><Link to = '/'>Logout</Link></li> : '' }
                </ul>
            </div>
        </header>
    )
}

export default Header;