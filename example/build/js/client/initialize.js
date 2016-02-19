"use strict";
var $__engine_47_Initialize__,
    $__engine_47_components_47_Transform2D__,
    $___46__46__47_shared_47_PlayerLogic__,
    $__PlayerController__,
    $___46__46__47_shared_47_GameLogic__,
    $__engine_47_components_47_Sprite__,
    $__Physics__,
    $__engine_47_components_47_Lifetime__,
    $___46__46__47_shared_47_constants__;
var Initialize = ($__engine_47_Initialize__ = require("engine/Initialize"), $__engine_47_Initialize__ && $__engine_47_Initialize__.__esModule && $__engine_47_Initialize__ || {default: $__engine_47_Initialize__}).default;
var Transform2D = ($__engine_47_components_47_Transform2D__ = require("engine/components/Transform2D"), $__engine_47_components_47_Transform2D__ && $__engine_47_components_47_Transform2D__.__esModule && $__engine_47_components_47_Transform2D__ || {default: $__engine_47_components_47_Transform2D__}).default;
var PlayerLogic = ($___46__46__47_shared_47_PlayerLogic__ = require("../shared/PlayerLogic"), $___46__46__47_shared_47_PlayerLogic__ && $___46__46__47_shared_47_PlayerLogic__.__esModule && $___46__46__47_shared_47_PlayerLogic__ || {default: $___46__46__47_shared_47_PlayerLogic__}).default;
var PlayerController = ($__PlayerController__ = require("./PlayerController"), $__PlayerController__ && $__PlayerController__.__esModule && $__PlayerController__ || {default: $__PlayerController__}).default;
var GameLogic = ($___46__46__47_shared_47_GameLogic__ = require("../shared/GameLogic"), $___46__46__47_shared_47_GameLogic__ && $___46__46__47_shared_47_GameLogic__.__esModule && $___46__46__47_shared_47_GameLogic__ || {default: $___46__46__47_shared_47_GameLogic__}).default;
var Sprite = ($__engine_47_components_47_Sprite__ = require("engine/components/Sprite"), $__engine_47_components_47_Sprite__ && $__engine_47_components_47_Sprite__.__esModule && $__engine_47_components_47_Sprite__ || {default: $__engine_47_components_47_Sprite__}).default;
var Physics = ($__Physics__ = require("./Physics"), $__Physics__ && $__Physics__.__esModule && $__Physics__ || {default: $__Physics__}).default;
var Lifetime = ($__engine_47_components_47_Lifetime__ = require("engine/components/Lifetime"), $__engine_47_components_47_Lifetime__ && $__engine_47_components_47_Lifetime__.__esModule && $__engine_47_components_47_Lifetime__ || {default: $__engine_47_components_47_Lifetime__}).default;
var PEERJS_API_KEY = ($___46__46__47_shared_47_constants__ = require("../shared/constants"), $___46__46__47_shared_47_constants__ && $___46__46__47_shared_47_constants__.__esModule && $___46__46__47_shared_47_constants__ || {default: $___46__46__47_shared_47_constants__}).PEERJS_API_KEY;
var $__default = function() {
  Initialize({
    scene: {
      id: 1,
      type: "Scene"
    },
    scheduler: {deltaMs: 17},
    factory: {
      skeletons: {
        "assets/entities/client/player.json": "Player",
        "assets/entities/client/scene.json": "Scene",
        "assets/entities/client/particle.json": "Particle",
        "assets/entities/client/boulder.json": "Boulder"
      },
      components: {
        "Transform2D": Transform2D,
        "PlayerLogic": PlayerLogic,
        "PlayerController": PlayerController,
        "GameLogic": GameLogic,
        "Sprite": Sprite,
        "Physics": Physics,
        "Lifetime": Lifetime
      }
    }
  });
};
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
