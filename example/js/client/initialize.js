//engine
import Initialize from "engine/Initialize";
import Transform2D from "engine/components/Transform2D";
import PlayerLogic from "../server/PlayerLogic";
import PlayerController from "./PlayerController";
import GameLogic from "../server/GameLogic"
import Sprite from "engine/components/Sprite";
//example
import {PEERJS_API_KEY} from "../constants";

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
			},
			components : {
				"Transform2D" : Transform2D,
				"PlayerLogic" : PlayerLogic,
				"PlayerController" : PlayerController,
				"GameLogic" : GameLogic,
				"Sprite" : Sprite
			}
		}
	});
}