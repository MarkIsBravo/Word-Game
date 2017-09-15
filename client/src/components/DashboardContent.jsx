import React, { Component } from 'react';

import UserProfile from './UserProfile';
import WordList from './WordList';
import Game from './Game';

class DashboardContents extends Component {  
  
  render() {
    return (
      <div className='dashboard-contents'>
        {this.props.currentContent === 'profile' ? <UserProfile 
                                                      userSelectEdit = {this.props.userSelectEdit}
                                                      editUser = {this.props.editUser} 
                                                      currentUserId = {this.props.currentUserId}
                                                      user = {this.props.user}
                                                      deleteUser = {this.props.deleteUser} 
                                                    /> : ''}
        {this.props.currentContent === 'wordlist' ? <WordList 
                                                      user = {this.props.user}
                                                      userWordData = {this.props.userWordData}
                                                      deleteUserWord = {this.props.deleteUserWord}
                                                    /> : ''}
        {this.props.currentContent === 'game' ? <Game 
                                                      user = {this.props.user}
                                                      userWordData = {this.props.userWordData}
                                                    /> : ''}
      </div>
    )
  }
}

export default DashboardContents;