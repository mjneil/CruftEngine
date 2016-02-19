"use strict";
var $__engine_47_core_47_Component__,
    $__engine_47_lib_47_gl_45_matrix__,
    $__engine_47_Engine__;
var Component = ($__engine_47_core_47_Component__ = require("engine/core/Component"), $__engine_47_core_47_Component__ && $__engine_47_core_47_Component__.__esModule && $__engine_47_core_47_Component__ || {default: $__engine_47_core_47_Component__}).default;
var vec2 = ($__engine_47_lib_47_gl_45_matrix__ = require("engine/lib/gl-matrix"), $__engine_47_lib_47_gl_45_matrix__ && $__engine_47_lib_47_gl_45_matrix__.__esModule && $__engine_47_lib_47_gl_45_matrix__ || {default: $__engine_47_lib_47_gl_45_matrix__}).vec2;
var engine = ($__engine_47_Engine__ = require("engine/Engine"), $__engine_47_Engine__ && $__engine_47_Engine__.__esModule && $__engine_47_Engine__ || {default: $__engine_47_Engine__}).default;
var PlayerController = function($__super) {
  function PlayerController(connection) {
    var $__5,
        $__6,
        $__7,
        $__8;
    $traceurRuntime.superConstructor(PlayerController).call(this, "PlayerController");
    this.keyStates = {};
    this.last = {};
    this.fire = false;
    this.mouse = [window.innerWidth / 2, window.innerHeight / 2];
    addEventListener("keydown", ($__5 = this, function(e) {
      $__5.keyStates[String.fromCharCode(e.which)] = true;
    }));
    addEventListener("keyup", ($__6 = this, function(e) {
      $__6.keyStates[String.fromCharCode(e.which)] = false;
    }));
    addEventListener("mousemove", ($__7 = this, function(e) {
      $__7.mouse[0] = e.pageX;
      $__7.mouse[1] = e.pageY;
    }));
    addEventListener("mousedown", ($__8 = this, function(e) {
      $__8.fire = true;
    }));
  }
  return ($traceurRuntime.createClass)(PlayerController, {update: function(deltaMs) {
      var events = {};
      var keyStates = this.keyStates;
      var last = this.last;
      for (var key in keyStates) {
        if (keyStates[key] !== last[key]) {
          if (key == "W") {
            events["SET_MOVING_UP"] = keyStates[key];
          }
          if (key == "A") {
            events["SET_MOVING_LEFT"] = keyStates[key];
          }
          if (key == "S") {
            events["SET_MOVING_DOWN"] = keyStates[key];
          }
          if (key == "D") {
            events["SET_MOVING_RIGHT"] = keyStates[key];
          }
        }
      }
      if (Object.keys(events).length) {
        engine.emit("PlayerController:events", events);
        this.last = JSON.parse(JSON.stringify(this.keyStates));
      }
      engine.emit("PlayerController:mouse", engine.camera.mouseToWorld(this.mouse));
      if (this.fire) {
        this.fire = false;
        engine.emit("PlayerController:events", {FIRE: true});
      }
    }}, {}, $__super);
}(Component);
var $__default = PlayerController;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
