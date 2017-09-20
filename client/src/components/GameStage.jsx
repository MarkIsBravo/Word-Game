import React, { Component } from 'react';

class GameStage extends Component {
    // constructor(props){
    //     super(props);
    //     this.state={
    //         dudeAnimation: '',
    //         letters: [],
    //         started: false,
    //         isMounted: true,
    //     }
    //     this.createBoxes = this.createBoxes.bind(this);
    //     this.changeDisplay = this.changeDisplay.bind(this);
    //     this.dudeJump = this.dudeJump.bind(this);
    //     this.deleteAnimation = this.deleteAnimation.bind(this);
    //     this.collisionDetect = this.collisionDetect.bind(this);
    //     this.createManyBoxes = this.createManyBoxes.bind(this);
    // }

    // // componentDidMount(){
    // //     console.log('game loaded')
    // // }

    // // componentWillUnmount(){
    // //     this.setState({
    // //         isMounted: false
    // //     })
    // // }

    // createBoxes(){
    //         if (this.props.newWordData){
    //             let letterList = this.props.newWordData[0].spell.toUpperCase().split('');
    //             this.setState({
    //             letters: this.state.letters.concat(letterList[Math.floor(Math.random()*letterList.length)]),
    //             })
    //         }
    // }
    // createManyBoxes(){
    //     setInterval(this.createBoxes,2000)
    // }
    // changeDisplay(){
    //     this.setState({
    //         started: true,
    //     })
    // }
    // dudeJump(){
    //     this.setState({
    //         dudeAnimation: 'jump 0.6s 2 alternate'
    //     })
    // }
    // deleteAnimation(){
    //     this.setState({
    //         dudeAnimation: ''
    //     })
    // }

    // collisionDetect(){
    //     let dude = document.getElementById('dude');
    //     let box = document.getElementsByClassName('box');
    //     let sky = document.getElementById('sky');

    //     [...box].forEach(a=>{
    //         let distance = Math.sqrt(Math.pow((a.offsetLeft - dude.offsetLeft),2) + Math.pow((a.offsetTop - dude.offsetTop),2));
    //         if (a.offsetLeft < -49){
    //             sky.removeChild(a)
    //         }
    //         if (distance < 50){
    //             sky.removeChild(a);
    //             if(a.innerHTML === this.props.unspelled[0]){
    //                 this.props.tryToSave()
    //             }else{
    //                 this.props.wrongLetter()
    //             }
    //         }
    //     })
    // }
    render(){
        return(
            <div>
                {this.props.HP.length > 0 ? 
                    <div className ='game-stage' onClickCapture = {() => this.props.dudeJump()} onClick = {()=>{setInterval(this.props.collisionDetect,1)}}>
                        <div id = 'sky'>
                            <div className = 'game-header'>
                                <div className = 'hp-bar'>
                                    {this.props.HP.length > 0 ? this.props.HP.map(dot => {
                                        return <div className = 'hp-dot'/>
                                    }) : ''}
                                </div>
                                <div className = 'word-board' style = {{display:'flex'}}>
                                    {this.props.spelled.length > 0 ? this.props.spelled.map(letter => {
                                        return <div className = 'spelled'><b>{letter}</b></div>
                                    }) : ''}
                                    {this.props.unspelled.length>0 ? this.props.unspelled.map(letter => {
                                        return <div className = 'unspelled'>{letter}</div>
                                    }) : ''}
                                    <b>Combo: {this.props.combo}</b>
                                </div>
                                <div className = 'currency'>
                                    {this.props.user ? `$$${this.props.currency}` : ''}
                                </div>
                            </div>

                        <div id = 'dude' style = {{animation:this.props.dudeAnimation}} onAnimationEndCapture ={()=>{this.props.deleteAnimation()}}/>

                        <button style={this.props.started !== true ? {display: 'inline'} : {display: 'none'}} onClick ={() => {this.props.createManyBoxes() & this.props.changeDisplay()}}>Start Game</button>
                        
                        {this.props.letters.length === 0 ? '' : this.props.letters.map(letter=>{
                            return <div className = 'box'>{letter}</div>
                        })}
                    </div>
                    <div id = 'ground'>
                    </div>
                    </div>
                : <div className = 'lost-banner'><h2>Good job!</h2><h4>Combo: {this.props.combo}</h4></div>}
            </div>
        )
    }
}

export default GameStage;