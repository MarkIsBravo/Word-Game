import React, { Component } from 'react';

import UserProfile from './UserProfile';

class DashboardContents extends Component {  
  
  render() {
    return (
      <div className='dashboard-contents'>
        {this.props.currentContent === 'profile' ? <UserProfile 
                                                            userSelectEdit = {this.props.userSelectEdit}
                                                            editUser = {this.props.editUser} 
                                                            currentUserId = {this.props.currentUserId}
                                                            user = {this.props.user}
                                                            
                                                            deleteUser = {this.props.deleteUser} /> : ''}
      </div>
    )
  }
}

export default DashboardContents;