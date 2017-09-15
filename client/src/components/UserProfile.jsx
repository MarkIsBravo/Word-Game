import React, { Component } from 'react';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: this.props.user.nickname,
            email: this.props.user.email,
            id: this.props.user.id,
        }
    };

    handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    };

    render() {
    return (
      <div className = 'user-profile'>
        <div className = 'user'>
          {this.props.currentUserId === this.props.user.id ?
            <form onSubmit = {this.props.editUser}>
              <input type = 'text' name = 'nickname' placeholder = 'nickname' value = {this.state.nickname} onChange = {this.handleInputChange} />
              <input type = 'text' name = 'email' placeholder = 'email' value = {this.state.email} onChange = {this.handleInputChange} />
              <button type = 'submit'>Submit</button>
            </form> 
            : <h2><span>Nickname: </span>{this.props.user.nickname} <span>Email: </span>{this.props.user.email}</h2> }
        </div>
        <div className='user-buttons'>
          <div className='edit-button' onClick={()=> {this.props.userSelectEdit(this.props.user.id)}}><p>Edit Profile?</p>
          </div>
          <div className='delete-button' onClick={()=> {this.props.deleteUser(this.props.user.id) }}><p>Delete Profile?</p>
          </div>
        </div>

      </div>
    )
  }
}

export default UserProfile;