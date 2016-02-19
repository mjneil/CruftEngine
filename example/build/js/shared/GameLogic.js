"use strict";
var $__engine_47_core_47_Component__,
    $__engine_47_Engine__;
var Component = ($__engine_47_core_47_Component__ = require("engine/core/Component"), $__engine_47_core_47_Component__ && $__engine_47_core_47_Component__.__esModule && $__engine_47_core_47_Component__ || {default: $__engine_47_core_47_Component__}).default;
var engine = ($__engine_47_Engine__ = require("engine/Engine"), $__engine_47_Engine__ && $__engine_47_Engine__.__esModule && $__engine_47_Engine__ || {default: $__engine_47_Engine__}).default;
var GameLogic = function($__super) {
  function GameLogic() {
    var $__5,
        $__6;
    $traceurRuntime.superConstructor(GameLogic).call(this, "GameLogic");
    this.player = null;
    engine.on("PlayerController:events", ($__5 = this, function(events) {
      if ($__5.player) {
        $__5.player.getComponent("PlayerLogic").handleEvents(events);
      }
    }));
    engine.on("PlayerController:mouse", ($__6 = this, function(events) {
      if ($__6.player) {
        $__6.player.getComponent("PlayerLogic").handleMouse(events);
      }
    }));
  }
  return ($traceurRuntime.createClass)(GameLogic, {}, {}, $__super);
}(Component);
var $__default = GameLogic;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
