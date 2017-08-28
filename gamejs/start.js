import { 
    enterGame, playerName, usernameSpan, loginBox, gameInstructions, gameInstructions0, WIDTH, HEIGHT, 
    signDiv, gamePage, gameLostDiv, finalScoreSpan, primaryButton, warningButton, dangerButton, infoButton, 
    ENTERGAME_REQUEST, ENTERGAME_RESPONSE, INITIALIZE, UPDATE, REMOVE, COLOR_SELECTED, GAME_LOST, EVENT_HAPPENED 
} from './declarations';
import { showError, printInstructions, updateView, configure } from './functions';
import { Player, Bullet } from './models';

import globals from './globals';

enterGame.onclick = () => {
	if(playerName.value.trim()==''){
		playerName.style.borderColor = 'red';
		showError('Name cannot be blank');
		return;
	}
	
	var socket = io();
	
	
		
	socket.emit(ENTERGAME_REQUEST,{ username : playerName.value });
	usernameSpan.innerHTML = playerName.value;
	socket.on(ENTERGAME_RESPONSE,function(data){
		if(data.status){
			if(data.newUser){
				loginBox.style.display = 'none';
				gameInstructions.style.display = 'block';
				gameInstructions.style.height = Math.floor(0.7*HEIGHT) + 'px';
				printInstructions(gameInstructions0);
			}else{
				signDiv.style.display = 'none';
				gamePage.style.display = 'block';
			}				
		} else{
			//alert(res.error);
			showError(data.error);

		}		
	});


	socket.on(INITIALIZE,function(data){	
		//console.log(data);
		if(data.selfId) globals.selfId = data.selfId;
		for(var i = 0 ; i < data.player.length; i++){
			new Player(data.player[i]);
		}
		for(var i = 0 ; i < data.bullet.length; i++){
			new Bullet(data.bullet[i]);
		}
		updateView();
	});

	socket.on(UPDATE,function(data){
		for(var i = 0 ; i < data.player.length; i++){
			var pack = data.player[i];
			var p = Player.list[pack.id];
			//console.log(p, pack.x);
			if(p){
				if(pack.x !== undefined)
					p.x = pack.x;
				if(pack.y !== undefined)
					p.y = pack.y;
				if(pack.hp !== undefined)
					p.hp = pack.hp;
				if(pack.score !== undefined)
					p.score = pack.score;
				if(pack.lives !== undefined)
					p.lives = pack.lives;
				if(pack.mouseAngle !== undefined)
					p.mouseAngle = pack.mouseAngle;
				if(pack.directionMod !== undefined)
					p.directionMod = pack.directionMod;
				if(pack.spriteAnimCounter !== undefined)
					p.spriteAnimCounter = pack.spriteAnimCounter;
				if(pack.color !== undefined)
					p.color = pack.color;
				
			}
		}
		if(data.player.length!==Player.list.length){
			for(var id in Player.list){
				var check = 0;
				for(var i = 0 ; i < data.player.length; i++){
					if(id == data.player[i].id){
						check=1;
						break;
					}
				}
				if(check==0){
					delete Player.list[id]
				}
			}
		}
		for(var i = 0 ; i < data.bullet.length; i++){
			var pack = data.bullet[i];
			var b = Bullet.list[data.bullet[i].id];
			if(b){
				if(pack.x !== undefined)
					b.x = pack.x;
				if(pack.y !== undefined)
					b.y = pack.y;
			}
		}
		updateView();

		
	});

	socket.on(REMOVE,function(data){
		for(var i = 0 ; i < data.player.length; i++){
			delete Player.list[data.player[i]];
		}
		for(var i = 0 ; i < data.bullet.length; i++){
			delete Bullet.list[data.bullet[i]];
		}
		updateView();
	});

	socket.on(COLOR_SELECTED,function(data){
		if(data.status){
			signDiv.style.display = 'none';
			gamePage.style.display = 'block';
			updateView();
		}else{
			showError('Some problem with server. Please try after some time.');
		}	
	});

	socket.on(GAME_LOST, function(data){
		//console.log('in game lost', data);
		gamePage.style.display = 'none';
		gameLostDiv.style.display = 'block';
		finalScoreSpan.innerHTML = data.score;
		socket = null; 
	})

	document.onkeydown = function(event){
		if(socket){
			if(event.keyCode === 39)	//right
				socket.emit(EVENT_HAPPENED,{inputId:'right',state:true});
			else if(event.keyCode === 40)	//down
				socket.emit(EVENT_HAPPENED,{inputId:'down',state:true});
			else if(event.keyCode === 37) //left
				socket.emit(EVENT_HAPPENED,{inputId:'left',state:true});
			else if(event.keyCode === 38) // up
				socket.emit(EVENT_HAPPENED,{inputId:'up',state:true});
		}		
	}
	document.onkeyup = function(event){
		if(socket){
			if(event.keyCode === 39)	//right
				socket.emit(EVENT_HAPPENED,{inputId:'right',state:false});
			else if(event.keyCode === 40)	//down
				socket.emit(EVENT_HAPPENED,{inputId:'down',state:false});
			else if(event.keyCode === 37) //left
				socket.emit(EVENT_HAPPENED,{inputId:'left',state:false});
			else if(event.keyCode === 38) // up
				socket.emit(EVENT_HAPPENED,{inputId:'up',state:false});
		}
	}

	document.onmousedown = function(event){
		if(socket){
			socket.emit(EVENT_HAPPENED,{inputId:'attack',state:true});
		}
		
	}
	document.onmouseup = function(event){
		if(socket){
			socket.emit(EVENT_HAPPENED,{inputId:'attack',state:false});
		}
		
	}
	var oldClientX = 0, oldClientY = 0 ;  
	document.onmousemove = function(event){ 
		if(socket){
			//console.log(event, event.clientX, event.clientY);
			var x =  event.clientX - oldClientX;
			var y =  event.clientY - oldClientY;
			var angle = Math.atan2(y,x) / Math.PI * 180;
			//console.log(angle);

			socket.emit(EVENT_HAPPENED,{inputId:'mouseAngle',state:angle});
			oldClientX = event.clientX;
			oldClientY = event.clientY; 
		}
	}

	document.oncontextmenu = function(event){
		event.preventDefault();
	}

	primaryButton.onclick = function(){
		socket.emit(EVENT_HAPPENED,{inputId:'colorSelected',state:'#008cba'});
	}


	infoButton.onclick = function(){
		socket.emit(EVENT_HAPPENED,{inputId:'colorSelected',state:'#5bc0de'});
	}

	warningButton.onclick = function(){
		socket.emit(EVENT_HAPPENED,{inputId:'colorSelected',state:'#E99002'});
	}

	dangerButton.onclick = function(){
		socket.emit(EVENT_HAPPENED,{inputId:'colorSelected',state:'#F04124'});
	}

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
configure()