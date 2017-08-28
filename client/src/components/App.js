import React, { Component } from 'react';
import Home from './Home';
import Game from './Game';

class App extends Component {
    render() {
			return (
				<div>
					<div className='error' id='globalError'>Hello</div>
					<Home />
					<Game />
					<div className='game_instructions' id='gameLostDiv' style={{top:'30%',textAlign:'center'}}>
						<h1> Your Score <span id='finalScoreSpan'></span> </h1>
						<h2> You Lost your 5 lives </h2>
						<h2> Take 24 hours to think what actually went wrong. </h2>
						<h3> See you tomorrow, same time. </h3>
						<h1> Bye </h1>
					</div>
				</div>
			);
    }
}

export default App;
