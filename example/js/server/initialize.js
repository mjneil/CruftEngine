//engine
import Initialize from "engine/Initialize";
import Transform2D from "engine/components/Transform2D";
import Synchronizer from "engine/components/Synchronizer";

//example
import {PEERJS_API_KEY} from "../constants";
import PlayerLogic from "./PlayerLogic";


export default () =>{
	Initialize({ 
		network : { 
			name : "game", 
			key : PEERJS_API_KEY 
		},
		scene : {
			id : 1,
			type : "Scene"
		},
		scheduler : {
			deltaMs : 33
		},
		factory : {
			skeletons : {
				"assets/entities/server/player.json" : "Player"  ,
				"assets/entities/server/scene.json" : "Scene"  ,
			},
			components : {
				"Transform2D" : Transform2D,
				"Synchronizer" : Synchronizer,
				"PlayerLogic" : PlayerLogic
				
			}
		}
	});
}
