import React, { Component } from 'react';
import axios from 'axios';

import GameStage from './GameStage';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            newWordData: null,
            unspelled: [],
            spelled: [],
            // letterList: [ 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z' ],
            HP: [1,1,1],
            dudeAnimation: '',
            letters: [],
            started: false,
            isMounted: true,
            combo: 0,
            miles: 0,
        }
        this.getNewWord = this.getNewWord.bind(this);
        this.tryToSave = this.tryToSave.bind(this);
        this.wrongLetter = this.wrongLetter.bind(this);
        this.saveNewWord = this.saveNewWord.bind(this);
        this.changeDisplay = this.changeDisplay.bind(this);
        this.dudeJump = this.dudeJump.bind(this);
        this.deleteAnimation = this.deleteAnimation.bind(this);
        this.collision = this.collision.bind(this);
        this.collisionDetect = this.collisionDetect.bind(this);
        this.createBoxes = this.createBoxes.bind(this);
        this.createManyBoxes = this.createManyBoxes.bind(this);
        this.addMiles = this.addMiles.bind(this);
    };

    // componentWillMount(){
    //     this.getNewWord();
    // }

    componentWillUnmount(){
        this.setState({
            started: false
        })
    //     clearInterval(this.boxInterval);
    //     clearInterval(this.collisionInterval);
    //     clearInterval(this.milesInterval);
    }

    getNewWord(){
        console.log('get new word...');
        axios.get('/word/new')
        .then(res => {
            console.log(res.data);
            this.setState({
                spelled:[],
                newWordData: res.data,
                unspelled: res.data[0].spell.toUpperCase().split('')
            })
        })
        .catch(err => {
            console.log(err)
        });
    };

    tryToSave(){
        let shiftLetter = function(arr){
            arr.shift();
            return arr;
        }
        this.setState({
            spelled: this.state.spelled.concat(this.state.unspelled[0]),
            unspelled: shiftLetter([...this.state.unspelled]),
        })
        let times = this.state.combo + 1;
        this.props.addCurrency(times);
        let banner = document.getElementById('banner');
        if (banner){
            banner.innerHTML = 'Keep going!';
            setTimeout(function(){
                banner.innerHTML = ''
            }, 1000)
        }
        console.log('good job!')
        if([...this.state.unspelled].length === 0){
            this.saveNewWord();
        }
    }

    wrongLetter(){
        let popHealth = function(arr){
            arr.pop();
            return arr;
        }
        this.setState({
            HP: popHealth([...this.state.HP])
        })
        let banner = document.getElementById('banner');
        if (banner){
            banner.innerHTML = 'Whoops, wrong letter';
            setTimeout(function(){
                banner.innerHTML = ''
            }, 1000)
        }
        console.log('Whoops, wrong letter...')
    }

    saveNewWord(){
        let words = this.props.userWordData.map(word => {
            return word.spell;
        });
        if (this.state.newWordData){
            this.setState({
                combo: this.state.combo + 1,
            })
            if(!words.includes(this.state.newWordData[0].spell)){
                console.log('Saving this word...');
                let banner = document.getElementById('banner');
                if (banner){
                    banner.innerHTML = 'Completed a new word!';
                    setTimeout(function(){
                        banner.innerHTML = ''
                    }, 1000)
                }
                axios.post('/usersword/new', {
                    spell: this.state.newWordData[0].spell
                })
                .then(() =>{
                    this.props.userWordData.push(this.state.newWordData[0]);
                })
                .then(() => {
                    this.setState({
                        newWordData: null,
                    });
                })
                .catch(err => {
                    console.log(err);
                });
            }else{
                console.log('This word exists already...');
                let banner = document.getElementById('banner');
                if (banner){
                    banner.innerHTML = 'Reviewed a word!';
                    setTimeout(function(){
                        banner.innerHTML = ''
                    }, 1000)
                }
                this.setState({
                    newWordData: null,
                });
            };
        }
    };

    // spellWord = (letterBox) => {
        // this.setState({
        //     letter: 'W',
        // })
        // if (this.state.letter == this.state.unspelled[0]){
        //     console.log('correct!')
        //     setTimeout(()=>{
        //         this.setState({
        //         unspelled: this.state.unspelled.shift(),
        //     })},1)
        // }
    //     if (letterBox === this.state.unspelled[0]){
    //         let shiftLetter = function(arr){
    //             arr.shift();
    //             return arr
    //         }
    //         this.setState({
    //             spelled: this.state.spelled.concat(this.state.unspelled[0]),
    //             unspelled: shiftLetter([...this.state.unspelled]),
    //         })
    //     } else {
    //         console.log('whoops, wrong letter')
    //     }
    // };

    createBoxes(){
        let randomNum = Math.random() * 2000 + 2000;
        setTimeout(
            () => {
                if (this.state.newWordData){
                    let letterList = this.state.newWordData[0].spell.toUpperCase().split('');
                    this.setState({
                        letters: this.state.letters.concat(letterList[Math.floor(Math.random()*letterList.length)]),
                    })
                }else{
                    this.getNewWord()
                }
            },randomNum)
    }
    createManyBoxes(){
        this.boxInterval = setInterval(this.createBoxes,4000);
        this.milesInterval = setInterval(this.addMiles, 500);
    }
    addMiles(){
        this.setState({
            miles: this.state.miles + 1
        })
    }
    changeDisplay(){
        this.setState({
            started: true,
        })
    }
    dudeJump(){
        this.setState({
            dudeAnimation: 'jump 0.6s 2 alternate'
        })
    }
    deleteAnimation(){
        this.setState({
            dudeAnimation: ''
        })
    }

    collision(){
        let dude = document.getElementById('dude');
        let box = document.getElementsByClassName('box');
        let sky = document.getElementById('sky');

        [...box].forEach(a=>{
            let distance = Math.sqrt(Math.pow((a.offsetLeft - dude.offsetLeft),2) + Math.pow((a.offsetTop - dude.offsetTop),2));
            if (a.offsetLeft < -49){
                sky.removeChild(a)
            }
            if (distance < 50){
                sky.removeChild(a);
                if(a.innerHTML === this.state.unspelled[0]){
                    this.tryToSave()
                }else{
                    this.wrongLetter()
                }
            }
        })
    }

    collisionDetect(){
        this.collisionInterval = setInterval(this.collision,1)
    }

    render(){
        return(
            <div className = 'game-room'>
            {this.state.HP.length > 0 ? 
                <GameStage  
                            unspelled = {this.state.unspelled} 
                            spelled = {this.state.spelled} 
                            tryToSave = {this.tryToSave} 
                            HP = {this.state.HP}
                            wrongLetter = {this.wrongLetter}
                            newWordData = {this.state.newWordData}
                            user= {this.props.user}
                            currency = {this.props.currency}
                            createBoxes = {this.createBoxes}
                            changeDisplay = {this.changeDisplay}
                            dudeJump = {this.dudeJump}
                            deleteAnimation = {this.deleteAnimation}
                            collisionDetect = {this.collisionDetect}
                            createManyBoxes = {this.createManyBoxes}
                            dudeAnimation = {this.state.dudeAnimation}
                            letters = {this.state.letters}
                            started = {this.state.started}
                            combo = {this.state.combo}
                            miles = {this.state.miles}
                            getNewWord = {this.getNewWord}
                            boxInterval = {this.boxInterval}
                            collisionInterval = {this.collisionInterval}
                            milesInterval = {this.milesInterval}
                            />
                : 
                <div className = 'lost-banner'>
                    <h2>Good job!</h2>
                    <h4>Combo: {this.state.combo}</h4>
                    <h4>Your Score: {this.state.miles} mi</h4>
                </div>}
            </div>
        )
    }
}

export default Game;