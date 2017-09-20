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
                <div className = 'wordlist'>
                    {this.props.userWordData ? 
                        this.props.userWordData.map(word => {
                            return  <div className = 'word-single' key = {word.id}>
                                        <div className = 'word'>{word.spell}</div>
                                        <div className = 'delete-btn' key = {word.id} onClick = {() => {this.props.deleteUserWord(word.id)}}>delete</div>
                                    </div>
                        })
                        : <h4>Your word list is empty...</h4>}
                </div>
                <div className = 'word-detail'>
                    Detail of the words would show up here...
                </div>
            </div>
        )
    }
}

export default WordList;