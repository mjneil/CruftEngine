"use strict";
var $__engine_47_core_47_Component__,
    $__engine_47_lib_47_gl_45_matrix__,
    $__engine_47_core_47_Actor__,
    $__engine_47_processes_47_Interval__,
    $__engine_47_math_47_random__;
var Component = ($__engine_47_core_47_Component__ = require("engine/core/Component"), $__engine_47_core_47_Component__ && $__engine_47_core_47_Component__.__esModule && $__engine_47_core_47_Component__ || {default: $__engine_47_core_47_Component__}).default;
var vec2 = ($__engine_47_lib_47_gl_45_matrix__ = require("engine/lib/gl-matrix"), $__engine_47_lib_47_gl_45_matrix__ && $__engine_47_lib_47_gl_45_matrix__.__esModule && $__engine_47_lib_47_gl_45_matrix__ || {default: $__engine_47_lib_47_gl_45_matrix__}).vec2;
var Actor = ($__engine_47_core_47_Actor__ = require("engine/core/Actor"), $__engine_47_core_47_Actor__ && $__engine_47_core_47_Actor__.__esModule && $__engine_47_core_47_Actor__ || {default: $__engine_47_core_47_Actor__}).default;
var Interval = ($__engine_47_processes_47_Interval__ = require("engine/processes/Interval"), $__engine_47_processes_47_Interval__ && $__engine_47_processes_47_Interval__.__esModule && $__engine_47_processes_47_Interval__ || {default: $__engine_47_processes_47_Interval__}).default;
var randomRange = ($__engine_47_math_47_random__ = require("engine/math/random"), $__engine_47_math_47_random__ && $__engine_47_math_47_random__.__esModule && $__engine_47_math_47_random__ || {default: $__engine_47_math_47_random__}).randomRange;
var PlayerLogic = function($__super) {
  function PlayerLogic() {
    var $__8;
    $traceurRuntime.superConstructor(PlayerLogic).call(this, "PlayerLogic");
    this.movingLeft = false;
    this.movingRight = false;
    this.movingUp = false;
    this.movingDown = false;
    this.target = [1, 0];
    this.speed = .7;
    this.fire = false;
    this.processes = new Interval(($__8 = this, function(now, deltaMs) {
      var world = $__8.target;
      for (var i = 0; i < 10; i++) {
        var actor = engine.factory.create(Actor, "Particle", {
          Transform2D: {position: world},
          Physics: {velocity: [randomRange(-.5, .5), randomRange(-.5, .5)]}
        });
        engine.scene.addChild(actor);
      }
    }), 500);
    engine.scheduler.addChild(this.processes);
  }
  return ($traceurRuntime.createClass)(PlayerLogic, {
    destructor: function() {
      $traceurRuntime.superGet(this, PlayerLogic.prototype, "destructor").call(this);
      this.processes.succeed();
    },
    update: function(deltaMs) {
      var actor = this.actor;
      var transform = actor.getComponent("transform");
      var position = transform.position;
      var speed = this.speed;
      if (this.movingLeft) {
        position[0] -= speed * deltaMs;
      }
      if (this.movingRight) {
        position[0] += speed * deltaMs;
      }
      if (this.movingUp) {
        position[1] += speed * deltaMs;
      }
      if (this.movingDown) {
        position[1] -= speed * deltaMs;
      }
      transform.position = position;
      var world = this.actor.getComponent("transform").getWorldPosition();
      var dif = vec2.create();
      vec2.sub(dif, this.target, position);
      transform.setDirection(dif);
      if (this.fire) {
        this.fire = false;
      }
    },
    handleEvents: function(events) {
      if (events["SET_MOVING_UP"] !== undefined)
        this.movingUp = events["SET_MOVING_UP"];
      if (events["SET_MOVING_DOWN"] !== undefined)
        this.movingDown = events["SET_MOVING_DOWN"];
      if (events["SET_MOVING_LEFT"] !== undefined)
        this.movingLeft = events["SET_MOVING_LEFT"];
      if (events["SET_MOVING_RIGHT"] !== undefined)
        this.movingRight = events["SET_MOVING_RIGHT"];
      if (events["FIRE"])
        this.fire = true;
    },
    handleMouse: function(mouse) {
      this.target = mouse;
    }
  }, {}, $__super);
}(Component);
var $__default = PlayerLogic;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
