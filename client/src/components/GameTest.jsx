import React, { Component } from 'react';

class GameTest extends Component {
    constructor(){
        super();
        this.state={
            dudeAnimation: '',
            letters: [],
        }
    }
    
    createBoxes=()=>{
        let letterList = [...this.props.letterList]
        this.setState({
            letters: this.state.letters.concat(letterList[Math.floor(Math.random()*26)]),
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
    render(){
        return(
            <div className ='game-stage' onClickCapture = {() => this.dudeJump()}>
                <div id = 'sky'>
                    <div className = 'word-board' style = {{display:'flex'}}>
                        {this.props.unspelled.length>0 ? this.props.unspelled.map(letter => {
                            return <div>{letter}</div>
                        }) : ''}
                    </div>
                    <div id = 'dude' style = {{animation:this.state.dudeAnimation}} onAnimationEndCapture ={()=>{this.deleteAnimation()}}/>
                    <div className = 'box' />
                    <button onClick = {()=>{setInterval(this.createBoxes,3000)}}>create</button>
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

export default GameTest;