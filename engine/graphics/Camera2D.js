import Actor from "engine/core/Actor";
import Transform2D from "engine/components/Transform2D";

export default class Camera2D extends Actor {
	constructor(width, height) {
		super();
		this.width = width;
		this.height = height;
		this.addComponent(new Transform2D()); //think about using a height variable or somthing? :/ Hmm idk. 
		this.getComponent("transform").scale = [width, height] //might want to make variables to like set zoom and stuff idk. 
	}
}