import React, { Component } from 'react';

class GameStage extends Component {
    constructor(props){
        super(props);
        this.state={
            dudeAnimation: '',
            letters: [],
            unspelled: this.props.unspelled,
            spelled: this.props.spelled,
            started: false,
        }
    }
    
    createBoxes=()=>{
        let letterList = this.props.newWordData[0].spell.toUpperCase().split('')
        this.setState({
            letters: this.state.letters.concat(letterList[Math.floor(Math.random()*letterList.length)]),
        })
        // if (this.state.letters.length > 4){
        //     let shiftLetter = function(arr){
        //         arr.shift();
        //         return arr
        //     }
        //     this.setState({
        //         letters: shiftLetter([...this.state.letters])
        //     })
        // }
    }
    changeDisplay = () => {
        this.setState({
            started: true,
        })
    }
    dudeJump = () => {
        this.setState({
            dudeAnimation: 'jump 0.6s 2 alternate'
        })
    }
    deleteAnimation = () => {
        this.setState({
            dudeAnimation: ''
        })
    }

    collisionDetect = () => {
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
                if(a.innerHTML === this.props.unspelled[0]){
                    this.props.tryToSave()
                }else{
                    this.props.wrongLetter()
                }
            }
        })
    }
    render(){
        return(
            <div className ='game-stage' onClickCapture = {() => this.dudeJump()} onClick = {()=>{setInterval(this.collisionDetect,1)}}>
                <div id = 'sky'>

                    <div className = 'word-board' style = {{display:'flex'}}>
                        {this.props.spelled.length > 0 ? this.props.spelled.map(letter => {
                            return <div className = 'spelled'><b>{letter}</b></div>
                        }) : ''}
                        {this.props.unspelled.length>0 ? this.props.unspelled.map(letter => {
                            return <div className = 'unspelled'>{letter}</div>
                        }) : ''}
                    </div>
                    <div className = 'hp-bar'>
                        {this.props.HP.length > 0 ? this.props.HP.map(dot => {
                            return <div className = 'hp-dot'/>
                        }) : ''}
                    </div>

                    <div id = 'dude' style = {{animation:this.state.dudeAnimation}} onAnimationEndCapture ={()=>{this.deleteAnimation()}}/>

                    <button style={this.state.started != true ? {display: 'inline'} : {display: 'none'}} onClick = {()=>{setInterval(this.createBoxes,3000);this.changeDisplay()}}>Start Game</button>
                    
                    {this.state.letters.length > 0 ? this.state.letters.map(letter=>{
                        return <div className = 'box'>{letter}</div>
                    }):''}
                </div>
                <div id = 'ground'>
                </div>
            </div>
        )
    }
}

export default GameStage;