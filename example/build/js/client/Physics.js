"use strict";
var $__engine_47_core_47_Component__,
    $__engine_47_lib_47_gl_45_matrix__;
var Component = ($__engine_47_core_47_Component__ = require("engine/core/Component"), $__engine_47_core_47_Component__ && $__engine_47_core_47_Component__.__esModule && $__engine_47_core_47_Component__ || {default: $__engine_47_core_47_Component__}).default;
var vec2 = ($__engine_47_lib_47_gl_45_matrix__ = require("engine/lib/gl-matrix"), $__engine_47_lib_47_gl_45_matrix__ && $__engine_47_lib_47_gl_45_matrix__.__esModule && $__engine_47_lib_47_gl_45_matrix__ || {default: $__engine_47_lib_47_gl_45_matrix__}).vec2;
var Physics = function($__super) {
  function Physics() {
    $traceurRuntime.superConstructor(Physics).call(this, "Physics");
    this.velocity = [0, 0];
  }
  return ($traceurRuntime.createClass)(Physics, {
    update: function(deltaMs) {
      var transform = this.actor.getComponent("transform");
      var position = transform.position;
      var tmp = vec2.create();
      vec2.add(position, position, vec2.scale(tmp, this.velocity, deltaMs));
      transform.position = position;
    },
    setFromJSON: function(json) {
      if (!json)
        return;
      this.velocity = json.velocity;
    }
  }, {}, $__super);
}(Component);
var $__default = Physics;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
