import React, { Component } from 'react';
import axios from 'axios';

class WordList extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         userWordData: null,
    //     }
    // }

    // componentDidMount(){
    //     axios.get('/usersword')
    //     .then(res => {
    //         console.log(res.data)
    //         this.setState({
    //             userWordData: res.data,
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    // }

    render(){
        return (
            <div className = 'wordlist-container'>
                {this.props.userWordData ? 
                    this.props.userWordData.map(word => {
                        return  <div className = 'word-single' key = {word.id}>
                                    {word.spell}
                                    <div key = {word.id} onClick = {() => {this.props.deleteUserWord(word.id)}}>delete</div>
                                </div>
                    })
                    : <h4>Your word list is empty...</h4>}
            </div>
        )
    }
}

export default WordList;