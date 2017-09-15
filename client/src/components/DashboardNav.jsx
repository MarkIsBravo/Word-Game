import React, { Component } from 'react';

class DashboardNav extends Component {
    render() {
        return (
            <div className = 'dashboard-nav'>
                <div className = {this.props.currentContent === 'profile'? 'selected': ''} onClick = {() => this.props.setContent('profile')}>profile</div>
                <div className = {this.props.currentContent === 'wordlist'? 'selected': ''} onClick = {() => this.props.setContent('wordlist')}>wordlist</div>
                <div className = {this.props.currentContent === 'join'? 'selected': ''} onClick = {() => this.props.setContent('join')}>join</div>
                <div className = {this.props.currentContent === 'characters'? 'selected': ''} onClick = {() => this.props.setContent('characters')}>characters</div>
                <div className = {this.props.currentContent === 'store'? 'selected': ''} onClick = {() => this.props.setContent('store')}>store</div>
                <div className = {this.props.currentContent === 'leaderboard'? 'selected': ''} onClick = {() => this.props.setContent('leaderboard')}>leaderboard</div>
            </div>
        )
    }
}

export default DashboardNav;