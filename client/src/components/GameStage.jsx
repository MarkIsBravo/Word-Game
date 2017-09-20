import React, { Component } from 'react';

class GameStage extends Component {
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
                                <div className = 'center-board'>
                                    <div className = 'word-board' style = {{display:'flex'}}>
                                        {this.props.spelled.length > 0 ? this.props.spelled.map(letter => {
                                            return <div className = 'spelled'><b>{letter}</b></div>
                                        }) : ''}
                                        {this.props.unspelled.length>0 ? this.props.unspelled.map(letter => {
                                            return <div className = 'unspelled'>{letter}</div>
                                        }) : ''}
                                    </div>
                                    <div className = 'combo'><p>Combo:  </p><b>{this.props.combo}</b></div>
                                </div>
                                <div className = 'currency'>
                                    {this.props.user ? `$${this.props.currency}` : ''}
                                </div>
                            </div>

                        <div id = 'dude' style = {{animation:this.props.dudeAnimation}} onAnimationEndCapture ={()=>{this.props.deleteAnimation()}}/>

                        <div className = 'start-banner' style={this.props.started !== true ? {display: 'inline'} : {display: 'none'}} onClick ={() => {this.props.createManyBoxes() & this.props.changeDisplay()}}>Start Game</div>
                        
                        {this.props.letters.length === 0 ? '' : this.props.letters.map(letter=>{
                            return <div className = 'box'>{letter}</div>
                        })}
                    </div>
                    <div id = 'ground'>
                        <div id = 'banner'/>
                    </div>
                    </div>
                : <div className = 'lost-banner'><h2>Good job!</h2><h4>Combo: {this.props.combo}</h4></div>}
            </div>
        )
    }
}

export default GameStage;