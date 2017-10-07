import React, { Component } from 'react';
import axios from 'axios';

import DashboardNav from './DashboardNav';
import DashboardContent from './DashboardContent';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            userWordData: null,
        }
        this.deleteUserWord = this.deleteUserWord.bind(this);
    }

    componentDidMount(){
        axios.get('/usersword')
        .then(res => {
            console.log(res.data)
            this.setState({
                userWordData: res.data,
            })
        })
        .catch(err => {
            console.log(err);
        });
    };

    deleteUserWord = id =>{
        let confirm = window.confirm(`${this.props.user.nickname}, are you sure you want to delete this word?`);
        if(confirm === true) {
            axios.delete(`/usersword/${id}`)
            .then(res => {
                const updatedWords = [...this.state.userWordData];
                let deletedIndex;

                updatedWords.forEach((word, index) => {
                    if (word.id === id) {
                        deletedIndex = index;
                    };
                });

                updatedWords.splice(deletedIndex, 1);

                this.setState({
                    userWordData: updatedWords,
                });
            })
            .catch(err => {
                console.log(err);
            });
        };
    };

    render(){
        return (
            <div className = 'dashboard'>
                {this.props.auth ? this.props.currentPage === 'dashboard' ? 
                <div>
                    <div className = 'decorations'>
                        {/* <div className = 'headerimg'/> */}
                        <div className='footerimg'/>
                    </div>
                    <div className = 'dashboard-home'>
                        <div className = 'user-btn game-btn' onClick = {() => this.props.setPage('game') & this.props.setContent('game')}>Game</div>
                        <div className = 'user-btnlist'>
                            <div className = 'user-btn wordlist-btn' onClick = {() => this.props.setPage('wordlist') & this.props.setContent('wordlist')}>Wordlist</div>
                            <div className = 'user-btn profile-btn' onClick = {() => this.props.setPage('profile') & this.props.setContent('profile')}>Profile</div>
                            <div className = 'user-btn characters-btn' onClick = {() => this.props.setPage('characters') & this.props.setContent('characters')}>Characters</div>
                        </div>
                        <div className = 'community-btnlist'>
                            <div className = 'user-btn store-btn' onClick = {() => this.props.setPage('store') & this.props.setContent('store')}>Store</div>
                            <div className = 'user-btn leaderboard-btn' onClick = {() => this.props.setPage('leaderboard') & this.props.setContent('leaderboard')}>Leaderboard</div>
                        </div>
                    </div> 
                </div> :
                <div className = 'dashboard-expand'>
                    <DashboardNav setContent = {this.props.setContent} currentContent = {this.props.currentContent}/>
                    <DashboardContent 
                        userSelectEdit = {this.props.userSelectEdit}
                        editUser = {this.props.editUser}
                        deleteUser = {this.props.deleteUser}
                        currentContent = {this.props.currentContent}
                        currentUserId = {this.props.currentUserId}
                        user = {this.props.user}
                        userWordData = {this.state.userWordData}
                        deleteUserWord = {this.deleteUserWord}
                        currency = {this.props.currency}
                        addCurrency = {this.props.addCurrency}
                         />
                </div>
                : ''}
            </div>
        )
    }
}

export default Dashboard;