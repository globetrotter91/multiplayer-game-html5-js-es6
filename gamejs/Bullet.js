import globals from './globals'; 
import { ctx, Img } from './declarations'; 
 
/**
 * @ES6 class
 * @name Bullet
 * @description creates a bullet whenever the player presses the mouse.
 * draw function used for rendering, 
 * fire function used for adding to bullet list
 */
export default class Bullet {
    constructor({ id, x, y }) {
        this.id = id;                       // id of the bullet 
                                            // -- helps in keeping track of the bullets and removing when out of bound of hit player
        this.x = x;                         //x in the (x,y) coords of 2d -- helps in moving the bullet on canvas 
		this.y = y;							//y in the (x,y) coords of 2d -- helps in moving the bullet on canvas
        this.image = Img.bullet;            //image if the player 
        this.width = Img.bullet.width;      //width of bullet image
        this.height = Img.bullet.height;    //height of bullet image
    }
    
    // the draw function is responsible for rendering the image of the bullet on the canvas.
    draw() {
        ctx.drawImage(this.image,0,0,this.width,this.height,
			this.x-this.width/4,this.y-this.height/4,this.width/2,this.height/2);
    }
    // this method is used to add the created bullets to the global bullet list.
    fire() {
        globals.bulletList[this.id] = this;
    }
}
