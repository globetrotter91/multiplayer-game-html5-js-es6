import React, { Component } from 'react';

class Home extends Component {
    render() {
		return (
			<div className='user_div' id='userDiv'>
				<div className='login_box' id='loginBox'>
					<span>Enter username and press start!</span>
					<input className='username' id="playerName" type="text" placeholder="Enter Name" autoFocus/>
					<button type="button" id="enterGame" className='enter_button'>Start</button>
					
				</div>
				<div className='game_instructions' id='gameInstructions'>
					<p style={{ textAlign:'center' }} id='gameInstructions0'></p>
					<br/>
					<p id='gameInstructions1'></p>
					<p id='gameInstructions2'></p>
					<p id='gameInstructions3'></p>
					<p id='gameInstructions4'></p>
					<br/>
					<p id='gameInstructions5'></p>
					<p id='gameInstructions6'></p>
					<p id='gameInstructions7'></p>
					<p id='gameInstructions8'></p>
					<div className='start_gameWithColor' id='startGameWithColor'>
						<button id='primaryColor' className='btn btn-primary'>Start Game</button>
						<button id='warningColor' className='btn btn-warning'>Start Game</button>
						<button id='dangerColor' className='btn btn-danger'>Start Game</button>
						<button id='infoColor' className='btn btn-info'>Start Game</button>
						
					</div>
				</div>
				
				<div id='space'>
					<div className="stars"></div>
					<div className="stars"></div>
					<div className="stars"></div>
					<div className="stars"></div>
					<div className="stars"></div>
				</div>
			</div>
		);
    }
}

export default Home;
