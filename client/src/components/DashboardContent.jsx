import React, { Component } from 'react';

import UserProfile from './UserProfile';
import WordList from './WordList';
import Game from './Game';
import CharacterList from './CharacterList';
import Store from './Store';
import Leaderboard from './Leaderboard';

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
                                                      currency = {this.props.currency}
                                                      addCurrency = {this.props.addCurrency}
                                                    /> : ''}
        {this.props.currentContent === 'characters' ? <CharacterList
                                                      user = {this.props.user} 
                                                    /> : ''}
        {this.props.currentContent === 'store' ? <Store 
                                                      user = {this.props.user}
                                                    /> : ''}
        {this.props.currentContent === 'leaderboard' ? <Leaderboard 
                                                      user = {this.props.user}
                                                    /> : ''}
      </div>
    )
  }
}

export default DashboardContents;