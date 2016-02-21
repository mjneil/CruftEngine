
//engine
import {cache, initialize} from "engine/engine";


import Transform2D from "engine/components/Transform2D";
import Sprite from "engine/components/Sprite";
import Lifetime from "engine/components/Lifetime";

//logics / controllers
import GameLogic from "../shared/GameLogic"
import PlayerLogic from "../shared/PlayerLogic";
import ZombieLogic from "../shared/ZombieLogic";
import PlayerController from "./PlayerController";

//misc
import {PEERJS_API_KEY} from "../shared/constants";
import Physics from "./Physics";


initialize({ 
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
			"assets/entities/client/zombie.json" : "Zombie"  
		},
		components : {
			"Transform2D" : Transform2D,
			"PlayerLogic" : PlayerLogic,
			"PlayerController" : PlayerController,
			"GameLogic" : GameLogic,
			"Sprite" : Sprite,
			"Physics" : Physics,
			"Lifetime" : Lifetime,
			"ZombieLogic" : ZombieLogic
		}
	}
})
