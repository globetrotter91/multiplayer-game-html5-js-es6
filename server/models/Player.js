import Entity from './Entity';
import Bullet from './Bullet'; 
import { INITIALIZE, EVENT_HAPPENED, COLOR_SELECTED, GAME_LOST } from './../constants';
import { initPack, removePack, setUserColor, SOCKET_LIST } from './../db';


const Player = function(param){
	var self = Entity(param);
	self.username = param.username;
	self.pressingRight = false;
	self.pressingLeft = false;
	self.pressingUp = false;
	self.pressingDown = false;
	self.pressingAttack = false;
	self.mouseAngle = 0;
	self.maxSpd = 5;
	self.hp = 10;
	self.hpMax = 10;
	self.score = parseInt(param.score) || 0;
	self.lives = parseInt(param.lives) || 5;
	self.directionMod = 2;
	self.spriteAnimCounter = 0;
	self.color = param.color || '#ffffff';
	
	var super_update = self.update;
	self.update = function(){
		self.updateSpd();
		super_update();
		
		if(self.pressingAttack){
			self.shootBullet(self.mouseAngle);
		}
	}
	self.shootBullet = function(angle){
		Bullet({
			parent:self.id,
			angle:angle,
			x:self.x,
			y:self.y
		});
	}

	self.gameLost = () => {
		//console.log(self.username, 'lost');
		var socket = SOCKET_LIST[self.id];
		socket.emit(GAME_LOST, {score: self.score});
		delete Player.list[socket.id];
		removePack.player.push(socket.id);
	}
	
	self.updateSpd = function(){
		var aimAngle = (self.mouseAngle<0)?360 + self.mouseAngle:self.mouseAngle;		
		//console.log('aim angle', aimAngle);
		if(aimAngle >= 45 && aimAngle < 135){//down
			self.directionMod = 2;
		}			
		else if(aimAngle >= 135 && aimAngle < 225){	//left
			self.directionMod = 1;
		}
		else if(aimAngle >= 225 && aimAngle < 315){	//up
			self.directionMod = 0;
		}
		else if(aimAngle >=315 && aimAngle < 45){
			self.directionMod = 3;
		}

		if(self.pressingRight){
			self.spdX = self.maxSpd;
			self.directionMod = 3;
			self.spriteAnimCounter+=1;
		}			
		else if(self.pressingLeft){
			self.spdX = -self.maxSpd;
			self.directionMod = 1;
			self.spriteAnimCounter+=1;
		}
		else{
			self.spdX = 0;
			//self.spriteAnimCounter=0;
		}
		
		if(self.pressingUp){
			self.spdY = -self.maxSpd;
			self.directionMod = 0;
			self.spriteAnimCounter+=1;
		}
		else if(self.pressingDown){
			self.spdY = self.maxSpd;
			self.directionMod = 2;
			self.spriteAnimCounter+=1;
		}
		else{
			self.spdY = 0;		
			//self.spriteAnimCounter=0;
		}
		//console.log(self);
	}
	
	self.getInitPack = function(){
		return {
			id:self.id,
			x:self.x,
			y:self.y,	
			number:self.number,	
			hp:self.hp,
			hpMax:self.hpMax,
			score:self.score,
			directionMod:self.directionMod, 
			spriteAnimCounter: self.spriteAnimCounter, 
			lives: self.lives, 
			color: self.color
		};		
	}
	self.getUpdatePack = function(){
		return {
			id:self.id,
			x: self.x+self.spdX,
			y: self.y+self.spdY,
			hp:self.hp,
			score:self.score,
			directionMod:self.directionMod, 
			spriteAnimCounter: self.spriteAnimCounter, 
			lives: self.lives, 
			color: self.color
		}	
	}
	
	Player.list[self.id] = self;
	
	initPack.player.push(self.getInitPack());
	return self;
}
Player.list = {};
Player.onConnect = (socket , username, lives, score, color) => {
    
	var player = Player({
		username:username,
		id:socket.id,
		socket:socket,
		lives: lives, 
		score: score, 
		color: color
	});
	/*
	setTimeout(()=>{
		console.log('firing disconnect');
		player.gameLost();
	},10000);
	*/

    socket.on(EVENT_HAPPENED, (data) => {
		if(data.inputId === 'left')
			player.pressingLeft = data.state;
		else if(data.inputId === 'right')
			player.pressingRight = data.state;
		else if(data.inputId === 'up')
			player.pressingUp = data.state;
		else if(data.inputId === 'down')
			player.pressingDown = data.state;
		else if(data.inputId === 'attack')
			player.pressingAttack = data.state;
		else if(data.inputId === 'mouseAngle')
			player.mouseAngle = data.state;
		else if(data.inputId === 'colorSelected'){
			player.color = data.state;
			setUserColor(player.username, player.color, (res) => {
				socket.emit(COLOR_SELECTED, res);
			})
		}

	});
		
	socket.emit(INITIALIZE,{
		selfId:socket.id,
		player:Player.getAllInitPack(),
		bullet:Bullet.getAllInitPack(),
	})
}

Player.getAllInitPack = () => {
	var players = [];
	for(var i in Player.list)
		players.push(Player.list[i].getInitPack());
	return players;
}

Player.onDisconnect = (socket) => {
	delete Player.list[socket.id];
	removePack.player.push(socket.id);
}

Player.update = () => {
	var pack = [];
	for(var i in Player.list){
		var player = Player.list[i];
		player.update();
		pack.push(player.getUpdatePack());		
	}
	return pack;	
}

export default Player; 
