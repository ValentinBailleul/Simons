import React, {Component} from 'react';
import axios from 'axios';
axios.defaults.headers['Accept'] = 'application/json';
const ms = require('pretty-ms');
class Home extends React.Component {

    constructor() {
        super();

        this.COLOR_ARRAY = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        this.GAME_COLORS = [];
        this.USER_COLORS = [];

        this.state = {
            sequences: [],
            value: "",
            counterS: 0,
            sequencechoose: 0,
            complexity: "",
            theName: "",
            theUsers: [],
            setIdPost: [],
            visibility: false,
            gameValue: "",
            winner: "",
            numberGameColors: 0,
            time: 0,
            start: 0,
            numberUserColors: 0
        }
        
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.initialState = this.initialState.bind(this);
        this.onGameStart = this.onGameStart.bind(this);
        this.generateColor = this.generateColor.bind(this);
        this.playColors = this.playColors.bind(this);
        this.userMoves = this.userMoves.bind(this);
        this.winnerCheck = this.winnerCheck.bind(this);
    }

    startTimer() {
        this.setState({
          isOn: true,
          time: this.state.time,
          start: Date.now() - this.state.time
        })
        this.timer = setInterval(() => this.setState({
          time: Date.now() - this.state.start
        }), 1);
    }

    stopTimer() {
        this.setState({isOn: false})
        clearInterval(this.timer)
    }

    
    initialState() {
        this.setState({
            value: "",
            complexity: "",
            visibility: false,
            gameValue: "",
            winner: "",
            numberGameColors: 0,
            numberUserColors: 0
        })
    }

    handleChange(event) {
        this.setState({theName: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        this.postUser();
        console.log(this.state.theName);
      }

    componentDidMount() {
        this.getSequences();
        this.getUsers();
    }

    postUser() {
        var data = {
            name: this.state.theName,
            score: this.state.time
        }
        axios.post('/api/user_simons', data)
            .then((response) => {
               console.log(response.data);
            })
    }

    getSequences() {
        axios.get('/api/sequences')
            .then(response => {
                this.setState({ sequences: response.data })
            })
    }

    getUsers() {
        axios.get('/api/user_simons')
            .then(response => {
                this.setState({ theUsers: response.data })
            })
    }



    //On génère les couleurs à chaque start (comme indiqué sur la page, il faut appuyer sur start pour passer à la séquence suivante)
    onGameStart() {        
        this.generateColor();
    }

   //On génère les couleurs aléatoirement que l'on récupère par l'api grâce aux séquences (une seul au départ, puis deux, puis trois,...)
   generateColor() {

    if(this.state.counterS === 0)
    {
        this.GAME_COLORS.push(this.state.sequences[1].number1 - 1);
    }
    if(this.state.counterS === 1)
    {
        this.GAME_COLORS.push(this.state.sequences[1].number2 - 1);
    }
    if(this.state.counterS === 2)
    {
        this.GAME_COLORS.push(this.state.sequences[1].number3 - 1);
    }
    if(this.state.counterS === 3)
    {
        this.GAME_COLORS.push(this.state.sequences[1].number4 - 1);
    }
    if(this.state.counterS === 4)
    {
        this.GAME_COLORS.push(this.state.sequences[1].number5 - 1);
    }
    this.setState({numberGameColors: this.GAME_COLORS.length })
    
    console.log(this.GAME_COLORS);
    this.playColors();
    this.state.counterS = this.state.counterS + 1;
    }

    playColors() {
        let count = 0;
        let colorInterval;

        let colorChange = () => {
            if(count !== this.GAME_COLORS.length){
                this.setState({
                    gameValue: this.COLOR_ARRAY[this.GAME_COLORS[count]]
                });

                setTimeout(() => {this.setState({gameValue: ''})}, 500);
                count += 1;
                return;
            } else {
                clearInterval(colorInterval);
                return;
            }
        } 
        colorInterval = setInterval(colorChange.bind(this), 1000);
    }

    userMoves() {
        console.log("ca ne fonctionne pas");
        this.USER_COLORS.push(1);
        let colorHighlighted = '';

            switch (this.USER_COLORS[0]) {
                case '1':
                    colorHighlighted = 'Button1Allumer'
                    break;
                case '2':
                    colorHighlighted = 'Button2Allumer'
                    break;
                case '3':
                    colorHighlighted = 'Button3Allumer'
                    break;
                case '4':
                    colorHighlighted = 'Button4Allumer'
                    break;
                case '5':
                    colorHighlighted = 'Button5Allumer'
                    break;
                case '6':
                    colorHighlighted = 'Button6Allumer'
                    break;
                case '7':
                    colorHighlighted = 'Button7Allumer'
                    break;
                case '8':
                    colorHighlighted = 'Button8Allumer'
                    break;
                case '9':
                    colorHighlighted = 'Button9Allumer'
                    break;
            
        }

        this.setState({
            gameValue: colorHighlighted,
            numberUserColors: this.USER_COLORS.length
        });
        console.log("correct");
        this.winnerCheck();
    }

    winnerCheck() {
        let fail = false,
        countTrues = 0,
        countFails = 0,
        len = this.USER_COLORS.length - 1;
        
        if (this.USER_COLORS[len] === this.COLOR_ARRAY[this.GAME_COLORS[len]]) {
            countTrues++;
        } 
        else if (
            this.USER_COLORS[len] !== this.COLOR_ARRAY[this.GAME_COLORS[len]]) {
            console.log("raté");
            countFails++;
            fail = true;

            if (countFails === 2) {
                console.log("game over");
            }
        }
    }

    render() {     
        let start = (this.state.time == 0) ? <button onClick={this.startTimer}>Déclenchez le chronomètre</button> :  null;
        let stop = (this.state.time == 0 || !this.state.isOn) ? null : <button onClick={this.stopTimer}>Stopper le chronomètre</button>
        return (
            
            <div id="center">
                <h1>Bienvenue sur mon jeu Simons ! </h1>
                <h3>Le but du jeu est simple, appuyer sur le bouton "Déclenchez le chronomètre", atteignez la séquence numéro 5 en cliquant sur le bouton "Start" puis appuyez rapidement sur le bouton "Stopper le chronomètre", bonne chance !</h3>
                <div> Séquence: {this.state.numberGameColors} </div>
                <div>{this.state.numberGameColors === 5 ? 'Félicitation ! vous avez gagné ! Votre score est ' + this.state.time + ' ! Veuillez recharger la page si vous souhaité recommencer et améliorer votre score !' : 'Cliquez de nouveau sur start pour la prochaine séquence'} </div>
                <div id="startBox">
                    <div id="startButton"></div>
                    <button value="start" onClick={this.onGameStart}>  Start  </button>
                </div>
                <div>
                    <h3>Votre temps : {ms(this.state.time)}</h3>
                    {start}
                    {stop}
                </div>
                
                <div style = {{display: this.state.counterS === 5 ? 'block' : 'none'}}> 
                <form>
                    <h4>Enregistrez-vous et découvrez qui a déjà joué !</h4>
                    <label>
                        Nom :
                        <input type="text" value={this.state.theName} onChange={this.handleChange} />
                    </label>
                    <button value="Envoyer" onClick={this.handleSubmit} >Envoyer</button>
                </form>
                <hr/>
                <div className="row justify-content-center">
                    <table class="table">
                        <thead class="thead-light">
                        <tr>
                            <th>Pseudo</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.theUsers.map(theUser =>
                            <tr>
                                <td>{theUser.name}</td>
                                <td>{theUser.score}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="gameContainer">
                <button 
                    className={this.state.gameValue === '1'? 'button1Allumer' : 'button1'}
                    value="1" 
                    name="button1"
                    onClick= {this.winnerCheck}
                />
                <button 
                    className={this.state.gameValue === '2'? 'button2Allumer' : 'button2'}
                    value="2" 
                    name="button2"
                    onClick= {this.userMoves}
                />
                <button 
                    className={this.state.gameValue === '3'? 'button3Allumer' : 'button3'}
                    value="3" 
                    name="button3"
                    onClick= {this.userMoves}
                />
                <button 
                    className={this.state.gameValue === '4'? 'button4Allumer' : 'button4'}
                    value="4" 
                    name="button4"
                    onClick= {this.userMoves}
                />
                <button
                    className={this.state.gameValue === '5'? 'button5Allumer' : 'button5'}
                    value="5" 
                    name="button5"
                    onClick= {this.userMoves}
                />
                <button 
                    className={this.state.gameValue === '6'? 'button6Allumer' : 'button6'}
                    value="6" 
                    name="button6"
                    onClick= {this.userMoves}
                />
                <button 
                    className={this.state.gameValue === '7'? 'button7Allumer' : 'button7'}
                    value="7" 
                    name="button7"
                    onClick= {this.userMoves}
                />
                <button 
                    className={this.state.gameValue === '8'? 'button8Allumer' : 'button8'}
                    value="8" 
                    name="button8"
                    onClick= {this.userMoves}
                />
                <button 
                    className={this.state.gameValue === '9'? 'button9Allumer' : 'button9'}
                    value="9" 
                    name="button9"
                    onClick= {this.userMoves}
                />
            </div>
          </div>
        )
    }
}
    
export default Home;