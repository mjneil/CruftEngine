import Geometry from "../Geometry";
import Face from "../Face"
import vec3 from "../../math/vec3"

export default class CubeGeometry extends Geometry {
	constructor(x, y, z) {
		super();

		let xScale = .5 * x;
		let yScale = .5 * y;
		let zScale = .5 * z;

		this.vertices.push(
			new vec3(-xScale, -yScale,  zScale),
			new vec3( xScale, -yScale,  zScale),
			new vec3( xScale,  yScale,  zScale),
			new vec3(-xScale,  yScale,  zScale),
			new vec3(-xScale, -yScale, -zScale),
			new vec3( xScale, -yScale, -zScale),
			new vec3( xScale,  yScale, -zScale),
			new vec3(-xScale,  yScale, -zScale)
		);

		this.faces.push(
			new Face(0, 1, 2),
			new Face(2, 3, 0),
			new Face(1, 5, 6),
			new Face(6, 2, 1),
			new Face(7, 6, 5),
			new Face(5, 4, 7),
			new Face(4, 0, 3),
			new Face(3, 7, 4),
			new Face(4, 5, 1),
			new Face(1, 0, 4),
			new Face(3, 2, 6),
			new Face(6, 7, 3)
		)
	}
}
