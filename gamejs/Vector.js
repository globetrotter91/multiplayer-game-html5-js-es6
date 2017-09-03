/**
 * @ES6 class
 * @name Vector
 * @description any entity with (x,y) coordinates is a child of this class
 */
export default class Vector {
    constructor(x, y) {
        this.x = x;     //x in the (x,y) coords of 2d -- helps in moving the entity on canvas 
		this.y = y;		//y in the (x,y) coords of 2d -- helps in moving the entity on canvas
    }
}