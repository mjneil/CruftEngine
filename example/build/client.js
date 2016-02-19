"use strict";
var $__js_47_client_47_initialize__,
    $__engine_47_Engine__,
    $__engine_47_graphics_47_Camera2D__,
    $__engine_47_core_47_Actor__,
    $__engine_47_processes_47_Script__;
var initialize = ($__js_47_client_47_initialize__ = require("./js/client/initialize"), $__js_47_client_47_initialize__ && $__js_47_client_47_initialize__.__esModule && $__js_47_client_47_initialize__ || {default: $__js_47_client_47_initialize__}).default;
var engine = ($__engine_47_Engine__ = require("engine/Engine"), $__engine_47_Engine__ && $__engine_47_Engine__.__esModule && $__engine_47_Engine__ || {default: $__engine_47_Engine__}).default;
var Camera2D = ($__engine_47_graphics_47_Camera2D__ = require("engine/graphics/Camera2D"), $__engine_47_graphics_47_Camera2D__ && $__engine_47_graphics_47_Camera2D__.__esModule && $__engine_47_graphics_47_Camera2D__ || {default: $__engine_47_graphics_47_Camera2D__}).default;
var Actor = ($__engine_47_core_47_Actor__ = require("engine/core/Actor"), $__engine_47_core_47_Actor__ && $__engine_47_core_47_Actor__.__esModule && $__engine_47_core_47_Actor__ || {default: $__engine_47_core_47_Actor__}).default;
var Script = ($__engine_47_processes_47_Script__ = require("engine/processes/Script"), $__engine_47_processes_47_Script__ && $__engine_47_processes_47_Script__.__esModule && $__engine_47_processes_47_Script__ || {default: $__engine_47_processes_47_Script__}).default;
initialize();
var main = function() {
  engine.camera = new Camera2D(window.innerWidth, window.innerHeight);
  var player = engine.factory.create(Actor, "Player");
  engine.scene.addChild(player);
  engine.scene.addChild(engine.camera);
  engine.scene.getComponent("GameLogic").player = player;
  engine.scheduler.addChild(new Script(function() {
    engine.camera.render();
  }));
};
engine.running.then(main);
window.engine = engine;
window.kill = function() {
  engine.scheduler.kill();
};
window.onbeforeonload = function() {
  engine.network.peer.destroy();
};
engine.cache.get("assets/world01.json").then(function(world) {
  var $__9 = true;
  var $__10 = false;
  var $__11 = undefined;
  try {
    for (var $__7 = void 0,
        $__6 = (world)[Symbol.iterator](); !($__9 = ($__7 = $__6.next()).done); $__9 = true) {
      var actor = $__7.value;
      {
        var boulder = engine.factory.create(Actor, "Boulder", actor);
        engine.scene.addChild(boulder);
      }
    }
  } catch ($__12) {
    $__10 = true;
    $__11 = $__12;
  } finally {
    try {
      if (!$__9 && $__6.return != null) {
        $__6.return();
      }
    } finally {
      if ($__10) {
        throw $__11;
      }
    }
  }
});
