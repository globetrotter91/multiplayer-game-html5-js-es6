import { WIDTH, HEIGHT, ctx, Img } from './declarations';
import globals from './globals'; 

export const Player = function(initPack){
	var self = {};
	self.id = initPack.id;
	self.x = initPack.x;
	self.y = initPack.y;
	self.hp = initPack.hp;
	self.hpMax = initPack.hpMax;
	self.score = initPack.score;
	self.directionMod = initPack.directionMod;
	self.spriteAnimCounter = initPack.spriteAnimCounter;
	self.lives = initPack.lives; 
	self.color = initPack.color; 
	
	self.draw = function(){	
		if(!self.color || self.color === '#ffffff')	return 
		var x = self.x; //- Player.list[selfId].x + WIDTH/2;
		var y = self.y; //- Player.list[selfId].y + HEIGHT/2;

		if(self.x<=20)	x = 20;
		if(self.x>=WIDTH-20)	x = WIDTH-20;
		if(self.y<=100)	y = 100;
		if(self.y>=HEIGHT-70)	y = HEIGHT-70;
		
		
		var hpWidth = 30 * self.hp / self.hpMax;
		ctx.fillStyle = self.color;
		ctx.fillRect(x - hpWidth/2,y - 60,hpWidth,4);
		
		var width = Img.player.width;
		var height = Img.player.height;
		
		var frameWidth = Img.player.width/3;
		var frameHeight = Img.player.height/4+1;
		
		var walkingMod = Math.floor(self.spriteAnimCounter) % 3;//1,2

		ctx.drawImage(Img.player,
			walkingMod*frameWidth, self.directionMod*frameHeight,frameWidth,frameHeight,
			x-width/2,y-height/2,width,height);
		
	}
	
	Player.list[self.id] = self;
	
	
	return self;
}
Player.list = {};



export const Bullet = function(initPack){
	var self = {};
	self.id = initPack.id;
	self.x = initPack.x;
	self.y = initPack.y;
	//self.map = initPack.map;
	
	self.draw = function(){
		var selfId = globals.selfId;
		if(Player.list[selfId].map !== self.map)
			return;
		var width = Img.bullet.width/2;
		var height = Img.bullet.height/2;
		
		var x = self.x ;//- Player.list[selfId].x + WIDTH/2;
		var y = self.y ;//- Player.list[selfId].y + HEIGHT/2;
		
		ctx.drawImage(Img.bullet,
			0,0,Img.bullet.width,Img.bullet.height,
			x-width/2,y-height/2,width,height);
	}
	
	Bullet.list[self.id] = self;		
	return self;
}
Bullet.list = {};



