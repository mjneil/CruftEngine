"use strict";
var $__js_47_server_47_initialize__,
    $__engine_47_Engine__;
var initialize = ($__js_47_server_47_initialize__ = require("./js/server/initialize"), $__js_47_server_47_initialize__ && $__js_47_server_47_initialize__.__esModule && $__js_47_server_47_initialize__ || {default: $__js_47_server_47_initialize__}).default;
var engine = ($__engine_47_Engine__ = require("engine/Engine"), $__engine_47_Engine__ && $__engine_47_Engine__.__esModule && $__engine_47_Engine__ || {default: $__engine_47_Engine__}).default;
initialize();
var main = function() {
  console.info("Cruft Running");
};
engine.running.then(main);
window.engine = engine;
window.kill = function() {
  engine.scheduler.kill();
};
window.onbeforeonload = function() {
  engine.network.peer.destroy();
};
