import Loader from "../Loader";
import *  as http from "../http";
import Geometry from "../../graphics/Geometry";

export default class ObjLoader extends Loader {
	
	constructor(){
		super();
	}

	load(url, options) {
		return http.get(url).then((e) =>{
			return this.parseObjText( e.target.responseText, options) ; //for now dont load mtl files. 
		}, (err) => {
			return err
		})
	}

	parseObjText(text, options) {
		options = options || {};
		var lines = text.split("\n");
		var vertices = [],
			normals = [],
			texCoords = [],
			groups = {},
			faces = [];
		var name = null, material = null;

		var pf = parseFloat;
		var pi = parseInt;
		for(var i = 0; i < lines.length;i++){
			var line = lines[i];
			var tokens = line.match(/\S+/g);
			if(!tokens) continue;
			var t0 = tokens[0];
			switch(t0) {
				case 'v':
					vertices.push( pf(tokens[1]), pf(tokens[2]), pf(tokens[3]) );
				break
				case 'vt':
					texCoords.push( pf(tokens[1]), pf(tokens[2]), pf(tokens[3]) );
				break
				case 'vn':
					normals.push( pf(tokens[1]), pf(tokens[2]), pf(tokens[3]) );
				break
				case 'f':
					for(var n = 1; n < 4;n++) {
						var vals = tokens[n].split("/");
						for(var j = 0;j < vals.length;j++){
							var val = vals[j];
							if(val.length){
								var num = pi(val);
								vals[j] = (num >= 0)? num - 1 : vertices.length/3 + num;
							}else{
								vals[j] = null;
							}
						}
						faces.push(vals);

					}
				case 'g':
				if(name !== null) {
					groups[name] = { material , faces  } ;
					faces = [];
				}
				name = tokens[1];
				break
				case 'usemtl':
					material = tokens[1];
				break
				case '#':
				break
				default:
					console.warn("ObjLoader failed to parse line!");
				break;
			}
		}

		groups[name] = { material , faces  };

		var geometry = Geometry.create({vertices, normals, texCoords, groups });

		if(options.calculateVertexNormals) geometry.calculateVertexNormals();

		return geometry;

	}



}