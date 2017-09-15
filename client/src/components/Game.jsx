import React, { Component } from 'react';
import axios from 'axios';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            newWordData: null,
        }
        this.getNewWord = this.getNewWord.bind(this);
        this.saveNewWord = this.saveNewWord.bind(this);
    }

    getNewWord = () => {
        console.log('get new word...');
        axios.get('/word/new')
        .then(res => {
            console.log(res.data);
            this.setState({
                newWordData: res.data,
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    saveNewWord = () =>{
        console.log('save new word...');
        axios.post('/usersword/new', {
            spell: this.state.newWordData[0].spell
        })
        .then(res => {
            this.props.userWordData.push(this.state.newWordData[0])
        })
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        return(
            <div className = 'game-room'>
                <div className = 'word-box'>
                {this.state.newWordData ? 
                    <b>{this.state.newWordData[0].spell}</b>
                    : ''}
                </div>
                <div className = 'test-btn' onClick = {this.getNewWord}>Get New Word</div>
                <div className = 'test-btn' onClick = {this.saveNewWord}>Save This Word</div>
            </div>
        )
    }
}

export default Game;