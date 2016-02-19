//basic flesh out of vector class
//please please lets unit test / manually test these work
//I always forget that bugs could be in da math. 


export default class vec2 {
	constructor(x, y) { //no default values cause these needs to be fast. 
		this.x = x;
		this.y = y;
	}

	static zero() { //static constructor for making empty vectors. 
		return new vec2(0, 0);
	}

	static add(a, b) { //adds new vecs and stores them in a new vector.
		return new vec2(a.x + b.x, a.y + b.y);
	}

	add(b) { //modifies self so like a.add(b) changes the vector a. (mem effecient)
		this.x += b.x;
		this.y += b.y;
		return this;
	}

	
	/* all static methods return new vectors without modifying whats past in 
	static add 
	static sub
	static scale (a, s) (by a scalar)
	static dot
	static cross
	static length
	static normalize

	//all member funcs modify self but nothing pas in. and also chaniable. 
	add
	sub
	scale
	dot
	scale
	length
	normalize

	//example of static
	var a = new vec2(10, 10);
	var b = new vec2(10, 20);
	var c = vec2.add(a, b); //c = (20, 30)


	//example of non-static
	var a = new vec2(10, 20);
	var b = new vec2(30, 20);
		a.add(b).add(b) //a = (70, 60) b is not modified. 

	*/


}
