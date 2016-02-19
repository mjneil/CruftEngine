//engine
import Initialize from "engine/Initialize";
import Transform2D from "engine/components/Transform2D";
import PlayerLogic from "../server/PlayerLogic";
import PlayerController from "./PlayerController";
import GameLogic from "../server/GameLogic"
import Sprite from "engine/components/Sprite";
import Physics from "./Physics";
import Lifetime from "engine/components/Lifetime";
//example
import {PEERJS_API_KEY} from "../constants";
//maybe include some of this stuff within the Map File?
//No reason map file can't be valid javacript
//could just have like a //map.get.init() or somthing 
export default () =>{
	Initialize({ 
		scene : {
			id : 1,
			type : "Scene"
		},
		scheduler : {
			deltaMs : 17
		},
		factory : {
			skeletons : {
				"assets/entities/client/player.json" : "Player"  ,
				"assets/entities/client/scene.json" : "Scene"  ,
				"assets/entities/client/particle.json" : "Particle"  ,
				"assets/entities/client/boulder.json" : "Boulder"  ,
			},
			components : {
				"Transform2D" : Transform2D,
				"PlayerLogic" : PlayerLogic,
				"PlayerController" : PlayerController,
				"GameLogic" : GameLogic,
				"Sprite" : Sprite,
				"Physics" : Physics,
				"Lifetime" : Lifetime
			}
		}
	});
}