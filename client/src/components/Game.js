import React, { Component } from 'react';

class Game extends Component {
    render() {
		return (
			    <div id="gameDiv" style={{'display':'none'}}>
                    <div className="ui-div">
                        <div className='ui-div-score'> Killings: <span id="scoreSpan">0</span></div>
                        <div className='ui-div-username'><span id="usernameSpan"></span></div>
                        <div className='ui-div-lives'> Lives Remaining: <span id="livesSpan">0</span></div>
                    </div>
                    <canvas id="ctx" ></canvas>	
                </div>
		);
    }
}

export default Game;
