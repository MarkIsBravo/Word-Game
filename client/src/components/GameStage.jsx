import React, { Component } from 'react';

class GameStage extends Component {
    componentDidMount(){
        this.props.collisionDetect();
        this.props.getNewWord();
    }
    componentWillUnmount(){
        clearInterval(this.props.boxInterval);
        clearInterval(this.props.collisionInterval);
        clearInterval(this.props.milesInterval);
    }
    render(){
        return(
            <div>
                <div className ='game-stage' onClick = {this.props.dudeJump}>
                    <div id = 'sky'>
                        <div className = 'start-banner' style={this.props.started !== true ? {display: 'inline'} : {display: 'none'}} onClick ={() => {this.props.createManyBoxes() & this.props.changeDisplay()}}>
                            <h3>Start Game</h3>
                            <div className = 'game-instruction'><p>Click the screen to jump. Spell the word by smashing the boxes according to the sequence!</p></div>
                        </div>

                        <div className = 'game-header'>
                            <div className = 'left-board'>
                                <div className = 'hp-bar'>
                                    {this.props.HP.length > 0 ? this.props.HP.map(dot => {
                                        return <div className = 'hp-dot'/>
                                    }) : ''}
                                </div>
                                <div className = 'numbers miles'><p><b>{this.props.miles}</b> mi</p></div>
                            </div>
                            <div className = 'center-board'>
                                <div className = 'word-board' style = {{display:'flex'}}>
                                    {this.props.spelled.length > 0 ? this.props.spelled.map(letter => {
                                        return <div className = 'spelled'><b>{letter}</b></div>
                                    }) : ''}
                                    {this.props.unspelled.length > 0 ? this.props.unspelled.map(letter => {
                                        return <div className = 'unspelled'>{letter}</div>
                                    }) : ''}
                                </div>
                            </div>
                            <div className = 'right-board'>
                                <div className = 'currency'>
                                    {this.props.user ? `$${this.props.currency}` : ''}
                                </div>
                                <div className = 'numbers combo'><p>Combo:  </p><b>{this.props.combo}</b></div>
                            </div>
                        </div>

                        <div id = 'dude' style = {{animation:this.props.dudeAnimation}} onAnimationEndCapture ={()=>{this.props.deleteAnimation()}}/>
                        
                        {this.props.letters.length === 0 ? '' : this.props.letters.map(letter=>{
                            return <div className = 'box'>{letter}</div>
                        })}
                    </div>
                    <div id = 'ground'>
                        <div id = 'banner'/>
                    </div>
                    {/* <div className = 'jump-btn'  onClickCapture = {() => this.props.dudeJump()}>
                        <b>JUMP</b>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default GameStage;