import { createHash } from 'crypto';
import { initPack, removePack } from './../db';

const Entity = (param) => {
	var self = {
		x:(250*Math.random())+20,
		y:(250*Math.random())+70,
		spdX:0,
		spdY:0,
		id:"",
	}
	var t = new Date().getTime().toString(); 
	self.id = createHash('md5').update(t).digest("hex");
	
	if(param){
		if(param.x)	self.x = param.x;
		if(param.y)	self.y = param.y;
		if(param.id)	self.id = param.id;		
	}
	
	self.update = function(){
		self.updatePosition();
	}
	self.updatePosition = function(){
		self.x += self.spdX;
		self.y += self.spdY;
	}
	self.getDistance = function(pt){
		return Math.sqrt(Math.pow(self.x-pt.x,2) + Math.pow(self.y-pt.y,2));
	}
	return self;
}

Entity.getFrameUpdateData = (Player, Bullet) => {
	var pack = {
		initPack:{
			player:initPack.player,
			bullet:initPack.bullet,
		},
		removePack:{
			player:removePack.player,
			bullet:removePack.bullet,
		},
		updatePack:{
			player: Player.update(),
			bullet: Bullet.update(),
		}
	};
	initPack.player = [];
	initPack.bullet = [];
	removePack.player = [];
	removePack.bullet = [];
	return pack;
}


export default Entity;