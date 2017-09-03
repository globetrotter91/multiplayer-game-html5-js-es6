'use strict';
import globals from './globals';

import { 
    enterGame, playerName, usernameSpan, WIDTH, HEIGHT, 
    primaryButton, warningButton, dangerButton, infoButton, 
	ENTERGAME_REQUEST, ENTERGAME_RESPONSE, INITIALIZE, UPDATE, REMOVE, COLOR_SELECTED, GAME_LOST, EVENT_HAPPENED,
	PRIMARY_COLOR, INFO_COLOR, DANGER_COLOR, WARNING_COLOR 
} from './declarations';

import { showError, configure } from './functions';

import {
	serverResponseEnterGame,
	serverResponseColorSelected,
	serverResponseGameLost,
	serverResponseInitialize,
	serverResponseRemove,
	serverResponseUpdate
} from './socket.event.functions';

import Player from './Player';
import Bullet from './Bullet';

enterGame.onclick = () => {
	if(playerName.value.trim()==''){
		playerName.style.borderColor = 'red';
		showError('Name cannot be blank');
		return;
	}

	// if the username is not blank create a new connection
	var socket = io();				
	//sending player name to the server
	socket.emit(ENTERGAME_REQUEST,{ username : playerName.value });			
	usernameSpan.innerHTML = playerName.value;

	// handling server response for new player
	socket.on(ENTERGAME_RESPONSE, serverResponseEnterGame);

	// handling server response when a player is initialized
	socket.on(INITIALIZE, serverResponseInitialize);

	// handling server response when a player is moving or attacking
	socket.on(UPDATE, serverResponseUpdate);

	// handling server response when a player is removed
	socket.on(REMOVE, serverResponseRemove);

	// handling server response when a player selects color to start game
	socket.on(COLOR_SELECTED, serverResponseColorSelected);

	// handling server response when a player has lost
	socket.on(GAME_LOST, serverResponseGameLost);

	//handling the key down event 
	//fires a event sending the event data to server
	//-- helps in movement of the player
	document.onkeydown = (event) => {
		if (socket) {
			if (event.keyCode === 39)	//right
				socket.emit(EVENT_HAPPENED, { inputId: 'right', state: true });
			else if (event.keyCode === 40)	//down
				socket.emit(EVENT_HAPPENED,{ inputId: 'down', state: true });
			else if (event.keyCode === 37) //left
				socket.emit(EVENT_HAPPENED,{ inputId: 'left', state: true} );
			else if (event.keyCode === 38) // up
				socket.emit(EVENT_HAPPENED,{ inputId: 'up', state: true });
		}		
	}

	//handling the key up event 
	//fires a event sending the event data to server based on the key codes
	//-- helps in stopping movement of the player
	document.onkeyup = (event) => {
		if (socket) {
			if(event.keyCode === 39)	//right
				socket.emit(EVENT_HAPPENED, { inputId: 'right', state: false });
			else if(event.keyCode === 40)	//down
				socket.emit(EVENT_HAPPENED, { inputId: 'down', state: false });
			else if(event.keyCode === 37) //left
				socket.emit(EVENT_HAPPENED, { inputId: 'left', state: false });
			else if(event.keyCode === 38) // up
				socket.emit(EVENT_HAPPENED, { inputId:' up', state: false });
		}
	}

	//handling the mouse down/left-click event 
	//fires a event sending the event data to server 
	//-- helps in firing the bullets
	document.onmousedown = (event) => {
		if (socket) {
			socket.emit(EVENT_HAPPENED, { inputId: 'attack', state: true });
		}
	}

	//handling the mouse up event 
	//fires a event sending the event data to server 
	//-- helps in stop firing the bullets
	document.onmouseup = (event) => {
		if (socket) {
			socket.emit(EVENT_HAPPENED, { inputId: 'attack', state: false });
		}
	}
	
	//handling the mouse move event 
	//fires a event sending the event data to server [event data being the mouse angle calculated wrt player]
	//-- helps in firing bullets at a particlar angle 
	//-- helps in positioning the player sprite image 
	document.onmousemove = (event) => { 
		if (socket && globals.playerList[globals.selfId]) {
			var x =  event.clientX - globals.playerList[globals.selfId].x;
			var y =  event.clientY - globals.playerList[globals.selfId].y;
			var angle = Math.atan2(y,x) / Math.PI * 180;
			socket.emit(EVENT_HAPPENED,{inputId:'mouseAngle',state:angle});
		}
	}

	//disabling the right click on the document
	document.oncontextmenu = (event) => {
		event.preventDefault();
	}

	//following four functions 
	//sends the selected color by the player to the server
	primaryButton.onclick = () => {
		socket.emit(EVENT_HAPPENED,{inputId:'colorSelected',state: PRIMARY_COLOR});
	}
	infoButton.onclick = () => {
		socket.emit(EVENT_HAPPENED,{inputId:'colorSelected',state: INFO_COLOR});
	}
	warningButton.onclick = () => {
		socket.emit(EVENT_HAPPENED,{inputId:'colorSelected',state: WARNING_COLOR});
	}
	dangerButton.onclick = () => {
		socket.emit(EVENT_HAPPENED,{inputId:'colorSelected',state: DANGER_COLOR});
	}

	//checks the connection is active with the server	
	// * note - this can also be achieved in more optimized manner user service workers if the the connection is https
	var connectionManager = setInterval(function(){
		if(socket.disconnected){
			showError('Error in server connection');
			setTimeout(function(){
				clearInterval(connectionManager); 
				location.reload(); 
			},3000)
		}
	}, 1000);
}
//configure the size of the canvas based on the size of the screen.
configure()