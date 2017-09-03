import { WIDTH, HEIGHT, ctx, Img } from './declarations'; 
import globals from './globals'; 
import Vector from './Vector'; 

/**
 * @ES6 class
 * @name Player
 * @description creates a player whenever a new player joins in.
 * draw function used for rendering, 
 * update function used for updating coords and score
 */
export default class Player extends Vector {
	//using ES6 desctruct to get properties of the player
	constructor({ id, x, y, hp, hpMax, score, directionMod, spriteAnimCounter, lives, color }) {
		super(x,y);										//Every player is a Vector with (x,y)
		this.id = id; 									//id of the player -- helps in keeping track of the players
		this.hpMax = hpMax;								//maximum health of the player in a life
		this.hp = hp;									//remaining health of the player in a life
		this.score = score;								//no of players killed by the player also ref as killings
		this.directionMod = directionMod;				//1,2,3,4 depending on the mouse angle and key pressed 
														//-- helps in displaying the correct part of player sprite image
		this.spriteAnimCounter = spriteAnimCounter;		//kinda the speed of the avatar, can be 0,1,2 
														//-- helps in displaying the correct part of player sprite image
		this.lives = lives; 							//remaining lives of the player
        this.color = color; 							//color of the hp bar 
        this.image = Img.player;						//image if the player 
        this.width = Img.player.width;					//width of the player image
        this.height = Img.player.height;				//height of the player image
	}
	
	// the draw function is responsible for rendering the image of the player on the canvas.
	draw(){	
		if(!this.color || this.color === '#ffffff')	return; 
		var x = this.x; 
		var y = this.y; 

		if(this.x<=20)	x = 20;
		if(this.x>=WIDTH-20)	x = WIDTH-20;
		if(this.y<=100)	y = 100;
		if(this.y>=HEIGHT-70)	y = HEIGHT-70;
		
		var hpWidth = 30 * this.hp / this.hpMax;
		ctx.fillStyle = this.color;
		ctx.fillRect(x - hpWidth/2,y - 60,hpWidth,4);
		
		var frameWidth = this.width/3;
		var frameHeight = this.height/4+1;
		
		var walkingMod = Math.floor(this.spriteAnimCounter) % 3;//1,2

		ctx.drawImage(this.image, walkingMod*frameWidth, this.directionMod*frameHeight,
			frameWidth,frameHeight,
			x-this.width/2,y-this.height/2,this.width,this.height);
		
	}

	// when a player is connected with the server this function is called to 
	// add the player to the global player list.
	appear() {
		globals.playerList[this.id] = this;
	}
	
	// the function update is called whenever there is a update event from the server
	// this function sets the properties of the player as the pack received from the server.
	update(pack) {
		//console.log(this); 
		if(pack.x !== undefined)					this.x = pack.x;
		if(pack.y !== undefined)					this.y = pack.y;
		if(pack.hp !== undefined)					this.hp = pack.hp;
		if(pack.score !== undefined)				this.score = pack.score;
		if(pack.lives !== undefined)				this.lives = pack.lives;
		if(pack.mouseAngle !== undefined)			this.mouseAngle = pack.mouseAngle;
		if(pack.directionMod !== undefined)			this.directionMod = pack.directionMod;
		if(pack.spriteAnimCounter !== undefined)	this.spriteAnimCounter = pack.spriteAnimCounter;
		if(pack.color !== undefined)				this.color = pack.color;
	}
}
