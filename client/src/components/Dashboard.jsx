import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {
    render(){
        return (
            <div className = 'dashboard'>
                <h4>Welcome, {this.props.user.username} </h4>
            </div>
        )
    }
}

export default Dashboard;