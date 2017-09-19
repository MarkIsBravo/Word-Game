import React, { Component } from 'react';

class GameStage extends Component {
    constructor(){
        super();
        this.state = {
            word: [],
        }
        // this.updateState = this.updateState.bind(this);
    }

    componentDidMount(){
        let gameStage = document.getElementById('game-stage');
        let sky = document.createElement('div');
        sky.setAttribute('id', 'sky');
        gameStage.appendChild(sky);
        let dude = document.createElement('div');
        dude.setAttribute('id', 'dude');
        sky.appendChild(dude);
        let ground = document.createElement('div');
        ground.setAttribute('id', 'ground');
        gameStage.appendChild(ground);

        window.addEventListener('keydown', function(e){
            // console.log(dude.offsetTop + ' ' + dude.offsetLeft);
            if (e.keyCode === 87){
                dude.style.animation = 'jump 0.6s 2 alternate';
            }
            dude.addEventListener("animationend", function(){
                // console.log('animation ended');
                dude.style.animation = '';
            })
        })
        this.createBoxes();
        this.collisionDetect();
    }
    // componentWillUnmount(){
    //     let gameStage = document.getElementById('game-stage');
    //     let sky = document.getElementById('sky');
    //     let ground = document.getElementById('ground');
    //     gameStage.removeChild(sky);
    //     gameStage.removeChild(ground);
    // }
    createBoxes = () => {
        let letterList = [...this.props.letterList];
        let sky = document.getElementById('sky');
        let dude = document.getElementById('dude');
        if (sky){
            setInterval(function(){
                let box = document.createElement('div');
                box.setAttribute('class', 'box');
                box.innerHTML = letterList[Math.floor(Math.random()*26)];
                sky.appendChild(box);
            }, 3000)
        }
    }
    // updateState (e) {
    //     this.setState({
    //         word: this.state.word.push(e)
    //     })
    // }
    collisionDetect = () => {
        setInterval(function(){
            let dude = document.getElementById('dude');
            let box = document.getElementsByClassName('box');
            let sky = document.getElementById('sky');

            [...box].forEach(function(a){
                let distance = Math.sqrt(Math.pow((a.offsetLeft - dude.offsetLeft),2) + Math.pow((a.offsetTop - dude.offsetTop),2));
                if (a.offsetLeft < -49){
                    sky.removeChild(a)
                }
                if (distance < 50){
                    console.log(a.innerHTML);
                    sky.removeChild(a);
                    // updateState(a.innerHTML);
                }
            })
            // if (box.offsetLeft - dude.offsetLeft < 50 && box.offsetTop - dude.offsetTop < 50){
            //     console.log('hit!')
            // }
        },100)
    }
    render(){
        return(
            <div id = 'game-stage' />
        )
    }
}

export default GameStage;