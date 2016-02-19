"use strict";
var $__engine_47_Initialize__,
    $__engine_47_components_47_Transform2D__,
    $__engine_47_components_47_Synchronizer__,
    $___46__46__47_shared_47_constants__,
    $___46__46__47_shared_47_PlayerLogic__;
var Initialize = ($__engine_47_Initialize__ = require("engine/Initialize"), $__engine_47_Initialize__ && $__engine_47_Initialize__.__esModule && $__engine_47_Initialize__ || {default: $__engine_47_Initialize__}).default;
var Transform2D = ($__engine_47_components_47_Transform2D__ = require("engine/components/Transform2D"), $__engine_47_components_47_Transform2D__ && $__engine_47_components_47_Transform2D__.__esModule && $__engine_47_components_47_Transform2D__ || {default: $__engine_47_components_47_Transform2D__}).default;
var Synchronizer = ($__engine_47_components_47_Synchronizer__ = require("engine/components/Synchronizer"), $__engine_47_components_47_Synchronizer__ && $__engine_47_components_47_Synchronizer__.__esModule && $__engine_47_components_47_Synchronizer__ || {default: $__engine_47_components_47_Synchronizer__}).default;
var PEERJS_API_KEY = ($___46__46__47_shared_47_constants__ = require("../shared/constants"), $___46__46__47_shared_47_constants__ && $___46__46__47_shared_47_constants__.__esModule && $___46__46__47_shared_47_constants__ || {default: $___46__46__47_shared_47_constants__}).PEERJS_API_KEY;
var PlayerLogic = ($___46__46__47_shared_47_PlayerLogic__ = require("../shared/PlayerLogic"), $___46__46__47_shared_47_PlayerLogic__ && $___46__46__47_shared_47_PlayerLogic__.__esModule && $___46__46__47_shared_47_PlayerLogic__ || {default: $___46__46__47_shared_47_PlayerLogic__}).default;
var $__default = function() {
  Initialize({
    network: {
      name: "game",
      key: PEERJS_API_KEY
    },
    scene: {
      id: 1,
      type: "Scene"
    },
    scheduler: {deltaMs: 33},
    factory: {
      skeletons: {
        "assets/entities/server/player.json": "Player",
        "assets/entities/server/scene.json": "Scene"
      },
      components: {
        "Transform2D": Transform2D,
        "Synchronizer": Synchronizer,
        "PlayerLogic": PlayerLogic
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
