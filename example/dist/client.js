(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./js/client/initialize":4,"engine/Engine":8,"engine/core/Actor":13,"engine/graphics/Camera2D":20,"engine/processes/Script":34}],2:[function(require,module,exports){
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

},{"engine/core/Component":16,"engine/lib/gl-matrix":27}],3:[function(require,module,exports){
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

},{"engine/Engine":8,"engine/core/Component":16,"engine/lib/gl-matrix":27}],4:[function(require,module,exports){
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

},{"../shared/GameLogic":5,"../shared/PlayerLogic":6,"../shared/constants":7,"./Physics":2,"./PlayerController":3,"engine/Initialize":9,"engine/components/Lifetime":10,"engine/components/Sprite":11,"engine/components/Transform2D":12}],5:[function(require,module,exports){
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

},{"engine/Engine":8,"engine/core/Component":16}],6:[function(require,module,exports){
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

},{"engine/core/Actor":13,"engine/core/Component":16,"engine/lib/gl-matrix":27,"engine/math/random":29,"engine/processes/Interval":33}],7:[function(require,module,exports){
"use strict";
var PEERJS_API_KEY = "vu5babwam1tnjyvi";
Object.defineProperties(module.exports, {
  PEERJS_API_KEY: {get: function() {
      return PEERJS_API_KEY;
    }},
  __esModule: {value: true}
});

},{}],8:[function(require,module,exports){
"use strict";
var $__events__;
var EventEmitter = ($__events__ = require("events"), $__events__ && $__events__.__esModule && $__events__ || {default: $__events__}).default;
var Engine = function($__super) {
  function Engine() {
    $traceurRuntime.superConstructor(Engine).call(this);
    this.cache = null;
    this.scheduler = null;
    this.factory = null;
    this.scene = null;
    this.camera = null;
    this.network = null;
    this.running = null;
  }
  return ($traceurRuntime.createClass)(Engine, {}, {}, $__super);
}(EventEmitter);
var $__default = new Engine();
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"events":36}],9:[function(require,module,exports){
"use strict";
var $__engine_47_Engine__,
    $__engine_47_core_47_Cache__,
    $__engine_47_core_47_Scheduler__,
    $__engine_47_core_47_Scene__,
    $__engine_47_net_47_Network__,
    $__engine_47_core_47_ActorFactory__,
    $__engine_47_processes_47_Script__,
    $__engine_47_core_47_Actor__;
var engine = ($__engine_47_Engine__ = require("engine/Engine"), $__engine_47_Engine__ && $__engine_47_Engine__.__esModule && $__engine_47_Engine__ || {default: $__engine_47_Engine__}).default;
var Cache = ($__engine_47_core_47_Cache__ = require("engine/core/Cache"), $__engine_47_core_47_Cache__ && $__engine_47_core_47_Cache__.__esModule && $__engine_47_core_47_Cache__ || {default: $__engine_47_core_47_Cache__}).default;
var Scheduler = ($__engine_47_core_47_Scheduler__ = require("engine/core/Scheduler"), $__engine_47_core_47_Scheduler__ && $__engine_47_core_47_Scheduler__.__esModule && $__engine_47_core_47_Scheduler__ || {default: $__engine_47_core_47_Scheduler__}).default;
var Scene = ($__engine_47_core_47_Scene__ = require("engine/core/Scene"), $__engine_47_core_47_Scene__ && $__engine_47_core_47_Scene__.__esModule && $__engine_47_core_47_Scene__ || {default: $__engine_47_core_47_Scene__}).default;
var Network = ($__engine_47_net_47_Network__ = require("engine/net/Network"), $__engine_47_net_47_Network__ && $__engine_47_net_47_Network__.__esModule && $__engine_47_net_47_Network__ || {default: $__engine_47_net_47_Network__}).default;
var ActorFactory = ($__engine_47_core_47_ActorFactory__ = require("engine/core/ActorFactory"), $__engine_47_core_47_ActorFactory__ && $__engine_47_core_47_ActorFactory__.__esModule && $__engine_47_core_47_ActorFactory__ || {default: $__engine_47_core_47_ActorFactory__}).default;
var Script = ($__engine_47_processes_47_Script__ = require("engine/processes/Script"), $__engine_47_processes_47_Script__ && $__engine_47_processes_47_Script__.__esModule && $__engine_47_processes_47_Script__ || {default: $__engine_47_processes_47_Script__}).default;
var Actor = ($__engine_47_core_47_Actor__ = require("engine/core/Actor"), $__engine_47_core_47_Actor__ && $__engine_47_core_47_Actor__.__esModule && $__engine_47_core_47_Actor__ || {default: $__engine_47_core_47_Actor__}).default;
var $__default = function(config) {
  var promises = [];
  engine.cache = new Cache();
  engine.scheduler = new Scheduler();
  engine.scheduler.addChild(new Script(function(now, deltaMs) {
    engine.scene.update(deltaMs);
  }));
  engine.factory = new ActorFactory();
  engine.scene = null;
  engine.network = null;
  engine.running = null;
  if (config.factory) {
    var f = config.factory;
    promises.push(engine.cache.getAll(Object.keys(f.skeletons)).then(function(assets) {
      for (var url in assets) {
        engine.factory.registerSkeleton(f.skeletons[url], assets[url]);
      }
    }));
    engine.factory.registerComponents(f.components);
  }
  if (config.network) {
    engine.network = new Network(config.network.name, config.network.key);
    if (config.network.session) {
      promises.push(engine.network.createSession(config.network.session));
    }
  }
  engine.on("Actor:destroy", function(actor) {
    engine.scene.destroyActor(actor);
  });
  engine.running = Promise.all(promises).then(function() {
    if (config.scene) {
      var s = config.scene;
      engine.scene = engine.factory.create(Scene, s.type, s);
    } else {
      engine.scene = new Scene();
    }
  }).then(function() {
    engine.scheduler.start(config.scheduler.deltaMs || 17);
  });
};
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"engine/Engine":8,"engine/core/Actor":13,"engine/core/ActorFactory":14,"engine/core/Cache":15,"engine/core/Scene":18,"engine/core/Scheduler":19,"engine/net/Network":30,"engine/processes/Script":34}],10:[function(require,module,exports){
"use strict";
var $__engine_47_core_47_Component__;
var Component = ($__engine_47_core_47_Component__ = require("engine/core/Component"), $__engine_47_core_47_Component__ && $__engine_47_core_47_Component__.__esModule && $__engine_47_core_47_Component__ || {default: $__engine_47_core_47_Component__}).default;
var Lifetime = function($__super) {
  function Lifetime() {
    $traceurRuntime.superConstructor(Lifetime).call(this, "Lifetime");
    this.lifetime = 0;
  }
  return ($traceurRuntime.createClass)(Lifetime, {
    update: function(deltaMs) {
      this.lifetime -= deltaMs;
      if (this.lifetime < 0) {
        this.actor.destroy();
      }
    },
    setFromJSON: function(lifetime) {
      if (!lifetime)
        return;
      this.lifetime = lifetime;
    }
  }, {}, $__super);
}(Component);
var $__default = Lifetime;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"engine/core/Component":16}],11:[function(require,module,exports){
"use strict";
var $__engine_47_core_47_Component__,
    $__engine_47_Engine__;
var Component = ($__engine_47_core_47_Component__ = require("engine/core/Component"), $__engine_47_core_47_Component__ && $__engine_47_core_47_Component__.__esModule && $__engine_47_core_47_Component__ || {default: $__engine_47_core_47_Component__}).default;
var engine = ($__engine_47_Engine__ = require("engine/Engine"), $__engine_47_Engine__ && $__engine_47_Engine__.__esModule && $__engine_47_Engine__ || {default: $__engine_47_Engine__}).default;
var Sprite = function($__super) {
  function Sprite() {
    $traceurRuntime.superConstructor(Sprite).call(this, "render");
    this.renderType = "Sprite";
    this.dirt = 0;
    this._width = null;
    this._height = null;
    this._url = null;
    this._image = null;
    this.loaded = false;
  }
  return ($traceurRuntime.createClass)(Sprite, {
    dirty: function() {
      this.dirt++;
    },
    get width() {
      return this._width;
    },
    set width(width) {
      this._width = width;
      this.dirt++;
    },
    get height() {
      return this._height;
    },
    set height(height) {
      this._height = height;
      this.dirt++;
    },
    get image() {
      return this._image;
    },
    set image(image) {
      this._image = image;
      if (!this._width)
        this._width = image.width;
      if (!this.height)
        this._height = image.height;
      this.dirt++;
    },
    get url() {
      return this._url;
    },
    set url(url) {
      var $__5 = this;
      this._url = url;
      this.loaded = false;
      engine.cache.get(url).then(function(image) {
        $__5.image = image;
        $__5.loaded = true;
      });
    },
    setFromJSON: function(json) {
      if (!json)
        return;
      if (json.width)
        this._width = json.width;
      if (json.height)
        this._height = json.height;
      if (json.url)
        this.url = json.url;
    }
  }, {}, $__super);
}(Component);
var $__default = Sprite;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"engine/Engine":8,"engine/core/Component":16}],12:[function(require,module,exports){
"use strict";
var $__engine_47_core_47_Component__,
    $__engine_47_lib_47_gl_45_matrix__;
var Component = ($__engine_47_core_47_Component__ = require("engine/core/Component"), $__engine_47_core_47_Component__ && $__engine_47_core_47_Component__.__esModule && $__engine_47_core_47_Component__ || {default: $__engine_47_core_47_Component__}).default;
var $__1 = ($__engine_47_lib_47_gl_45_matrix__ = require("engine/lib/gl-matrix"), $__engine_47_lib_47_gl_45_matrix__ && $__engine_47_lib_47_gl_45_matrix__.__esModule && $__engine_47_lib_47_gl_45_matrix__ || {default: $__engine_47_lib_47_gl_45_matrix__}),
    mat3 = $__1.mat3,
    vec2 = $__1.vec2;
var IDENTITY_MATRIX = mat3.create();
mat3.identity(IDENTITY_MATRIX);
var Transform2D = function($__super) {
  function Transform2D() {
    $traceurRuntime.superConstructor(Transform2D).call(this, "transform");
    this._position = vec2.create();
    this._scale = vec2.create();
    this._scale[0] = 1;
    this._scale[1] = 1;
    this._rotation = 0;
    this.toWorld = mat3.create();
    this.matrix = mat3.create();
    this.inverse = mat3.create();
    mat3.identity(this.toWorld);
    mat3.identity(this.matrix);
    mat3.identity(this.inverse);
  }
  return ($traceurRuntime.createClass)(Transform2D, {
    get position() {
      return vec2.clone(this._position);
    },
    set position(position) {
      vec2.copy(this._position, position);
      this.updateMatrix();
    },
    get rotation() {
      return this._rotation;
    },
    set rotation(rotation) {
      this._rotation = rotation;
      this.updateMatrix();
    },
    getWorldPosition: function() {
      var pos = vec2.create();
      pos[0] = this.toWorld[6];
      pos[1] = this.toWorld[7];
      return pos;
    },
    setDirection: function(vec) {
      var tmp = vec2.clone(vec);
      var len = vec2.length(tmp);
      if (len == 0) {
        this.rotation = 0;
      } else {
        vec2.scale(tmp, tmp, 1 / len);
        var theta = Math.acos(tmp[0]);
        if (vec[1] < 0)
          theta *= -1;
        this.rotation = theta;
      }
    },
    get scale() {
      return vec2.clone(this._scale);
    },
    set scale(scale) {
      vec2.copy(this._scale, scale);
      this.updateMatrix();
    },
    updateMatrix: function() {
      var actor = this.actor;
      var parent = this.parent;
      var toWorld = this.toWorld;
      var matrix = this.matrix;
      var _position = this._position;
      var _rotation = this._rotation;
      mat3.scale(matrix, IDENTITY_MATRIX, this._scale);
      mat3.rotate(matrix, matrix, this._rotation);
      matrix[6] = _position[0];
      matrix[7] = _position[1];
      mat3.invert(this.inverse, matrix);
      if (parent) {
        mat4.mul(toWorld, parent.getComponent("transform").toWorld, matrix);
      } else {
        mat3.copy(toWorld, matrix);
      }
      actor.emit("transform:change");
      var children = this.actor.children;
      for (var key in children) {
        children[key].updateMatrix();
      }
    },
    setFromJSON: function(json) {
      if (!json)
        return;
      var needsUpdate = false;
      if (json.position) {
        vec2.copy(this._position, json.position);
        needsUpdate = true;
      }
      if (json.rotation !== undefined) {
        this._rotation = json.rotation;
        needsUpdate = true;
      }
      if (json.scale) {
        vec2.copy(this._scale, json.scale);
        needsUpdate = true;
      }
      if (needsUpdate) {
        this.updateMatrix();
      }
    }
  }, {}, $__super);
}(Component);
var $__default = Transform2D;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"engine/core/Component":16,"engine/lib/gl-matrix":27}],13:[function(require,module,exports){
"use strict";
var $__engine_47_lib_47_uuid__,
    $__events__;
var uuid = ($__engine_47_lib_47_uuid__ = require("engine/lib/uuid"), $__engine_47_lib_47_uuid__ && $__engine_47_lib_47_uuid__.__esModule && $__engine_47_lib_47_uuid__ || {default: $__engine_47_lib_47_uuid__}).default;
var EventEmitter = ($__events__ = require("events"), $__events__ && $__events__.__esModule && $__events__ || {default: $__events__}).default;
var Actor = function($__super) {
  function Actor(id) {
    $traceurRuntime.superConstructor(Actor).call(this);
    this.id = id || uuid.create().toString();
    this.parent = null;
    this.components = {};
    this.children = {};
  }
  return ($traceurRuntime.createClass)(Actor, {
    destructor: function() {},
    addComponent: function(component) {
      this.components[component.type] = component;
      component.setActor(this);
      this.emit("addComponent", component);
    },
    removeComponent: function(type) {
      delete this.components[type];
      this.emit("removeComponent", component);
    },
    getComponent: function(type) {
      return this.components[type];
    },
    addChild: function(child) {
      if (child.parent) {
        child.parent.removeChild(child);
      }
      child.parent = this;
      this.children[child.id] = child;
      this.emit("addChild", child);
    },
    removeChild: function(child) {
      child.parent = null;
      delete this.children[child.id];
      this.emit("removeChild", child);
    },
    update: function(deltaMs) {
      for (var key in this.components) {
        this.components[key].update(deltaMs);
      }
      for (var id in this.children) {
        this.children[id].update(deltaMs);
      }
    },
    destroy: function() {
      engine.emit("Actor:destroy", this);
    }
  }, {}, $__super);
}(EventEmitter);
var $__default = Actor;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"engine/lib/uuid":28,"events":36}],14:[function(require,module,exports){
"use strict";
var $__engine_47_Engine__;
var engine = ($__engine_47_Engine__ = require("engine/Engine"), $__engine_47_Engine__ && $__engine_47_Engine__.__esModule && $__engine_47_Engine__ || {default: $__engine_47_Engine__}).default;
var ActorFactory = function() {
  function ActorFactory() {
    this.skeletons = {};
    this.components = {};
  }
  return ($traceurRuntime.createClass)(ActorFactory, {
    registerComponent: function(type, constructor) {
      this.components[type] = constructor;
    },
    registerComponents: function(components) {
      for (var name in components) {
        this.registerComponent(name, components[name]);
      }
    },
    registerSkeleton: function(type, skeleton) {
      this.skeletons[type] = skeleton;
    },
    registerSkeletons: function(skeletons) {
      for (var type in skeletons) {
        this.registerSkeleton(type, skeletons[type]);
      }
    },
    loadSkeletons: function(skeletons) {
      var $__3 = this;
      return engine.cache.getAll(Object.keys(skeletons)).then(function(assets) {
        for (var url in skeletons) {
          $__3.skeletons[skeletons[url]] = assets[url];
        }
        return assets;
      });
    },
    create: function(base, type, config) {
      var id = (config) ? config.id : null;
      var actor = new base(id);
      var skeleton = this.skeletons[type];
      var components = this.components;
      for (var componentType in skeleton) {
        var CC = this.components[componentType];
        if (!CC)
          console.error(("Component " + componentType + " Does Not Exist"));
        var component = new CC();
        actor.addComponent(component);
        var defaults = skeleton[componentType];
        component.setFromJSON(defaults);
        if (config) {
          var settings = config[componentType];
          component.setFromJSON(settings);
        }
      }
      return actor;
    }
  }, {});
}();
var $__default = ActorFactory;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"engine/Engine":8}],15:[function(require,module,exports){
"use strict";
var $__engine_47_net_47_http__;
var http = ($__engine_47_net_47_http__ = require("engine/net/http"), $__engine_47_net_47_http__ && $__engine_47_net_47_http__.__esModule && $__engine_47_net_47_http__ || {default: $__engine_47_net_47_http__});
var imageLoader = function(url) {
  return new Promise(function(resolve, reject) {
    var image = new Image();
    image.addEventListener("load", function() {
      resolve(image);
    });
    image.addEventListener("error", reject);
    image.src = url;
  });
};
var jsonLoader = function(url) {
  return http.get(url).then(function(e) {
    return JSON.parse(e.target.responseText);
  }, function(err) {
    return e;
  });
};
var defaultLoader = function(url) {
  return http.get(url).then(function(e) {
    return e.target.responseText;
  }, function(err) {
    return err;
  });
};
var Cache = function() {
  function Cache() {
    this.assets = {};
    this.plugins = {
      "png": imageLoader,
      "json": jsonLoader
    };
  }
  return ($traceurRuntime.createClass)(Cache, {
    get: function(url) {
      var $__2 = this;
      return new Promise(function(resolve, reject) {
        var assets = $__2.assets;
        if (assets[url] !== undefined) {
          resolve(assets[url]);
        }
        var fileType = url.split(".").pop();
        var loader = $__2.plugins[fileType] || defaultLoader;
        loader(url).then(function(data) {
          resolve(data);
        }, function(err) {
          reject(err);
        });
      });
    },
    getAll: function(urls) {
      var $__2 = this;
      var promises = urls.map(function(url) {
        return $__2.get(url);
      });
      return Promise.all(promises).then(function(assets) {
        var data = {};
        for (var i = 0; i < assets.length; i++) {
          var url = urls[i],
              asset = assets[i];
          data[url] = asset;
        }
        return data;
      });
    }
  }, {});
}();
var $__default = Cache;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"engine/net/http":32}],16:[function(require,module,exports){
"use strict";
var $__events__;
var EventEmitter = ($__events__ = require("events"), $__events__ && $__events__.__esModule && $__events__ || {default: $__events__}).default;
var nextComponentGuid = 0;
var Component = function($__super) {
  function Component(type) {
    $traceurRuntime.superConstructor(Component).call(this);
    this.type = type;
    this.id = nextComponentGuid++;
    this.actor = null;
  }
  return ($traceurRuntime.createClass)(Component, {
    setActor: function(actor) {
      this.actor = actor;
    },
    setFromJSON: function() {
      console.warn((this.type + ":setFromJSON has not been implemented"));
    },
    update: function(deltaMs) {}
  }, {}, $__super);
}(EventEmitter);
var $__default = Component;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"events":36}],17:[function(require,module,exports){
"use strict";
var UNINITIALIZED = 0x1;
var RUNNING = 0x2;
var SUCCEEDED = 0x3;
var FAILED = 0x4;
var Process = function() {
  function Process() {
    this.state = UNINITIALIZED;
    this.children = [];
  }
  return ($traceurRuntime.createClass)(Process, {
    initialize: function() {
      this.state = RUNNING;
    },
    succeed: function() {
      this.state = SUCCEEDED;
    },
    fail: function() {
      this.state = FAILED;
    },
    addChild: function(child) {
      this.children.push(child);
    },
    update: function(now, deltaMs) {}
  }, {});
}();
var $__default = Process;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  UNINITIALIZED: {get: function() {
      return UNINITIALIZED;
    }},
  RUNNING: {get: function() {
      return RUNNING;
    }},
  SUCCEEDED: {get: function() {
      return SUCCEEDED;
    }},
  FAILED: {get: function() {
      return FAILED;
    }},
  __esModule: {value: true}
});

},{}],18:[function(require,module,exports){
"use strict";
var $__Actor__;
var Actor = ($__Actor__ = require("./Actor"), $__Actor__ && $__Actor__.__esModule && $__Actor__ || {default: $__Actor__}).default;
var Scene = function($__super) {
  function Scene(id) {
    $traceurRuntime.superConstructor(Scene).call(this, id);
    this.actors = {};
  }
  return ($traceurRuntime.createClass)(Scene, {
    addActor: function(actor) {
      this.actors[actor.id] = actor;
    },
    findActorById: function(id) {
      var actor = this.actors[id];
      if (!actor)
        return null;
      return actor;
    },
    destroyActor: function(actor) {
      delete this.actors[actor.id];
      if (actor.parent) {
        actor.parent.removeChild(actor);
      }
      actor.destructor();
    }
  }, {}, $__super);
}(Actor);
var $__default = Scene;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"./Actor":13}],19:[function(require,module,exports){
"use strict";
var $__engine_47_util_47_setIntervalMs__,
    $__Process__,
    $__Process__;
var setIntervalMs = ($__engine_47_util_47_setIntervalMs__ = require("engine/util/setIntervalMs"), $__engine_47_util_47_setIntervalMs__ && $__engine_47_util_47_setIntervalMs__.__esModule && $__engine_47_util_47_setIntervalMs__ || {default: $__engine_47_util_47_setIntervalMs__}).default;
var Process = ($__Process__ = require("./Process"), $__Process__ && $__Process__.__esModule && $__Process__ || {default: $__Process__}).default;
var $__2 = ($__Process__ = require("./Process"), $__Process__ && $__Process__.__esModule && $__Process__ || {default: $__Process__}),
    UNINITIALIZED = $__2.UNINITIALIZED,
    RUNNING = $__2.RUNNING,
    FAILED = $__2.FAILED,
    SUCCEEDED = $__2.SUCCEEDED;
var Scheduler = function() {
  function Scheduler() {
    this.processes = [];
    this.interval = null;
  }
  return ($traceurRuntime.createClass)(Scheduler, {
    addChild: function(proc) {
      this.processes.push(proc);
    },
    start: function(delay) {
      var $__6 = this;
      if (this.interval)
        return;
      this.interval = setIntervalMs(function(now, deltaMs) {
        $__6.update(now, deltaMs);
      }, delay);
    },
    kill: function() {
      clearInterval(this.interval);
      this.interval = null;
    },
    update: function(now, deltaMs) {
      var $__14,
          $__15;
      var add = [];
      var needCull = false;
      var $__10 = true;
      var $__11 = false;
      var $__12 = undefined;
      try {
        for (var $__8 = void 0,
            $__7 = (this.processes)[Symbol.iterator](); !($__10 = ($__8 = $__7.next()).done); $__10 = true) {
          var proc = $__8.value;
          {
            if (proc.state === UNINITIALIZED) {
              proc.initialize();
            }
            if (proc.state === RUNNING) {
              proc.update(now, deltaMs);
            }
            if (proc.state === SUCCEEDED) {
              needCull = true;
              ($__14 = add).push.apply($__14, $traceurRuntime.spread(proc.children));
            }
            if (proc.state === FAILED) {
              needCull = true;
            }
          }
        }
      } catch ($__13) {
        $__11 = true;
        $__12 = $__13;
      } finally {
        try {
          if (!$__10 && $__7.return != null) {
            $__7.return();
          }
        } finally {
          if ($__11) {
            throw $__12;
          }
        }
      }
      if (needCull) {
        this.processes = this.processes.filter(function(proc) {
          return proc.state != FAILED && proc.state != SUCCEEDED;
        });
      }
      if (add.length) {
        ($__15 = this.processes).push.apply($__15, $traceurRuntime.spread(add));
      }
    }
  }, {});
}();
var $__default = Scheduler;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"./Process":17,"engine/util/setIntervalMs":35}],20:[function(require,module,exports){
"use strict";
var $__engine_47_core_47_Actor__,
    $__engine_47_graphics_47_Renderer__,
    $__engine_47_graphics_47_plugins_47_SpriteRenderer__,
    $__engine_47_components_47_Transform2D__,
    $__engine_47_lib_47_gl_45_matrix__,
    $__engine_47_Engine__,
    $__engine_47_processes_47_Script__;
var Actor = ($__engine_47_core_47_Actor__ = require("engine/core/Actor"), $__engine_47_core_47_Actor__ && $__engine_47_core_47_Actor__.__esModule && $__engine_47_core_47_Actor__ || {default: $__engine_47_core_47_Actor__}).default;
var Renderer = ($__engine_47_graphics_47_Renderer__ = require("engine/graphics/Renderer"), $__engine_47_graphics_47_Renderer__ && $__engine_47_graphics_47_Renderer__.__esModule && $__engine_47_graphics_47_Renderer__ || {default: $__engine_47_graphics_47_Renderer__}).default;
var SpriteRenderer = ($__engine_47_graphics_47_plugins_47_SpriteRenderer__ = require("engine/graphics/plugins/SpriteRenderer"), $__engine_47_graphics_47_plugins_47_SpriteRenderer__ && $__engine_47_graphics_47_plugins_47_SpriteRenderer__.__esModule && $__engine_47_graphics_47_plugins_47_SpriteRenderer__ || {default: $__engine_47_graphics_47_plugins_47_SpriteRenderer__}).default;
var Transform2D = ($__engine_47_components_47_Transform2D__ = require("engine/components/Transform2D"), $__engine_47_components_47_Transform2D__ && $__engine_47_components_47_Transform2D__.__esModule && $__engine_47_components_47_Transform2D__ || {default: $__engine_47_components_47_Transform2D__}).default;
var vec2 = ($__engine_47_lib_47_gl_45_matrix__ = require("engine/lib/gl-matrix"), $__engine_47_lib_47_gl_45_matrix__ && $__engine_47_lib_47_gl_45_matrix__.__esModule && $__engine_47_lib_47_gl_45_matrix__ || {default: $__engine_47_lib_47_gl_45_matrix__}).vec2;
var engine = ($__engine_47_Engine__ = require("engine/Engine"), $__engine_47_Engine__ && $__engine_47_Engine__.__esModule && $__engine_47_Engine__ || {default: $__engine_47_Engine__}).default;
var Script = ($__engine_47_processes_47_Script__ = require("engine/processes/Script"), $__engine_47_processes_47_Script__ && $__engine_47_processes_47_Script__.__esModule && $__engine_47_processes_47_Script__ || {default: $__engine_47_processes_47_Script__}).default;
var Camera2D = function($__super) {
  function Camera2D(width, height) {
    $traceurRuntime.superConstructor(Camera2D).call(this);
    this._width = width;
    this._height = height;
    this._renderer = new Renderer(width, height);
    this._renderer.registerPlugin(new SpriteRenderer());
    document.body.appendChild(this._renderer.canvas);
    this.addComponent(new Transform2D());
    this.getComponent("transform").scale = [width / 2, height / 2];
  }
  return ($traceurRuntime.createClass)(Camera2D, {
    render: function() {
      this._renderer.render(engine.scene, this);
    },
    mouseToWorld: function(mouse) {
      var out = vec2.create();
      out[0] = (mouse[0] - window.innerWidth / 2);
      out[1] = (window.innerHeight - mouse[1] - window.innerHeight / 2);
      return out;
    },
    update: function() {}
  }, {}, $__super);
}(Actor);
var $__default = Camera2D;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"engine/Engine":8,"engine/components/Transform2D":12,"engine/core/Actor":13,"engine/graphics/Renderer":23,"engine/graphics/plugins/SpriteRenderer":25,"engine/lib/gl-matrix":27,"engine/processes/Script":34}],21:[function(require,module,exports){
"use strict";
var $__util__;
var glutil = ($__util__ = require("./util"), $__util__ && $__util__.__esModule && $__util__ || {default: $__util__});
var Program = function() {
  function Program(gl, vSrc, fSrc, config) {
    this.gl = gl;
    this.program = glutil.createProgram(gl, vSrc, fSrc);
    this.attributes = {};
    this.uniforms = {};
    var attributes = config.attributes || [];
    var uniforms = config.uniforms || [];
    var $__5 = true;
    var $__6 = false;
    var $__7 = undefined;
    try {
      for (var $__3 = void 0,
          $__2 = (attributes)[Symbol.iterator](); !($__5 = ($__3 = $__2.next()).done); $__5 = true) {
        var attrib = $__3.value;
        {
          this.attributes[attrib] = gl.getAttribLocation(this.program, attrib);
        }
      }
    } catch ($__8) {
      $__6 = true;
      $__7 = $__8;
    } finally {
      try {
        if (!$__5 && $__2.return != null) {
          $__2.return();
        }
      } finally {
        if ($__6) {
          throw $__7;
        }
      }
    }
    var $__12 = true;
    var $__13 = false;
    var $__14 = undefined;
    try {
      for (var $__10 = void 0,
          $__9 = (uniforms)[Symbol.iterator](); !($__12 = ($__10 = $__9.next()).done); $__12 = true) {
        var uniform = $__10.value;
        {
          this.uniforms[uniform] = gl.getUniformLocation(this.program, uniform);
        }
      }
    } catch ($__15) {
      $__13 = true;
      $__14 = $__15;
    } finally {
      try {
        if (!$__12 && $__9.return != null) {
          $__9.return();
        }
      } finally {
        if ($__13) {
          throw $__14;
        }
      }
    }
  }
  return ($traceurRuntime.createClass)(Program, {}, {});
}();
var $__default = Program;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"./util":26}],22:[function(require,module,exports){
"use strict";
var ProgramManager = function() {
  function ProgramManager(gl) {
    this.gl = gl;
    this.program = null;
  }
  return ($traceurRuntime.createClass)(ProgramManager, {use: function(program) {
      var gl = this.gl;
      var current = this.program;
      if (current !== null) {
        for (var key in current.attributes) {
          gl.disableVertexAttribArray(current.attributes[key]);
        }
      }
      gl.useProgram(program.program);
      for (var key$__3 in program.attributes) {
        gl.enableVertexAttribArray(program.attributes[key$__3]);
      }
      this.program = program;
    }}, {});
}();
var $__default = ProgramManager;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{}],23:[function(require,module,exports){
"use strict";
var $__Program__,
    $__ProgramManager__;
var Program = ($__Program__ = require("./Program"), $__Program__ && $__Program__.__esModule && $__Program__ || {default: $__Program__}).default;
var ProgramManager = ($__ProgramManager__ = require("./ProgramManager"), $__ProgramManager__ && $__ProgramManager__.__esModule && $__ProgramManager__ || {default: $__ProgramManager__}).default;
var Renderer = function() {
  function Renderer(width, height) {
    this.canvas = document.createElement("canvas", {preserveDrawingBuffer: true});
    this.canvas.width = width;
    this.canvas.height = height;
    this.plugins = {};
    var gl = this.gl = this.canvas.getContext("webgl");
    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 1);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    this.programManager = new ProgramManager(gl);
  }
  return ($traceurRuntime.createClass)(Renderer, {
    registerPlugin: function(plugin) {
      plugin.initialize(this.gl);
      this.plugins[plugin.type] = plugin;
    },
    render: function(scene, camera) {
      var gl = this.gl;
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      this._render(scene, camera);
    },
    _render: function(actor, camera) {
      var render = actor.getComponent("render");
      if (render) {
        var plugin = this.plugins[render.renderType];
        if (!plugin) {
          console.log("FATAL : ATTEMPING TO RENDER AN UNSUPPORTED RENDER COMPONENT");
          return;
        }
        plugin.preRender();
        plugin.render(this, render, camera);
        plugin.postRender();
      }
      for (var id in actor.children) {
        this._render(actor.children[id], camera);
      }
    }
  }, {});
}();
var $__default = Renderer;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"./Program":21,"./ProgramManager":22}],24:[function(require,module,exports){
"use strict";
var RendererPlugin = function() {
  function RendererPlugin(type) {
    this.type = type;
    this.initialized = false;
  }
  return ($traceurRuntime.createClass)(RendererPlugin, {
    initialize: function() {
      this.initialized = true;
    },
    preRender: function() {},
    render: function() {},
    postRender: function() {}
  }, {});
}();
var $__default = RendererPlugin;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{}],25:[function(require,module,exports){
"use strict";
var $__engine_47_graphics_47_Program__,
    $__engine_47_graphics_47_RendererPlugin__;
var Program = ($__engine_47_graphics_47_Program__ = require("engine/graphics/Program"), $__engine_47_graphics_47_Program__ && $__engine_47_graphics_47_Program__.__esModule && $__engine_47_graphics_47_Program__ || {default: $__engine_47_graphics_47_Program__}).default;
var RendererPlugin = ($__engine_47_graphics_47_RendererPlugin__ = require("engine/graphics/RendererPlugin"), $__engine_47_graphics_47_RendererPlugin__ && $__engine_47_graphics_47_RendererPlugin__.__esModule && $__engine_47_graphics_47_RendererPlugin__ || {default: $__engine_47_graphics_47_RendererPlugin__}).default;
var vSrc = "\n\tattribute vec2 aPosition;\n\tattribute vec2 aTexCoord;\n\n\tuniform mat3 vMatrix;\n\tuniform mat3 mMatrix;\n\n\tvarying vec2 vTexCoord;\n\n\tvoid main(void) {\n\t\tvec3 position = vMatrix * mMatrix * vec3(aPosition, 1.0);\n\t\tgl_Position = vec4( position.xy, 0.0, 1.0 );\n\t\tvTexCoord = aTexCoord;\n\t}\n";
var fSrc = "\n\tprecision mediump float;\n\tvarying vec2 vTexCoord;\n\tuniform sampler2D uTexture;\n\tvoid main(void) {\n\t\tgl_FragColor = texture2D(uTexture, vTexCoord);\n\t}\n\n";
var GLSprite = function() {
  function GLSprite(gl, sprite) {
    this.gl = gl;
    this.sprite = sprite;
    this.vertices = new Float32Array(12);
    this.texCoords = new Float32Array(12);
    this.texture = gl.createTexture();
    this.buffers = [gl.createBuffer(), gl.createBuffer()];
    this.lastDirt = null;
  }
  return ($traceurRuntime.createClass)(GLSprite, {update: function() {
      var gl = this.gl;
      var sprite = this.sprite;
      var vertices = this.vertices;
      var texCoords = this.texCoords;
      var buffers = this.buffers;
      var texture = this.texture;
      var hw = sprite._width / 2;
      var hh = sprite._height / 2;
      vertices[0] = hw;
      vertices[1] = hh;
      vertices[2] = -hw;
      vertices[3] = hh;
      vertices[4] = -hw;
      vertices[5] = -hh;
      vertices[6] = hw;
      vertices[7] = hh;
      vertices[8] = -hw;
      vertices[9] = -hh;
      vertices[10] = hw;
      vertices[11] = -hh;
      texCoords[0] = 1;
      texCoords[1] = 1;
      texCoords[2] = 0;
      texCoords[3] = 1;
      texCoords[4] = 0;
      texCoords[5] = 0;
      texCoords[6] = 1;
      texCoords[7] = 1;
      texCoords[8] = 0;
      texCoords[9] = 0;
      texCoords[10] = 1;
      texCoords[11] = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers[0]);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers[1]);
      gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sprite.image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.bindTexture(gl.TEXTURE_2D, null);
      this.lastDirt = sprite.dirt;
    }}, {});
}();
var SpriteRenderer = function($__super) {
  function SpriteRenderer() {
    $traceurRuntime.superConstructor(SpriteRenderer).call(this, "Sprite");
    this.data = {};
    this.gl = null;
    this.program = null;
  }
  return ($traceurRuntime.createClass)(SpriteRenderer, {
    initialize: function(gl) {
      this.gl = gl;
      this.program = new Program(gl, vSrc, fSrc, {
        attributes: ["aPosition", "aTexCoord"],
        uniforms: ["vMatrix", "mMatrix", "pMatix"]
      });
    },
    render: function(renderer, sprite, camera) {
      if (!sprite.loaded)
        return;
      var gl = this.gl;
      renderer.programManager.use(this.program);
      if (!this.data[sprite.id])
        this.data[sprite.id] = new GLSprite(gl, sprite);
      var glSprite = this.data[sprite.id];
      if (glSprite.lastDirt !== sprite.id) {
        glSprite.update(sprite);
      }
      var buffers = glSprite.buffers;
      var texture = glSprite.texture;
      var program = renderer.programManager.program;
      var actor = sprite.actor;
      var transform = actor.getComponent("transform");
      var cameraTransform = camera.getComponent("transform");
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers[0]);
      gl.vertexAttribPointer(program.attributes.aPosition, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers[1]);
      gl.vertexAttribPointer(program.attributes.aTexCoord, 2, gl.FLOAT, false, 0, 0);
      gl.uniformMatrix3fv(program.uniforms.vMatrix, gl.FALSE, cameraTransform.inverse);
      gl.uniformMatrix3fv(program.uniforms.mMatrix, gl.FALSE, transform.toWorld);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
  }, {}, $__super);
}(RendererPlugin);
var $__default = SpriteRenderer;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"engine/graphics/Program":21,"engine/graphics/RendererPlugin":24}],26:[function(require,module,exports){
"use strict";
var createShader = function(gl, type, src) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
};
var createProgram = function(gl, vSrc, fSrc) {
  var program = gl.createProgram();
  gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vSrc));
  gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fSrc));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log("FAILED TO COMPILE SHADER");
    return null;
  }
  return program;
};
var createTexture = function(gl, type, image) {
  var texture = gl.createTexture();
  gl.bindTexture(type, texture);
  gl.texImage2D(type, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(type, null);
  return texture;
};
var createBufferWithData = function(gl, type, data, usage) {
  var buffer = gl.createBuffer();
  gl.bindBuffer(type, usage);
  gl.bufferData(type, data, usage);
  gl.bindBuffer(type, null);
  return buffer;
};
Object.defineProperties(module.exports, {
  createShader: {get: function() {
      return createShader;
    }},
  createProgram: {get: function() {
      return createProgram;
    }},
  createTexture: {get: function() {
      return createTexture;
    }},
  createBufferWithData: {get: function() {
      return createBufferWithData;
    }},
  __esModule: {value: true}
});

},{}],27:[function(require,module,exports){
module.exports = function() {
  "use strict";
  (function webpackUniversalModuleDefinition(root, factory) {
    if ((typeof exports === 'undefined' ? 'undefined' : $traceurRuntime.typeof(exports)) === 'object' && (typeof module === 'undefined' ? 'undefined' : $traceurRuntime.typeof(module)) === 'object')
      module.exports = factory();
    else if (typeof define === 'function' && define.amd)
      define(factory);
    else {
      var a = factory();
      for (var i in a)
        ((typeof exports === 'undefined' ? 'undefined' : $traceurRuntime.typeof(exports)) === 'object' ? exports : root)[i] = a[i];
    }
  })(this, function() {
    return (function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId])
          return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
          exports: {},
          id: moduleId,
          loaded: false
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.loaded = true;
        return module.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.p = "";
      return __webpack_require__(0);
    })([function(module, exports, __webpack_require__) {
      exports.glMatrix = __webpack_require__(1);
      exports.mat2 = __webpack_require__(2);
      exports.mat2d = __webpack_require__(3);
      exports.mat3 = __webpack_require__(4);
      exports.mat4 = __webpack_require__(5);
      exports.quat = __webpack_require__(6);
      exports.vec2 = __webpack_require__(9);
      exports.vec3 = __webpack_require__(7);
      exports.vec4 = __webpack_require__(8);
    }, function(module, exports) {
      var glMatrix = {};
      glMatrix.EPSILON = 0.000001;
      glMatrix.ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
      glMatrix.RANDOM = Math.random;
      glMatrix.ENABLE_SIMD = false;
      glMatrix.SIMD_AVAILABLE = (glMatrix.ARRAY_TYPE === Float32Array) && ('SIMD' in this);
      glMatrix.USE_SIMD = glMatrix.ENABLE_SIMD && glMatrix.SIMD_AVAILABLE;
      glMatrix.setMatrixArrayType = function(type) {
        glMatrix.ARRAY_TYPE = type;
      };
      var degree = Math.PI / 180;
      glMatrix.toRadian = function(a) {
        return a * degree;
      };
      module.exports = glMatrix;
    }, function(module, exports, __webpack_require__) {
      var glMatrix = __webpack_require__(1);
      var mat2 = {};
      mat2.create = function() {
        var out = new glMatrix.ARRAY_TYPE(4);
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      };
      mat2.clone = function(a) {
        var out = new glMatrix.ARRAY_TYPE(4);
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
      };
      mat2.copy = function(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
      };
      mat2.identity = function(out) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      };
      mat2.transpose = function(out, a) {
        if (out === a) {
          var a1 = a[1];
          out[1] = a[2];
          out[2] = a1;
        } else {
          out[0] = a[0];
          out[1] = a[2];
          out[2] = a[1];
          out[3] = a[3];
        }
        return out;
      };
      mat2.invert = function(out, a) {
        var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            det = a0 * a3 - a2 * a1;
        if (!det) {
          return null;
        }
        det = 1.0 / det;
        out[0] = a3 * det;
        out[1] = -a1 * det;
        out[2] = -a2 * det;
        out[3] = a0 * det;
        return out;
      };
      mat2.adjoint = function(out, a) {
        var a0 = a[0];
        out[0] = a[3];
        out[1] = -a[1];
        out[2] = -a[2];
        out[3] = a0;
        return out;
      };
      mat2.determinant = function(a) {
        return a[0] * a[3] - a[2] * a[1];
      };
      mat2.multiply = function(out, a, b) {
        var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3];
        var b0 = b[0],
            b1 = b[1],
            b2 = b[2],
            b3 = b[3];
        out[0] = a0 * b0 + a2 * b1;
        out[1] = a1 * b0 + a3 * b1;
        out[2] = a0 * b2 + a2 * b3;
        out[3] = a1 * b2 + a3 * b3;
        return out;
      };
      mat2.mul = mat2.multiply;
      mat2.rotate = function(out, a, rad) {
        var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            s = Math.sin(rad),
            c = Math.cos(rad);
        out[0] = a0 * c + a2 * s;
        out[1] = a1 * c + a3 * s;
        out[2] = a0 * -s + a2 * c;
        out[3] = a1 * -s + a3 * c;
        return out;
      };
      mat2.scale = function(out, a, v) {
        var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            v0 = v[0],
            v1 = v[1];
        out[0] = a0 * v0;
        out[1] = a1 * v0;
        out[2] = a2 * v1;
        out[3] = a3 * v1;
        return out;
      };
      mat2.fromRotation = function(out, rad) {
        var s = Math.sin(rad),
            c = Math.cos(rad);
        out[0] = c;
        out[1] = s;
        out[2] = -s;
        out[3] = c;
        return out;
      };
      mat2.fromScaling = function(out, v) {
        out[0] = v[0];
        out[1] = 0;
        out[2] = 0;
        out[3] = v[1];
        return out;
      };
      mat2.str = function(a) {
        return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
      };
      mat2.frob = function(a) {
        return (Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)));
      };
      mat2.LDU = function(L, D, U, a) {
        L[2] = a[2] / a[0];
        U[0] = a[0];
        U[1] = a[1];
        U[3] = a[3] - L[2] * U[1];
        return [L, D, U];
      };
      module.exports = mat2;
    }, function(module, exports, __webpack_require__) {
      var glMatrix = __webpack_require__(1);
      var mat2d = {};
      mat2d.create = function() {
        var out = new glMatrix.ARRAY_TYPE(6);
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        out[4] = 0;
        out[5] = 0;
        return out;
      };
      mat2d.clone = function(a) {
        var out = new glMatrix.ARRAY_TYPE(6);
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        return out;
      };
      mat2d.copy = function(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        return out;
      };
      mat2d.identity = function(out) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        out[4] = 0;
        out[5] = 0;
        return out;
      };
      mat2d.invert = function(out, a) {
        var aa = a[0],
            ab = a[1],
            ac = a[2],
            ad = a[3],
            atx = a[4],
            aty = a[5];
        var det = aa * ad - ab * ac;
        if (!det) {
          return null;
        }
        det = 1.0 / det;
        out[0] = ad * det;
        out[1] = -ab * det;
        out[2] = -ac * det;
        out[3] = aa * det;
        out[4] = (ac * aty - ad * atx) * det;
        out[5] = (ab * atx - aa * aty) * det;
        return out;
      };
      mat2d.determinant = function(a) {
        return a[0] * a[3] - a[1] * a[2];
      };
      mat2d.multiply = function(out, a, b) {
        var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            a4 = a[4],
            a5 = a[5],
            b0 = b[0],
            b1 = b[1],
            b2 = b[2],
            b3 = b[3],
            b4 = b[4],
            b5 = b[5];
        out[0] = a0 * b0 + a2 * b1;
        out[1] = a1 * b0 + a3 * b1;
        out[2] = a0 * b2 + a2 * b3;
        out[3] = a1 * b2 + a3 * b3;
        out[4] = a0 * b4 + a2 * b5 + a4;
        out[5] = a1 * b4 + a3 * b5 + a5;
        return out;
      };
      mat2d.mul = mat2d.multiply;
      mat2d.rotate = function(out, a, rad) {
        var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            a4 = a[4],
            a5 = a[5],
            s = Math.sin(rad),
            c = Math.cos(rad);
        out[0] = a0 * c + a2 * s;
        out[1] = a1 * c + a3 * s;
        out[2] = a0 * -s + a2 * c;
        out[3] = a1 * -s + a3 * c;
        out[4] = a4;
        out[5] = a5;
        return out;
      };
      mat2d.scale = function(out, a, v) {
        var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            a4 = a[4],
            a5 = a[5],
            v0 = v[0],
            v1 = v[1];
        out[0] = a0 * v0;
        out[1] = a1 * v0;
        out[2] = a2 * v1;
        out[3] = a3 * v1;
        out[4] = a4;
        out[5] = a5;
        return out;
      };
      mat2d.translate = function(out, a, v) {
        var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            a4 = a[4],
            a5 = a[5],
            v0 = v[0],
            v1 = v[1];
        out[0] = a0;
        out[1] = a1;
        out[2] = a2;
        out[3] = a3;
        out[4] = a0 * v0 + a2 * v1 + a4;
        out[5] = a1 * v0 + a3 * v1 + a5;
        return out;
      };
      mat2d.fromRotation = function(out, rad) {
        var s = Math.sin(rad),
            c = Math.cos(rad);
        out[0] = c;
        out[1] = s;
        out[2] = -s;
        out[3] = c;
        out[4] = 0;
        out[5] = 0;
        return out;
      };
      mat2d.fromScaling = function(out, v) {
        out[0] = v[0];
        out[1] = 0;
        out[2] = 0;
        out[3] = v[1];
        out[4] = 0;
        out[5] = 0;
        return out;
      };
      mat2d.fromTranslation = function(out, v) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        out[4] = v[0];
        out[5] = v[1];
        return out;
      };
      mat2d.str = function(a) {
        return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ')';
      };
      mat2d.frob = function(a) {
        return (Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1));
      };
      module.exports = mat2d;
    }, function(module, exports, __webpack_require__) {
      var glMatrix = __webpack_require__(1);
      var mat3 = {};
      mat3.create = function() {
        var out = new glMatrix.ARRAY_TYPE(9);
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 1;
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
      };
      mat3.fromMat4 = function(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[4];
        out[4] = a[5];
        out[5] = a[6];
        out[6] = a[8];
        out[7] = a[9];
        out[8] = a[10];
        return out;
      };
      mat3.clone = function(a) {
        var out = new glMatrix.ARRAY_TYPE(9);
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        return out;
      };
      mat3.copy = function(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        return out;
      };
      mat3.identity = function(out) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 1;
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
      };
      mat3.transpose = function(out, a) {
        if (out === a) {
          var a01 = a[1],
              a02 = a[2],
              a12 = a[5];
          out[1] = a[3];
          out[2] = a[6];
          out[3] = a01;
          out[5] = a[7];
          out[6] = a02;
          out[7] = a12;
        } else {
          out[0] = a[0];
          out[1] = a[3];
          out[2] = a[6];
          out[3] = a[1];
          out[4] = a[4];
          out[5] = a[7];
          out[6] = a[2];
          out[7] = a[5];
          out[8] = a[8];
        }
        return out;
      };
      mat3.invert = function(out, a) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a10 = a[3],
            a11 = a[4],
            a12 = a[5],
            a20 = a[6],
            a21 = a[7],
            a22 = a[8],
            b01 = a22 * a11 - a12 * a21,
            b11 = -a22 * a10 + a12 * a20,
            b21 = a21 * a10 - a11 * a20,
            det = a00 * b01 + a01 * b11 + a02 * b21;
        if (!det) {
          return null;
        }
        det = 1.0 / det;
        out[0] = b01 * det;
        out[1] = (-a22 * a01 + a02 * a21) * det;
        out[2] = (a12 * a01 - a02 * a11) * det;
        out[3] = b11 * det;
        out[4] = (a22 * a00 - a02 * a20) * det;
        out[5] = (-a12 * a00 + a02 * a10) * det;
        out[6] = b21 * det;
        out[7] = (-a21 * a00 + a01 * a20) * det;
        out[8] = (a11 * a00 - a01 * a10) * det;
        return out;
      };
      mat3.adjoint = function(out, a) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a10 = a[3],
            a11 = a[4],
            a12 = a[5],
            a20 = a[6],
            a21 = a[7],
            a22 = a[8];
        out[0] = (a11 * a22 - a12 * a21);
        out[1] = (a02 * a21 - a01 * a22);
        out[2] = (a01 * a12 - a02 * a11);
        out[3] = (a12 * a20 - a10 * a22);
        out[4] = (a00 * a22 - a02 * a20);
        out[5] = (a02 * a10 - a00 * a12);
        out[6] = (a10 * a21 - a11 * a20);
        out[7] = (a01 * a20 - a00 * a21);
        out[8] = (a00 * a11 - a01 * a10);
        return out;
      };
      mat3.determinant = function(a) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a10 = a[3],
            a11 = a[4],
            a12 = a[5],
            a20 = a[6],
            a21 = a[7],
            a22 = a[8];
        return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
      };
      mat3.multiply = function(out, a, b) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a10 = a[3],
            a11 = a[4],
            a12 = a[5],
            a20 = a[6],
            a21 = a[7],
            a22 = a[8],
            b00 = b[0],
            b01 = b[1],
            b02 = b[2],
            b10 = b[3],
            b11 = b[4],
            b12 = b[5],
            b20 = b[6],
            b21 = b[7],
            b22 = b[8];
        out[0] = b00 * a00 + b01 * a10 + b02 * a20;
        out[1] = b00 * a01 + b01 * a11 + b02 * a21;
        out[2] = b00 * a02 + b01 * a12 + b02 * a22;
        out[3] = b10 * a00 + b11 * a10 + b12 * a20;
        out[4] = b10 * a01 + b11 * a11 + b12 * a21;
        out[5] = b10 * a02 + b11 * a12 + b12 * a22;
        out[6] = b20 * a00 + b21 * a10 + b22 * a20;
        out[7] = b20 * a01 + b21 * a11 + b22 * a21;
        out[8] = b20 * a02 + b21 * a12 + b22 * a22;
        return out;
      };
      mat3.mul = mat3.multiply;
      mat3.translate = function(out, a, v) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a10 = a[3],
            a11 = a[4],
            a12 = a[5],
            a20 = a[6],
            a21 = a[7],
            a22 = a[8],
            x = v[0],
            y = v[1];
        out[0] = a00;
        out[1] = a01;
        out[2] = a02;
        out[3] = a10;
        out[4] = a11;
        out[5] = a12;
        out[6] = x * a00 + y * a10 + a20;
        out[7] = x * a01 + y * a11 + a21;
        out[8] = x * a02 + y * a12 + a22;
        return out;
      };
      mat3.rotate = function(out, a, rad) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a10 = a[3],
            a11 = a[4],
            a12 = a[5],
            a20 = a[6],
            a21 = a[7],
            a22 = a[8],
            s = Math.sin(rad),
            c = Math.cos(rad);
        out[0] = c * a00 + s * a10;
        out[1] = c * a01 + s * a11;
        out[2] = c * a02 + s * a12;
        out[3] = c * a10 - s * a00;
        out[4] = c * a11 - s * a01;
        out[5] = c * a12 - s * a02;
        out[6] = a20;
        out[7] = a21;
        out[8] = a22;
        return out;
      };
      mat3.scale = function(out, a, v) {
        var x = v[0],
            y = v[1];
        out[0] = x * a[0];
        out[1] = x * a[1];
        out[2] = x * a[2];
        out[3] = y * a[3];
        out[4] = y * a[4];
        out[5] = y * a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        return out;
      };
      mat3.fromTranslation = function(out, v) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 1;
        out[5] = 0;
        out[6] = v[0];
        out[7] = v[1];
        out[8] = 1;
        return out;
      };
      mat3.fromRotation = function(out, rad) {
        var s = Math.sin(rad),
            c = Math.cos(rad);
        out[0] = c;
        out[1] = s;
        out[2] = 0;
        out[3] = -s;
        out[4] = c;
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
      };
      mat3.fromScaling = function(out, v) {
        out[0] = v[0];
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = v[1];
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
      };
      mat3.fromMat2d = function(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = 0;
        out[3] = a[2];
        out[4] = a[3];
        out[5] = 0;
        out[6] = a[4];
        out[7] = a[5];
        out[8] = 1;
        return out;
      };
      mat3.fromQuat = function(out, q) {
        var x = q[0],
            y = q[1],
            z = q[2],
            w = q[3],
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,
            xx = x * x2,
            yx = y * x2,
            yy = y * y2,
            zx = z * x2,
            zy = z * y2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;
        out[0] = 1 - yy - zz;
        out[3] = yx - wz;
        out[6] = zx + wy;
        out[1] = yx + wz;
        out[4] = 1 - xx - zz;
        out[7] = zy - wx;
        out[2] = zx - wy;
        out[5] = zy + wx;
        out[8] = 1 - xx - yy;
        return out;
      };
      mat3.normalFromMat4 = function(out, a) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11],
            a30 = a[12],
            a31 = a[13],
            a32 = a[14],
            a33 = a[15],
            b00 = a00 * a11 - a01 * a10,
            b01 = a00 * a12 - a02 * a10,
            b02 = a00 * a13 - a03 * a10,
            b03 = a01 * a12 - a02 * a11,
            b04 = a01 * a13 - a03 * a11,
            b05 = a02 * a13 - a03 * a12,
            b06 = a20 * a31 - a21 * a30,
            b07 = a20 * a32 - a22 * a30,
            b08 = a20 * a33 - a23 * a30,
            b09 = a21 * a32 - a22 * a31,
            b10 = a21 * a33 - a23 * a31,
            b11 = a22 * a33 - a23 * a32,
            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (!det) {
          return null;
        }
        det = 1.0 / det;
        out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        return out;
      };
      mat3.str = function(a) {
        return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ')';
      };
      mat3.frob = function(a) {
        return (Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)));
      };
      module.exports = mat3;
    }, function(module, exports, __webpack_require__) {
      var glMatrix = __webpack_require__(1);
      var mat4 = {
        scalar: {},
        SIMD: {}
      };
      mat4.create = function() {
        var out = new glMatrix.ARRAY_TYPE(16);
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = 1;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 1;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
      };
      mat4.clone = function(a) {
        var out = new glMatrix.ARRAY_TYPE(16);
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
        return out;
      };
      mat4.copy = function(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        out[9] = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
        return out;
      };
      mat4.identity = function(out) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = 1;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 1;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
      };
      mat4.scalar.transpose = function(out, a) {
        if (out === a) {
          var a01 = a[1],
              a02 = a[2],
              a03 = a[3],
              a12 = a[6],
              a13 = a[7],
              a23 = a[11];
          out[1] = a[4];
          out[2] = a[8];
          out[3] = a[12];
          out[4] = a01;
          out[6] = a[9];
          out[7] = a[13];
          out[8] = a02;
          out[9] = a12;
          out[11] = a[14];
          out[12] = a03;
          out[13] = a13;
          out[14] = a23;
        } else {
          out[0] = a[0];
          out[1] = a[4];
          out[2] = a[8];
          out[3] = a[12];
          out[4] = a[1];
          out[5] = a[5];
          out[6] = a[9];
          out[7] = a[13];
          out[8] = a[2];
          out[9] = a[6];
          out[10] = a[10];
          out[11] = a[14];
          out[12] = a[3];
          out[13] = a[7];
          out[14] = a[11];
          out[15] = a[15];
        }
        return out;
      };
      mat4.SIMD.transpose = function(out, a) {
        var a0,
            a1,
            a2,
            a3,
            tmp01,
            tmp23,
            out0,
            out1,
            out2,
            out3;
        a0 = SIMD.Float32x4.load(a, 0);
        a1 = SIMD.Float32x4.load(a, 4);
        a2 = SIMD.Float32x4.load(a, 8);
        a3 = SIMD.Float32x4.load(a, 12);
        tmp01 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
        tmp23 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
        out0 = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
        out1 = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
        SIMD.Float32x4.store(out, 0, out0);
        SIMD.Float32x4.store(out, 4, out1);
        tmp01 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
        tmp23 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
        out2 = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
        out3 = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
        SIMD.Float32x4.store(out, 8, out2);
        SIMD.Float32x4.store(out, 12, out3);
        return out;
      };
      mat4.transpose = glMatrix.USE_SIMD ? mat4.SIMD.transpose : mat4.scalar.transpose;
      mat4.scalar.invert = function(out, a) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11],
            a30 = a[12],
            a31 = a[13],
            a32 = a[14],
            a33 = a[15],
            b00 = a00 * a11 - a01 * a10,
            b01 = a00 * a12 - a02 * a10,
            b02 = a00 * a13 - a03 * a10,
            b03 = a01 * a12 - a02 * a11,
            b04 = a01 * a13 - a03 * a11,
            b05 = a02 * a13 - a03 * a12,
            b06 = a20 * a31 - a21 * a30,
            b07 = a20 * a32 - a22 * a30,
            b08 = a20 * a33 - a23 * a30,
            b09 = a21 * a32 - a22 * a31,
            b10 = a21 * a33 - a23 * a31,
            b11 = a22 * a33 - a23 * a32,
            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (!det) {
          return null;
        }
        det = 1.0 / det;
        out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
        out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
        out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
        return out;
      };
      mat4.SIMD.invert = function(out, a) {
        var row0,
            row1,
            row2,
            row3,
            tmp1,
            minor0,
            minor1,
            minor2,
            minor3,
            det,
            a0 = SIMD.Float32x4.load(a, 0),
            a1 = SIMD.Float32x4.load(a, 4),
            a2 = SIMD.Float32x4.load(a, 8),
            a3 = SIMD.Float32x4.load(a, 12);
        tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
        row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
        row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
        row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);
        tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
        row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
        row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
        row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);
        tmp1 = SIMD.Float32x4.mul(row2, row3);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
        minor0 = SIMD.Float32x4.mul(row1, tmp1);
        minor1 = SIMD.Float32x4.mul(row0, tmp1);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
        minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
        minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
        minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);
        tmp1 = SIMD.Float32x4.mul(row1, row2);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
        minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
        minor3 = SIMD.Float32x4.mul(row0, tmp1);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
        minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
        minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
        minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);
        tmp1 = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
        row2 = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
        minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
        minor2 = SIMD.Float32x4.mul(row0, tmp1);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
        minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
        minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
        minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);
        tmp1 = SIMD.Float32x4.mul(row0, row1);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
        minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
        minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
        minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
        minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));
        tmp1 = SIMD.Float32x4.mul(row0, row3);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
        minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
        minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
        minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
        minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));
        tmp1 = SIMD.Float32x4.mul(row0, row2);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
        minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
        minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
        minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
        minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);
        det = SIMD.Float32x4.mul(row0, minor0);
        det = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 2, 3, 0, 1), det);
        det = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 1, 0, 3, 2), det);
        tmp1 = SIMD.Float32x4.reciprocalApproximation(det);
        det = SIMD.Float32x4.sub(SIMD.Float32x4.add(tmp1, tmp1), SIMD.Float32x4.mul(det, SIMD.Float32x4.mul(tmp1, tmp1)));
        det = SIMD.Float32x4.swizzle(det, 0, 0, 0, 0);
        if (!det) {
          return null;
        }
        SIMD.Float32x4.store(out, 0, SIMD.Float32x4.mul(det, minor0));
        SIMD.Float32x4.store(out, 4, SIMD.Float32x4.mul(det, minor1));
        SIMD.Float32x4.store(out, 8, SIMD.Float32x4.mul(det, minor2));
        SIMD.Float32x4.store(out, 12, SIMD.Float32x4.mul(det, minor3));
        return out;
      };
      mat4.invert = glMatrix.USE_SIMD ? mat4.SIMD.invert : mat4.scalar.invert;
      mat4.scalar.adjoint = function(out, a) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11],
            a30 = a[12],
            a31 = a[13],
            a32 = a[14],
            a33 = a[15];
        out[0] = (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
        out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
        out[2] = (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
        out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
        out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
        out[5] = (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
        out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
        out[7] = (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
        out[8] = (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
        out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
        out[10] = (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
        out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
        out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
        out[13] = (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
        out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
        out[15] = (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
        return out;
      };
      mat4.SIMD.adjoint = function(out, a) {
        var a0,
            a1,
            a2,
            a3;
        var row0,
            row1,
            row2,
            row3;
        var tmp1;
        var minor0,
            minor1,
            minor2,
            minor3;
        var a0 = SIMD.Float32x4.load(a, 0);
        var a1 = SIMD.Float32x4.load(a, 4);
        var a2 = SIMD.Float32x4.load(a, 8);
        var a3 = SIMD.Float32x4.load(a, 12);
        tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
        row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
        row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
        row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);
        tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
        row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
        row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
        row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);
        tmp1 = SIMD.Float32x4.mul(row2, row3);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
        minor0 = SIMD.Float32x4.mul(row1, tmp1);
        minor1 = SIMD.Float32x4.mul(row0, tmp1);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
        minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
        minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
        minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);
        tmp1 = SIMD.Float32x4.mul(row1, row2);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
        minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
        minor3 = SIMD.Float32x4.mul(row0, tmp1);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
        minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
        minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
        minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);
        tmp1 = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
        row2 = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
        minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
        minor2 = SIMD.Float32x4.mul(row0, tmp1);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
        minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
        minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
        minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);
        tmp1 = SIMD.Float32x4.mul(row0, row1);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
        minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
        minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
        minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
        minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));
        tmp1 = SIMD.Float32x4.mul(row0, row3);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
        minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
        minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
        minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
        minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));
        tmp1 = SIMD.Float32x4.mul(row0, row2);
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
        minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
        minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
        tmp1 = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
        minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
        minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);
        SIMD.Float32x4.store(out, 0, minor0);
        SIMD.Float32x4.store(out, 4, minor1);
        SIMD.Float32x4.store(out, 8, minor2);
        SIMD.Float32x4.store(out, 12, minor3);
        return out;
      };
      mat4.adjoint = glMatrix.USE_SIMD ? mat4.SIMD.adjoint : mat4.scalar.adjoint;
      mat4.determinant = function(a) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11],
            a30 = a[12],
            a31 = a[13],
            a32 = a[14],
            a33 = a[15],
            b00 = a00 * a11 - a01 * a10,
            b01 = a00 * a12 - a02 * a10,
            b02 = a00 * a13 - a03 * a10,
            b03 = a01 * a12 - a02 * a11,
            b04 = a01 * a13 - a03 * a11,
            b05 = a02 * a13 - a03 * a12,
            b06 = a20 * a31 - a21 * a30,
            b07 = a20 * a32 - a22 * a30,
            b08 = a20 * a33 - a23 * a30,
            b09 = a21 * a32 - a22 * a31,
            b10 = a21 * a33 - a23 * a31,
            b11 = a22 * a33 - a23 * a32;
        return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
      };
      mat4.SIMD.multiply = function(out, a, b) {
        var a0 = SIMD.Float32x4.load(a, 0);
        var a1 = SIMD.Float32x4.load(a, 4);
        var a2 = SIMD.Float32x4.load(a, 8);
        var a3 = SIMD.Float32x4.load(a, 12);
        var b0 = SIMD.Float32x4.load(b, 0);
        var out0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 3, 3, 3, 3), a3))));
        SIMD.Float32x4.store(out, 0, out0);
        var b1 = SIMD.Float32x4.load(b, 4);
        var out1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 3, 3, 3, 3), a3))));
        SIMD.Float32x4.store(out, 4, out1);
        var b2 = SIMD.Float32x4.load(b, 8);
        var out2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 3, 3, 3, 3), a3))));
        SIMD.Float32x4.store(out, 8, out2);
        var b3 = SIMD.Float32x4.load(b, 12);
        var out3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 0, 0, 0, 0), a0), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 1, 1, 1, 1), a1), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 2, 2, 2, 2), a2), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 3, 3, 3, 3), a3))));
        SIMD.Float32x4.store(out, 12, out3);
        return out;
      };
      mat4.scalar.multiply = function(out, a, b) {
        var a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11],
            a30 = a[12],
            a31 = a[13],
            a32 = a[14],
            a33 = a[15];
        var b0 = b[0],
            b1 = b[1],
            b2 = b[2],
            b3 = b[3];
        out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[4];
        b1 = b[5];
        b2 = b[6];
        b3 = b[7];
        out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[8];
        b1 = b[9];
        b2 = b[10];
        b3 = b[11];
        out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = b[12];
        b1 = b[13];
        b2 = b[14];
        b3 = b[15];
        out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        return out;
      };
      mat4.multiply = glMatrix.USE_SIMD ? mat4.SIMD.multiply : mat4.scalar.multiply;
      mat4.mul = mat4.multiply;
      mat4.scalar.translate = function(out, a, v) {
        var x = v[0],
            y = v[1],
            z = v[2],
            a00,
            a01,
            a02,
            a03,
            a10,
            a11,
            a12,
            a13,
            a20,
            a21,
            a22,
            a23;
        if (a === out) {
          out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
          out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
          out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
          out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
        } else {
          a00 = a[0];
          a01 = a[1];
          a02 = a[2];
          a03 = a[3];
          a10 = a[4];
          a11 = a[5];
          a12 = a[6];
          a13 = a[7];
          a20 = a[8];
          a21 = a[9];
          a22 = a[10];
          a23 = a[11];
          out[0] = a00;
          out[1] = a01;
          out[2] = a02;
          out[3] = a03;
          out[4] = a10;
          out[5] = a11;
          out[6] = a12;
          out[7] = a13;
          out[8] = a20;
          out[9] = a21;
          out[10] = a22;
          out[11] = a23;
          out[12] = a00 * x + a10 * y + a20 * z + a[12];
          out[13] = a01 * x + a11 * y + a21 * z + a[13];
          out[14] = a02 * x + a12 * y + a22 * z + a[14];
          out[15] = a03 * x + a13 * y + a23 * z + a[15];
        }
        return out;
      };
      mat4.SIMD.translate = function(out, a, v) {
        var a0 = SIMD.Float32x4.load(a, 0),
            a1 = SIMD.Float32x4.load(a, 4),
            a2 = SIMD.Float32x4.load(a, 8),
            a3 = SIMD.Float32x4.load(a, 12),
            vec = SIMD.Float32x4(v[0], v[1], v[2], 0);
        if (a !== out) {
          out[0] = a[0];
          out[1] = a[1];
          out[2] = a[2];
          out[3] = a[3];
          out[4] = a[4];
          out[5] = a[5];
          out[6] = a[6];
          out[7] = a[7];
          out[8] = a[8];
          out[9] = a[9];
          out[10] = a[10];
          out[11] = a[11];
        }
        a0 = SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0));
        a1 = SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1));
        a2 = SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2));
        var t0 = SIMD.Float32x4.add(a0, SIMD.Float32x4.add(a1, SIMD.Float32x4.add(a2, a3)));
        SIMD.Float32x4.store(out, 12, t0);
        return out;
      };
      mat4.translate = glMatrix.USE_SIMD ? mat4.SIMD.translate : mat4.scalar.translate;
      mat4.scalar.scale = function(out, a, v) {
        var x = v[0],
            y = v[1],
            z = v[2];
        out[0] = a[0] * x;
        out[1] = a[1] * x;
        out[2] = a[2] * x;
        out[3] = a[3] * x;
        out[4] = a[4] * y;
        out[5] = a[5] * y;
        out[6] = a[6] * y;
        out[7] = a[7] * y;
        out[8] = a[8] * z;
        out[9] = a[9] * z;
        out[10] = a[10] * z;
        out[11] = a[11] * z;
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
        return out;
      };
      mat4.SIMD.scale = function(out, a, v) {
        var a0,
            a1,
            a2;
        var vec = SIMD.Float32x4(v[0], v[1], v[2], 0);
        a0 = SIMD.Float32x4.load(a, 0);
        SIMD.Float32x4.store(out, 0, SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0)));
        a1 = SIMD.Float32x4.load(a, 4);
        SIMD.Float32x4.store(out, 4, SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1)));
        a2 = SIMD.Float32x4.load(a, 8);
        SIMD.Float32x4.store(out, 8, SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2)));
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
        return out;
      };
      mat4.scale = glMatrix.USE_SIMD ? mat4.SIMD.scale : mat4.scalar.scale;
      mat4.rotate = function(out, a, rad, axis) {
        var x = axis[0],
            y = axis[1],
            z = axis[2],
            len = Math.sqrt(x * x + y * y + z * z),
            s,
            c,
            t,
            a00,
            a01,
            a02,
            a03,
            a10,
            a11,
            a12,
            a13,
            a20,
            a21,
            a22,
            a23,
            b00,
            b01,
            b02,
            b10,
            b11,
            b12,
            b20,
            b21,
            b22;
        if (Math.abs(len) < glMatrix.EPSILON) {
          return null;
        }
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        s = Math.sin(rad);
        c = Math.cos(rad);
        t = 1 - c;
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];
        b00 = x * x * t + c;
        b01 = y * x * t + z * s;
        b02 = z * x * t - y * s;
        b10 = x * y * t - z * s;
        b11 = y * y * t + c;
        b12 = z * y * t + x * s;
        b20 = x * z * t + y * s;
        b21 = y * z * t - x * s;
        b22 = z * z * t + c;
        out[0] = a00 * b00 + a10 * b01 + a20 * b02;
        out[1] = a01 * b00 + a11 * b01 + a21 * b02;
        out[2] = a02 * b00 + a12 * b01 + a22 * b02;
        out[3] = a03 * b00 + a13 * b01 + a23 * b02;
        out[4] = a00 * b10 + a10 * b11 + a20 * b12;
        out[5] = a01 * b10 + a11 * b11 + a21 * b12;
        out[6] = a02 * b10 + a12 * b11 + a22 * b12;
        out[7] = a03 * b10 + a13 * b11 + a23 * b12;
        out[8] = a00 * b20 + a10 * b21 + a20 * b22;
        out[9] = a01 * b20 + a11 * b21 + a21 * b22;
        out[10] = a02 * b20 + a12 * b21 + a22 * b22;
        out[11] = a03 * b20 + a13 * b21 + a23 * b22;
        if (a !== out) {
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
        }
        return out;
      };
      mat4.scalar.rotateX = function(out, a, rad) {
        var s = Math.sin(rad),
            c = Math.cos(rad),
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11];
        if (a !== out) {
          out[0] = a[0];
          out[1] = a[1];
          out[2] = a[2];
          out[3] = a[3];
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
        }
        out[4] = a10 * c + a20 * s;
        out[5] = a11 * c + a21 * s;
        out[6] = a12 * c + a22 * s;
        out[7] = a13 * c + a23 * s;
        out[8] = a20 * c - a10 * s;
        out[9] = a21 * c - a11 * s;
        out[10] = a22 * c - a12 * s;
        out[11] = a23 * c - a13 * s;
        return out;
      };
      mat4.SIMD.rotateX = function(out, a, rad) {
        var s = SIMD.Float32x4.splat(Math.sin(rad)),
            c = SIMD.Float32x4.splat(Math.cos(rad));
        if (a !== out) {
          out[0] = a[0];
          out[1] = a[1];
          out[2] = a[2];
          out[3] = a[3];
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
        }
        var a_1 = SIMD.Float32x4.load(a, 4);
        var a_2 = SIMD.Float32x4.load(a, 8);
        SIMD.Float32x4.store(out, 4, SIMD.Float32x4.add(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_2, s)));
        SIMD.Float32x4.store(out, 8, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_2, c), SIMD.Float32x4.mul(a_1, s)));
        return out;
      };
      mat4.rotateX = glMatrix.USE_SIMD ? mat4.SIMD.rotateX : mat4.scalar.rotateX;
      mat4.scalar.rotateY = function(out, a, rad) {
        var s = Math.sin(rad),
            c = Math.cos(rad),
            a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a20 = a[8],
            a21 = a[9],
            a22 = a[10],
            a23 = a[11];
        if (a !== out) {
          out[4] = a[4];
          out[5] = a[5];
          out[6] = a[6];
          out[7] = a[7];
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
        }
        out[0] = a00 * c - a20 * s;
        out[1] = a01 * c - a21 * s;
        out[2] = a02 * c - a22 * s;
        out[3] = a03 * c - a23 * s;
        out[8] = a00 * s + a20 * c;
        out[9] = a01 * s + a21 * c;
        out[10] = a02 * s + a22 * c;
        out[11] = a03 * s + a23 * c;
        return out;
      };
      mat4.SIMD.rotateY = function(out, a, rad) {
        var s = SIMD.Float32x4.splat(Math.sin(rad)),
            c = SIMD.Float32x4.splat(Math.cos(rad));
        if (a !== out) {
          out[4] = a[4];
          out[5] = a[5];
          out[6] = a[6];
          out[7] = a[7];
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
        }
        var a_0 = SIMD.Float32x4.load(a, 0);
        var a_2 = SIMD.Float32x4.load(a, 8);
        SIMD.Float32x4.store(out, 0, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_2, s)));
        SIMD.Float32x4.store(out, 8, SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, s), SIMD.Float32x4.mul(a_2, c)));
        return out;
      };
      mat4.rotateY = glMatrix.USE_SIMD ? mat4.SIMD.rotateY : mat4.scalar.rotateY;
      mat4.scalar.rotateZ = function(out, a, rad) {
        var s = Math.sin(rad),
            c = Math.cos(rad),
            a00 = a[0],
            a01 = a[1],
            a02 = a[2],
            a03 = a[3],
            a10 = a[4],
            a11 = a[5],
            a12 = a[6],
            a13 = a[7];
        if (a !== out) {
          out[8] = a[8];
          out[9] = a[9];
          out[10] = a[10];
          out[11] = a[11];
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
        }
        out[0] = a00 * c + a10 * s;
        out[1] = a01 * c + a11 * s;
        out[2] = a02 * c + a12 * s;
        out[3] = a03 * c + a13 * s;
        out[4] = a10 * c - a00 * s;
        out[5] = a11 * c - a01 * s;
        out[6] = a12 * c - a02 * s;
        out[7] = a13 * c - a03 * s;
        return out;
      };
      mat4.SIMD.rotateZ = function(out, a, rad) {
        var s = SIMD.Float32x4.splat(Math.sin(rad)),
            c = SIMD.Float32x4.splat(Math.cos(rad));
        if (a !== out) {
          out[8] = a[8];
          out[9] = a[9];
          out[10] = a[10];
          out[11] = a[11];
          out[12] = a[12];
          out[13] = a[13];
          out[14] = a[14];
          out[15] = a[15];
        }
        var a_0 = SIMD.Float32x4.load(a, 0);
        var a_1 = SIMD.Float32x4.load(a, 4);
        SIMD.Float32x4.store(out, 0, SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_1, s)));
        SIMD.Float32x4.store(out, 4, SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_0, s)));
        return out;
      };
      mat4.rotateZ = glMatrix.USE_SIMD ? mat4.SIMD.rotateZ : mat4.scalar.rotateZ;
      mat4.fromTranslation = function(out, v) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = 1;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 1;
        out[11] = 0;
        out[12] = v[0];
        out[13] = v[1];
        out[14] = v[2];
        out[15] = 1;
        return out;
      };
      mat4.fromScaling = function(out, v) {
        out[0] = v[0];
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = v[1];
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = v[2];
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
      };
      mat4.fromRotation = function(out, rad, axis) {
        var x = axis[0],
            y = axis[1],
            z = axis[2],
            len = Math.sqrt(x * x + y * y + z * z),
            s,
            c,
            t;
        if (Math.abs(len) < glMatrix.EPSILON) {
          return null;
        }
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        s = Math.sin(rad);
        c = Math.cos(rad);
        t = 1 - c;
        out[0] = x * x * t + c;
        out[1] = y * x * t + z * s;
        out[2] = z * x * t - y * s;
        out[3] = 0;
        out[4] = x * y * t - z * s;
        out[5] = y * y * t + c;
        out[6] = z * y * t + x * s;
        out[7] = 0;
        out[8] = x * z * t + y * s;
        out[9] = y * z * t - x * s;
        out[10] = z * z * t + c;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
      };
      mat4.fromXRotation = function(out, rad) {
        var s = Math.sin(rad),
            c = Math.cos(rad);
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = c;
        out[6] = s;
        out[7] = 0;
        out[8] = 0;
        out[9] = -s;
        out[10] = c;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
      };
      mat4.fromYRotation = function(out, rad) {
        var s = Math.sin(rad),
            c = Math.cos(rad);
        out[0] = c;
        out[1] = 0;
        out[2] = -s;
        out[3] = 0;
        out[4] = 0;
        out[5] = 1;
        out[6] = 0;
        out[7] = 0;
        out[8] = s;
        out[9] = 0;
        out[10] = c;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
      };
      mat4.fromZRotation = function(out, rad) {
        var s = Math.sin(rad),
            c = Math.cos(rad);
        out[0] = c;
        out[1] = s;
        out[2] = 0;
        out[3] = 0;
        out[4] = -s;
        out[5] = c;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 1;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
      };
      mat4.fromRotationTranslation = function(out, q, v) {
        var x = q[0],
            y = q[1],
            z = q[2],
            w = q[3],
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,
            xx = x * x2,
            xy = x * y2,
            xz = x * z2,
            yy = y * y2,
            yz = y * z2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;
        out[0] = 1 - (yy + zz);
        out[1] = xy + wz;
        out[2] = xz - wy;
        out[3] = 0;
        out[4] = xy - wz;
        out[5] = 1 - (xx + zz);
        out[6] = yz + wx;
        out[7] = 0;
        out[8] = xz + wy;
        out[9] = yz - wx;
        out[10] = 1 - (xx + yy);
        out[11] = 0;
        out[12] = v[0];
        out[13] = v[1];
        out[14] = v[2];
        out[15] = 1;
        return out;
      };
      mat4.fromRotationTranslationScale = function(out, q, v, s) {
        var x = q[0],
            y = q[1],
            z = q[2],
            w = q[3],
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,
            xx = x * x2,
            xy = x * y2,
            xz = x * z2,
            yy = y * y2,
            yz = y * z2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2,
            sx = s[0],
            sy = s[1],
            sz = s[2];
        out[0] = (1 - (yy + zz)) * sx;
        out[1] = (xy + wz) * sx;
        out[2] = (xz - wy) * sx;
        out[3] = 0;
        out[4] = (xy - wz) * sy;
        out[5] = (1 - (xx + zz)) * sy;
        out[6] = (yz + wx) * sy;
        out[7] = 0;
        out[8] = (xz + wy) * sz;
        out[9] = (yz - wx) * sz;
        out[10] = (1 - (xx + yy)) * sz;
        out[11] = 0;
        out[12] = v[0];
        out[13] = v[1];
        out[14] = v[2];
        out[15] = 1;
        return out;
      };
      mat4.fromRotationTranslationScaleOrigin = function(out, q, v, s, o) {
        var x = q[0],
            y = q[1],
            z = q[2],
            w = q[3],
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,
            xx = x * x2,
            xy = x * y2,
            xz = x * z2,
            yy = y * y2,
            yz = y * z2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2,
            sx = s[0],
            sy = s[1],
            sz = s[2],
            ox = o[0],
            oy = o[1],
            oz = o[2];
        out[0] = (1 - (yy + zz)) * sx;
        out[1] = (xy + wz) * sx;
        out[2] = (xz - wy) * sx;
        out[3] = 0;
        out[4] = (xy - wz) * sy;
        out[5] = (1 - (xx + zz)) * sy;
        out[6] = (yz + wx) * sy;
        out[7] = 0;
        out[8] = (xz + wy) * sz;
        out[9] = (yz - wx) * sz;
        out[10] = (1 - (xx + yy)) * sz;
        out[11] = 0;
        out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
        out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
        out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
        out[15] = 1;
        return out;
      };
      mat4.fromQuat = function(out, q) {
        var x = q[0],
            y = q[1],
            z = q[2],
            w = q[3],
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,
            xx = x * x2,
            yx = y * x2,
            yy = y * y2,
            zx = z * x2,
            zy = z * y2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;
        out[0] = 1 - yy - zz;
        out[1] = yx + wz;
        out[2] = zx - wy;
        out[3] = 0;
        out[4] = yx - wz;
        out[5] = 1 - xx - zz;
        out[6] = zy + wx;
        out[7] = 0;
        out[8] = zx + wy;
        out[9] = zy - wx;
        out[10] = 1 - xx - yy;
        out[11] = 0;
        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;
        return out;
      };
      mat4.frustum = function(out, left, right, bottom, top, near, far) {
        var rl = 1 / (right - left),
            tb = 1 / (top - bottom),
            nf = 1 / (near - far);
        out[0] = (near * 2) * rl;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = (near * 2) * tb;
        out[6] = 0;
        out[7] = 0;
        out[8] = (right + left) * rl;
        out[9] = (top + bottom) * tb;
        out[10] = (far + near) * nf;
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[14] = (far * near * 2) * nf;
        out[15] = 0;
        return out;
      };
      mat4.perspective = function(out, fovy, aspect, near, far) {
        var f = 1.0 / Math.tan(fovy / 2),
            nf = 1 / (near - far);
        out[0] = f / aspect;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = f;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = (far + near) * nf;
        out[11] = -1;
        out[12] = 0;
        out[13] = 0;
        out[14] = (2 * far * near) * nf;
        out[15] = 0;
        return out;
      };
      mat4.perspectiveFromFieldOfView = function(out, fov, near, far) {
        var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0),
            downTan = Math.tan(fov.downDegrees * Math.PI / 180.0),
            leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0),
            rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0),
            xScale = 2.0 / (leftTan + rightTan),
            yScale = 2.0 / (upTan + downTan);
        out[0] = xScale;
        out[1] = 0.0;
        out[2] = 0.0;
        out[3] = 0.0;
        out[4] = 0.0;
        out[5] = yScale;
        out[6] = 0.0;
        out[7] = 0.0;
        out[8] = -((leftTan - rightTan) * xScale * 0.5);
        out[9] = ((upTan - downTan) * yScale * 0.5);
        out[10] = far / (near - far);
        out[11] = -1.0;
        out[12] = 0.0;
        out[13] = 0.0;
        out[14] = (far * near) / (near - far);
        out[15] = 0.0;
        return out;
      };
      mat4.ortho = function(out, left, right, bottom, top, near, far) {
        var lr = 1 / (left - right),
            bt = 1 / (bottom - top),
            nf = 1 / (near - far);
        out[0] = -2 * lr;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = -2 * bt;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 2 * nf;
        out[11] = 0;
        out[12] = (left + right) * lr;
        out[13] = (top + bottom) * bt;
        out[14] = (far + near) * nf;
        out[15] = 1;
        return out;
      };
      mat4.lookAt = function(out, eye, center, up) {
        var x0,
            x1,
            x2,
            y0,
            y1,
            y2,
            z0,
            z1,
            z2,
            len,
            eyex = eye[0],
            eyey = eye[1],
            eyez = eye[2],
            upx = up[0],
            upy = up[1],
            upz = up[2],
            centerx = center[0],
            centery = center[1],
            centerz = center[2];
        if (Math.abs(eyex - centerx) < glMatrix.EPSILON && Math.abs(eyey - centery) < glMatrix.EPSILON && Math.abs(eyez - centerz) < glMatrix.EPSILON) {
          return mat4.identity(out);
        }
        z0 = eyex - centerx;
        z1 = eyey - centery;
        z2 = eyez - centerz;
        len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;
        x0 = upy * z2 - upz * z1;
        x1 = upz * z0 - upx * z2;
        x2 = upx * z1 - upy * z0;
        len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
        if (!len) {
          x0 = 0;
          x1 = 0;
          x2 = 0;
        } else {
          len = 1 / len;
          x0 *= len;
          x1 *= len;
          x2 *= len;
        }
        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;
        len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
        if (!len) {
          y0 = 0;
          y1 = 0;
          y2 = 0;
        } else {
          len = 1 / len;
          y0 *= len;
          y1 *= len;
          y2 *= len;
        }
        out[0] = x0;
        out[1] = y0;
        out[2] = z0;
        out[3] = 0;
        out[4] = x1;
        out[5] = y1;
        out[6] = z1;
        out[7] = 0;
        out[8] = x2;
        out[9] = y2;
        out[10] = z2;
        out[11] = 0;
        out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
        out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
        out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
        out[15] = 1;
        return out;
      };
      mat4.str = function(a) {
        return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
      };
      mat4.frob = function(a) {
        return (Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2)));
      };
      module.exports = mat4;
    }, function(module, exports, __webpack_require__) {
      var glMatrix = __webpack_require__(1);
      var mat3 = __webpack_require__(4);
      var vec3 = __webpack_require__(7);
      var vec4 = __webpack_require__(8);
      var quat = {};
      quat.create = function() {
        var out = new glMatrix.ARRAY_TYPE(4);
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      };
      quat.rotationTo = (function() {
        var tmpvec3 = vec3.create();
        var xUnitVec3 = vec3.fromValues(1, 0, 0);
        var yUnitVec3 = vec3.fromValues(0, 1, 0);
        return function(out, a, b) {
          var dot = vec3.dot(a, b);
          if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
              vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
          } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
          } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
          }
        };
      })();
      quat.setAxes = (function() {
        var matr = mat3.create();
        return function(out, view, right, up) {
          matr[0] = right[0];
          matr[3] = right[1];
          matr[6] = right[2];
          matr[1] = up[0];
          matr[4] = up[1];
          matr[7] = up[2];
          matr[2] = -view[0];
          matr[5] = -view[1];
          matr[8] = -view[2];
          return quat.normalize(out, quat.fromMat3(out, matr));
        };
      })();
      quat.clone = vec4.clone;
      quat.fromValues = vec4.fromValues;
      quat.copy = vec4.copy;
      quat.set = vec4.set;
      quat.identity = function(out) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      };
      quat.setAxisAngle = function(out, axis, rad) {
        rad = rad * 0.5;
        var s = Math.sin(rad);
        out[0] = s * axis[0];
        out[1] = s * axis[1];
        out[2] = s * axis[2];
        out[3] = Math.cos(rad);
        return out;
      };
      quat.add = vec4.add;
      quat.multiply = function(out, a, b) {
        var ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3],
            bx = b[0],
            by = b[1],
            bz = b[2],
            bw = b[3];
        out[0] = ax * bw + aw * bx + ay * bz - az * by;
        out[1] = ay * bw + aw * by + az * bx - ax * bz;
        out[2] = az * bw + aw * bz + ax * by - ay * bx;
        out[3] = aw * bw - ax * bx - ay * by - az * bz;
        return out;
      };
      quat.mul = quat.multiply;
      quat.scale = vec4.scale;
      quat.rotateX = function(out, a, rad) {
        rad *= 0.5;
        var ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3],
            bx = Math.sin(rad),
            bw = Math.cos(rad);
        out[0] = ax * bw + aw * bx;
        out[1] = ay * bw + az * bx;
        out[2] = az * bw - ay * bx;
        out[3] = aw * bw - ax * bx;
        return out;
      };
      quat.rotateY = function(out, a, rad) {
        rad *= 0.5;
        var ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3],
            by = Math.sin(rad),
            bw = Math.cos(rad);
        out[0] = ax * bw - az * by;
        out[1] = ay * bw + aw * by;
        out[2] = az * bw + ax * by;
        out[3] = aw * bw - ay * by;
        return out;
      };
      quat.rotateZ = function(out, a, rad) {
        rad *= 0.5;
        var ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3],
            bz = Math.sin(rad),
            bw = Math.cos(rad);
        out[0] = ax * bw + ay * bz;
        out[1] = ay * bw - ax * bz;
        out[2] = az * bw + aw * bz;
        out[3] = aw * bw - az * bz;
        return out;
      };
      quat.calculateW = function(out, a) {
        var x = a[0],
            y = a[1],
            z = a[2];
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
        return out;
      };
      quat.dot = vec4.dot;
      quat.lerp = vec4.lerp;
      quat.slerp = function(out, a, b, t) {
        var ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3],
            bx = b[0],
            by = b[1],
            bz = b[2],
            bw = b[3];
        var omega,
            cosom,
            sinom,
            scale0,
            scale1;
        cosom = ax * bx + ay * by + az * bz + aw * bw;
        if (cosom < 0.0) {
          cosom = -cosom;
          bx = -bx;
          by = -by;
          bz = -bz;
          bw = -bw;
        }
        if ((1.0 - cosom) > 0.000001) {
          omega = Math.acos(cosom);
          sinom = Math.sin(omega);
          scale0 = Math.sin((1.0 - t) * omega) / sinom;
          scale1 = Math.sin(t * omega) / sinom;
        } else {
          scale0 = 1.0 - t;
          scale1 = t;
        }
        out[0] = scale0 * ax + scale1 * bx;
        out[1] = scale0 * ay + scale1 * by;
        out[2] = scale0 * az + scale1 * bz;
        out[3] = scale0 * aw + scale1 * bw;
        return out;
      };
      quat.sqlerp = (function() {
        var temp1 = quat.create();
        var temp2 = quat.create();
        return function(out, a, b, c, d, t) {
          quat.slerp(temp1, a, d, t);
          quat.slerp(temp2, b, c, t);
          quat.slerp(out, temp1, temp2, 2 * t * (1 - t));
          return out;
        };
      }());
      quat.invert = function(out, a) {
        var a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3],
            dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3,
            invDot = dot ? 1.0 / dot : 0;
        out[0] = -a0 * invDot;
        out[1] = -a1 * invDot;
        out[2] = -a2 * invDot;
        out[3] = a3 * invDot;
        return out;
      };
      quat.conjugate = function(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        out[3] = a[3];
        return out;
      };
      quat.length = vec4.length;
      quat.len = quat.length;
      quat.squaredLength = vec4.squaredLength;
      quat.sqrLen = quat.squaredLength;
      quat.normalize = vec4.normalize;
      quat.fromMat3 = function(out, m) {
        var fTrace = m[0] + m[4] + m[8];
        var fRoot;
        if (fTrace > 0.0) {
          fRoot = Math.sqrt(fTrace + 1.0);
          out[3] = 0.5 * fRoot;
          fRoot = 0.5 / fRoot;
          out[0] = (m[5] - m[7]) * fRoot;
          out[1] = (m[6] - m[2]) * fRoot;
          out[2] = (m[1] - m[3]) * fRoot;
        } else {
          var i = 0;
          if (m[4] > m[0])
            i = 1;
          if (m[8] > m[i * 3 + i])
            i = 2;
          var j = (i + 1) % 3;
          var k = (i + 2) % 3;
          fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
          out[i] = 0.5 * fRoot;
          fRoot = 0.5 / fRoot;
          out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
          out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
          out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
        }
        return out;
      };
      quat.str = function(a) {
        return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
      };
      module.exports = quat;
    }, function(module, exports, __webpack_require__) {
      var glMatrix = __webpack_require__(1);
      var vec3 = {};
      vec3.create = function() {
        var out = new glMatrix.ARRAY_TYPE(3);
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        return out;
      };
      vec3.clone = function(a) {
        var out = new glMatrix.ARRAY_TYPE(3);
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        return out;
      };
      vec3.fromValues = function(x, y, z) {
        var out = new glMatrix.ARRAY_TYPE(3);
        out[0] = x;
        out[1] = y;
        out[2] = z;
        return out;
      };
      vec3.copy = function(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        return out;
      };
      vec3.set = function(out, x, y, z) {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        return out;
      };
      vec3.add = function(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        return out;
      };
      vec3.subtract = function(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];
        return out;
      };
      vec3.sub = vec3.subtract;
      vec3.multiply = function(out, a, b) {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        out[2] = a[2] * b[2];
        return out;
      };
      vec3.mul = vec3.multiply;
      vec3.divide = function(out, a, b) {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        out[2] = a[2] / b[2];
        return out;
      };
      vec3.div = vec3.divide;
      vec3.min = function(out, a, b) {
        out[0] = Math.min(a[0], b[0]);
        out[1] = Math.min(a[1], b[1]);
        out[2] = Math.min(a[2], b[2]);
        return out;
      };
      vec3.max = function(out, a, b) {
        out[0] = Math.max(a[0], b[0]);
        out[1] = Math.max(a[1], b[1]);
        out[2] = Math.max(a[2], b[2]);
        return out;
      };
      vec3.scale = function(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        return out;
      };
      vec3.scaleAndAdd = function(out, a, b, scale) {
        out[0] = a[0] + (b[0] * scale);
        out[1] = a[1] + (b[1] * scale);
        out[2] = a[2] + (b[2] * scale);
        return out;
      };
      vec3.distance = function(a, b) {
        var x = b[0] - a[0],
            y = b[1] - a[1],
            z = b[2] - a[2];
        return Math.sqrt(x * x + y * y + z * z);
      };
      vec3.dist = vec3.distance;
      vec3.squaredDistance = function(a, b) {
        var x = b[0] - a[0],
            y = b[1] - a[1],
            z = b[2] - a[2];
        return x * x + y * y + z * z;
      };
      vec3.sqrDist = vec3.squaredDistance;
      vec3.length = function(a) {
        var x = a[0],
            y = a[1],
            z = a[2];
        return Math.sqrt(x * x + y * y + z * z);
      };
      vec3.len = vec3.length;
      vec3.squaredLength = function(a) {
        var x = a[0],
            y = a[1],
            z = a[2];
        return x * x + y * y + z * z;
      };
      vec3.sqrLen = vec3.squaredLength;
      vec3.negate = function(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        return out;
      };
      vec3.inverse = function(out, a) {
        out[0] = 1.0 / a[0];
        out[1] = 1.0 / a[1];
        out[2] = 1.0 / a[2];
        return out;
      };
      vec3.normalize = function(out, a) {
        var x = a[0],
            y = a[1],
            z = a[2];
        var len = x * x + y * y + z * z;
        if (len > 0) {
          len = 1 / Math.sqrt(len);
          out[0] = a[0] * len;
          out[1] = a[1] * len;
          out[2] = a[2] * len;
        }
        return out;
      };
      vec3.dot = function(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      };
      vec3.cross = function(out, a, b) {
        var ax = a[0],
            ay = a[1],
            az = a[2],
            bx = b[0],
            by = b[1],
            bz = b[2];
        out[0] = ay * bz - az * by;
        out[1] = az * bx - ax * bz;
        out[2] = ax * by - ay * bx;
        return out;
      };
      vec3.lerp = function(out, a, b, t) {
        var ax = a[0],
            ay = a[1],
            az = a[2];
        out[0] = ax + t * (b[0] - ax);
        out[1] = ay + t * (b[1] - ay);
        out[2] = az + t * (b[2] - az);
        return out;
      };
      vec3.hermite = function(out, a, b, c, d, t) {
        var factorTimes2 = t * t,
            factor1 = factorTimes2 * (2 * t - 3) + 1,
            factor2 = factorTimes2 * (t - 2) + t,
            factor3 = factorTimes2 * (t - 1),
            factor4 = factorTimes2 * (3 - 2 * t);
        out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
        out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
        out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
        return out;
      };
      vec3.bezier = function(out, a, b, c, d, t) {
        var inverseFactor = 1 - t,
            inverseFactorTimesTwo = inverseFactor * inverseFactor,
            factorTimes2 = t * t,
            factor1 = inverseFactorTimesTwo * inverseFactor,
            factor2 = 3 * t * inverseFactorTimesTwo,
            factor3 = 3 * factorTimes2 * inverseFactor,
            factor4 = factorTimes2 * t;
        out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
        out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
        out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
        return out;
      };
      vec3.random = function(out, scale) {
        scale = scale || 1.0;
        var r = glMatrix.RANDOM() * 2.0 * Math.PI;
        var z = (glMatrix.RANDOM() * 2.0) - 1.0;
        var zScale = Math.sqrt(1.0 - z * z) * scale;
        out[0] = Math.cos(r) * zScale;
        out[1] = Math.sin(r) * zScale;
        out[2] = z * scale;
        return out;
      };
      vec3.transformMat4 = function(out, a, m) {
        var x = a[0],
            y = a[1],
            z = a[2],
            w = m[3] * x + m[7] * y + m[11] * z + m[15];
        w = w || 1.0;
        out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
        out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
        out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
        return out;
      };
      vec3.transformMat3 = function(out, a, m) {
        var x = a[0],
            y = a[1],
            z = a[2];
        out[0] = x * m[0] + y * m[3] + z * m[6];
        out[1] = x * m[1] + y * m[4] + z * m[7];
        out[2] = x * m[2] + y * m[5] + z * m[8];
        return out;
      };
      vec3.transformQuat = function(out, a, q) {
        var x = a[0],
            y = a[1],
            z = a[2],
            qx = q[0],
            qy = q[1],
            qz = q[2],
            qw = q[3],
            ix = qw * x + qy * z - qz * y,
            iy = qw * y + qz * x - qx * z,
            iz = qw * z + qx * y - qy * x,
            iw = -qx * x - qy * y - qz * z;
        out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        return out;
      };
      vec3.rotateX = function(out, a, b, c) {
        var p = [],
            r = [];
        p[0] = a[0] - b[0];
        p[1] = a[1] - b[1];
        p[2] = a[2] - b[2];
        r[0] = p[0];
        r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
        r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);
        out[0] = r[0] + b[0];
        out[1] = r[1] + b[1];
        out[2] = r[2] + b[2];
        return out;
      };
      vec3.rotateY = function(out, a, b, c) {
        var p = [],
            r = [];
        p[0] = a[0] - b[0];
        p[1] = a[1] - b[1];
        p[2] = a[2] - b[2];
        r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
        r[1] = p[1];
        r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);
        out[0] = r[0] + b[0];
        out[1] = r[1] + b[1];
        out[2] = r[2] + b[2];
        return out;
      };
      vec3.rotateZ = function(out, a, b, c) {
        var p = [],
            r = [];
        p[0] = a[0] - b[0];
        p[1] = a[1] - b[1];
        p[2] = a[2] - b[2];
        r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
        r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
        r[2] = p[2];
        out[0] = r[0] + b[0];
        out[1] = r[1] + b[1];
        out[2] = r[2] + b[2];
        return out;
      };
      vec3.forEach = (function() {
        var vec = vec3.create();
        return function(a, stride, offset, count, fn, arg) {
          var i,
              l;
          if (!stride) {
            stride = 3;
          }
          if (!offset) {
            offset = 0;
          }
          if (count) {
            l = Math.min((count * stride) + offset, a.length);
          } else {
            l = a.length;
          }
          for (i = offset; i < l; i += stride) {
            vec[0] = a[i];
            vec[1] = a[i + 1];
            vec[2] = a[i + 2];
            fn(vec, vec, arg);
            a[i] = vec[0];
            a[i + 1] = vec[1];
            a[i + 2] = vec[2];
          }
          return a;
        };
      })();
      vec3.angle = function(a, b) {
        var tempA = vec3.fromValues(a[0], a[1], a[2]);
        var tempB = vec3.fromValues(b[0], b[1], b[2]);
        vec3.normalize(tempA, tempA);
        vec3.normalize(tempB, tempB);
        var cosine = vec3.dot(tempA, tempB);
        if (cosine > 1.0) {
          return 0;
        } else {
          return Math.acos(cosine);
        }
      };
      vec3.str = function(a) {
        return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
      };
      module.exports = vec3;
    }, function(module, exports, __webpack_require__) {
      var glMatrix = __webpack_require__(1);
      var vec4 = {};
      vec4.create = function() {
        var out = new glMatrix.ARRAY_TYPE(4);
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        return out;
      };
      vec4.clone = function(a) {
        var out = new glMatrix.ARRAY_TYPE(4);
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
      };
      vec4.fromValues = function(x, y, z, w) {
        var out = new glMatrix.ARRAY_TYPE(4);
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = w;
        return out;
      };
      vec4.copy = function(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
      };
      vec4.set = function(out, x, y, z, w) {
        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = w;
        return out;
      };
      vec4.add = function(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        out[3] = a[3] + b[3];
        return out;
      };
      vec4.subtract = function(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];
        out[3] = a[3] - b[3];
        return out;
      };
      vec4.sub = vec4.subtract;
      vec4.multiply = function(out, a, b) {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        out[2] = a[2] * b[2];
        out[3] = a[3] * b[3];
        return out;
      };
      vec4.mul = vec4.multiply;
      vec4.divide = function(out, a, b) {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        out[2] = a[2] / b[2];
        out[3] = a[3] / b[3];
        return out;
      };
      vec4.div = vec4.divide;
      vec4.min = function(out, a, b) {
        out[0] = Math.min(a[0], b[0]);
        out[1] = Math.min(a[1], b[1]);
        out[2] = Math.min(a[2], b[2]);
        out[3] = Math.min(a[3], b[3]);
        return out;
      };
      vec4.max = function(out, a, b) {
        out[0] = Math.max(a[0], b[0]);
        out[1] = Math.max(a[1], b[1]);
        out[2] = Math.max(a[2], b[2]);
        out[3] = Math.max(a[3], b[3]);
        return out;
      };
      vec4.scale = function(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        out[3] = a[3] * b;
        return out;
      };
      vec4.scaleAndAdd = function(out, a, b, scale) {
        out[0] = a[0] + (b[0] * scale);
        out[1] = a[1] + (b[1] * scale);
        out[2] = a[2] + (b[2] * scale);
        out[3] = a[3] + (b[3] * scale);
        return out;
      };
      vec4.distance = function(a, b) {
        var x = b[0] - a[0],
            y = b[1] - a[1],
            z = b[2] - a[2],
            w = b[3] - a[3];
        return Math.sqrt(x * x + y * y + z * z + w * w);
      };
      vec4.dist = vec4.distance;
      vec4.squaredDistance = function(a, b) {
        var x = b[0] - a[0],
            y = b[1] - a[1],
            z = b[2] - a[2],
            w = b[3] - a[3];
        return x * x + y * y + z * z + w * w;
      };
      vec4.sqrDist = vec4.squaredDistance;
      vec4.length = function(a) {
        var x = a[0],
            y = a[1],
            z = a[2],
            w = a[3];
        return Math.sqrt(x * x + y * y + z * z + w * w);
      };
      vec4.len = vec4.length;
      vec4.squaredLength = function(a) {
        var x = a[0],
            y = a[1],
            z = a[2],
            w = a[3];
        return x * x + y * y + z * z + w * w;
      };
      vec4.sqrLen = vec4.squaredLength;
      vec4.negate = function(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        out[3] = -a[3];
        return out;
      };
      vec4.inverse = function(out, a) {
        out[0] = 1.0 / a[0];
        out[1] = 1.0 / a[1];
        out[2] = 1.0 / a[2];
        out[3] = 1.0 / a[3];
        return out;
      };
      vec4.normalize = function(out, a) {
        var x = a[0],
            y = a[1],
            z = a[2],
            w = a[3];
        var len = x * x + y * y + z * z + w * w;
        if (len > 0) {
          len = 1 / Math.sqrt(len);
          out[0] = x * len;
          out[1] = y * len;
          out[2] = z * len;
          out[3] = w * len;
        }
        return out;
      };
      vec4.dot = function(a, b) {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
      };
      vec4.lerp = function(out, a, b, t) {
        var ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3];
        out[0] = ax + t * (b[0] - ax);
        out[1] = ay + t * (b[1] - ay);
        out[2] = az + t * (b[2] - az);
        out[3] = aw + t * (b[3] - aw);
        return out;
      };
      vec4.random = function(out, scale) {
        scale = scale || 1.0;
        out[0] = glMatrix.RANDOM();
        out[1] = glMatrix.RANDOM();
        out[2] = glMatrix.RANDOM();
        out[3] = glMatrix.RANDOM();
        vec4.normalize(out, out);
        vec4.scale(out, out, scale);
        return out;
      };
      vec4.transformMat4 = function(out, a, m) {
        var x = a[0],
            y = a[1],
            z = a[2],
            w = a[3];
        out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
        out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
        out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
        out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
        return out;
      };
      vec4.transformQuat = function(out, a, q) {
        var x = a[0],
            y = a[1],
            z = a[2],
            qx = q[0],
            qy = q[1],
            qz = q[2],
            qw = q[3],
            ix = qw * x + qy * z - qz * y,
            iy = qw * y + qz * x - qx * z,
            iz = qw * z + qx * y - qy * x,
            iw = -qx * x - qy * y - qz * z;
        out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        out[3] = a[3];
        return out;
      };
      vec4.forEach = (function() {
        var vec = vec4.create();
        return function(a, stride, offset, count, fn, arg) {
          var i,
              l;
          if (!stride) {
            stride = 4;
          }
          if (!offset) {
            offset = 0;
          }
          if (count) {
            l = Math.min((count * stride) + offset, a.length);
          } else {
            l = a.length;
          }
          for (i = offset; i < l; i += stride) {
            vec[0] = a[i];
            vec[1] = a[i + 1];
            vec[2] = a[i + 2];
            vec[3] = a[i + 3];
            fn(vec, vec, arg);
            a[i] = vec[0];
            a[i + 1] = vec[1];
            a[i + 2] = vec[2];
            a[i + 3] = vec[3];
          }
          return a;
        };
      })();
      vec4.str = function(a) {
        return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
      };
      module.exports = vec4;
    }, function(module, exports, __webpack_require__) {
      var glMatrix = __webpack_require__(1);
      var vec2 = {};
      vec2.create = function() {
        var out = new glMatrix.ARRAY_TYPE(2);
        out[0] = 0;
        out[1] = 0;
        return out;
      };
      vec2.clone = function(a) {
        var out = new glMatrix.ARRAY_TYPE(2);
        out[0] = a[0];
        out[1] = a[1];
        return out;
      };
      vec2.fromValues = function(x, y) {
        var out = new glMatrix.ARRAY_TYPE(2);
        out[0] = x;
        out[1] = y;
        return out;
      };
      vec2.copy = function(out, a) {
        out[0] = a[0];
        out[1] = a[1];
        return out;
      };
      vec2.set = function(out, x, y) {
        out[0] = x;
        out[1] = y;
        return out;
      };
      vec2.add = function(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        return out;
      };
      vec2.subtract = function(out, a, b) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        return out;
      };
      vec2.sub = vec2.subtract;
      vec2.multiply = function(out, a, b) {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        return out;
      };
      vec2.mul = vec2.multiply;
      vec2.divide = function(out, a, b) {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        return out;
      };
      vec2.div = vec2.divide;
      vec2.min = function(out, a, b) {
        out[0] = Math.min(a[0], b[0]);
        out[1] = Math.min(a[1], b[1]);
        return out;
      };
      vec2.max = function(out, a, b) {
        out[0] = Math.max(a[0], b[0]);
        out[1] = Math.max(a[1], b[1]);
        return out;
      };
      vec2.scale = function(out, a, b) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        return out;
      };
      vec2.scaleAndAdd = function(out, a, b, scale) {
        out[0] = a[0] + (b[0] * scale);
        out[1] = a[1] + (b[1] * scale);
        return out;
      };
      vec2.distance = function(a, b) {
        var x = b[0] - a[0],
            y = b[1] - a[1];
        return Math.sqrt(x * x + y * y);
      };
      vec2.dist = vec2.distance;
      vec2.squaredDistance = function(a, b) {
        var x = b[0] - a[0],
            y = b[1] - a[1];
        return x * x + y * y;
      };
      vec2.sqrDist = vec2.squaredDistance;
      vec2.length = function(a) {
        var x = a[0],
            y = a[1];
        return Math.sqrt(x * x + y * y);
      };
      vec2.len = vec2.length;
      vec2.squaredLength = function(a) {
        var x = a[0],
            y = a[1];
        return x * x + y * y;
      };
      vec2.sqrLen = vec2.squaredLength;
      vec2.negate = function(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        return out;
      };
      vec2.inverse = function(out, a) {
        out[0] = 1.0 / a[0];
        out[1] = 1.0 / a[1];
        return out;
      };
      vec2.normalize = function(out, a) {
        var x = a[0],
            y = a[1];
        var len = x * x + y * y;
        if (len > 0) {
          len = 1 / Math.sqrt(len);
          out[0] = a[0] * len;
          out[1] = a[1] * len;
        }
        return out;
      };
      vec2.dot = function(a, b) {
        return a[0] * b[0] + a[1] * b[1];
      };
      vec2.cross = function(out, a, b) {
        var z = a[0] * b[1] - a[1] * b[0];
        out[0] = out[1] = 0;
        out[2] = z;
        return out;
      };
      vec2.lerp = function(out, a, b, t) {
        var ax = a[0],
            ay = a[1];
        out[0] = ax + t * (b[0] - ax);
        out[1] = ay + t * (b[1] - ay);
        return out;
      };
      vec2.random = function(out, scale) {
        scale = scale || 1.0;
        var r = glMatrix.RANDOM() * 2.0 * Math.PI;
        out[0] = Math.cos(r) * scale;
        out[1] = Math.sin(r) * scale;
        return out;
      };
      vec2.transformMat2 = function(out, a, m) {
        var x = a[0],
            y = a[1];
        out[0] = m[0] * x + m[2] * y;
        out[1] = m[1] * x + m[3] * y;
        return out;
      };
      vec2.transformMat2d = function(out, a, m) {
        var x = a[0],
            y = a[1];
        out[0] = m[0] * x + m[2] * y + m[4];
        out[1] = m[1] * x + m[3] * y + m[5];
        return out;
      };
      vec2.transformMat3 = function(out, a, m) {
        var x = a[0],
            y = a[1];
        out[0] = m[0] * x + m[3] * y + m[6];
        out[1] = m[1] * x + m[4] * y + m[7];
        return out;
      };
      vec2.transformMat4 = function(out, a, m) {
        var x = a[0],
            y = a[1];
        out[0] = m[0] * x + m[4] * y + m[12];
        out[1] = m[1] * x + m[5] * y + m[13];
        return out;
      };
      vec2.forEach = (function() {
        var vec = vec2.create();
        return function(a, stride, offset, count, fn, arg) {
          var i,
              l;
          if (!stride) {
            stride = 2;
          }
          if (!offset) {
            offset = 0;
          }
          if (count) {
            l = Math.min((count * stride) + offset, a.length);
          } else {
            l = a.length;
          }
          for (i = offset; i < l; i += stride) {
            vec[0] = a[i];
            vec[1] = a[i + 1];
            fn(vec, vec, arg);
            a[i] = vec[0];
            a[i + 1] = vec[1];
          }
          return a;
        };
      })();
      vec2.str = function(a) {
        return 'vec2(' + a[0] + ', ' + a[1] + ')';
      };
      module.exports = vec2;
    }]);
  });
  var mat3 = module.exports.mat3;
  var mat4 = module.exports.mat4;
  var vec2 = module.exports.vec2;
  var vec3 = module.exports.vec3;
  return {
    get mat3() {
      return mat3;
    },
    get mat4() {
      return mat4;
    },
    get vec2() {
      return vec2;
    },
    get vec3() {
      return vec3;
    },
    __esModule: true
  };
}.call(Reflect.global);

},{}],28:[function(require,module,exports){
"use strict";
function UUIDjs() {}
;
UUIDjs.maxFromBits = function(bits) {
  return Math.pow(2, bits);
};
UUIDjs.limitUI04 = UUIDjs.maxFromBits(4);
UUIDjs.limitUI06 = UUIDjs.maxFromBits(6);
UUIDjs.limitUI08 = UUIDjs.maxFromBits(8);
UUIDjs.limitUI12 = UUIDjs.maxFromBits(12);
UUIDjs.limitUI14 = UUIDjs.maxFromBits(14);
UUIDjs.limitUI16 = UUIDjs.maxFromBits(16);
UUIDjs.limitUI32 = UUIDjs.maxFromBits(32);
UUIDjs.limitUI40 = UUIDjs.maxFromBits(40);
UUIDjs.limitUI48 = UUIDjs.maxFromBits(48);
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
UUIDjs.randomUI04 = function() {
  return getRandomInt(0, UUIDjs.limitUI04 - 1);
};
UUIDjs.randomUI06 = function() {
  return getRandomInt(0, UUIDjs.limitUI06 - 1);
};
UUIDjs.randomUI08 = function() {
  return getRandomInt(0, UUIDjs.limitUI08 - 1);
};
UUIDjs.randomUI12 = function() {
  return getRandomInt(0, UUIDjs.limitUI12 - 1);
};
UUIDjs.randomUI14 = function() {
  return getRandomInt(0, UUIDjs.limitUI14 - 1);
};
UUIDjs.randomUI16 = function() {
  return getRandomInt(0, UUIDjs.limitUI16 - 1);
};
UUIDjs.randomUI32 = function() {
  return getRandomInt(0, UUIDjs.limitUI32 - 1);
};
UUIDjs.randomUI40 = function() {
  return (0 | Math.random() * (1 << 30)) + (0 | Math.random() * (1 << 40 - 30)) * (1 << 30);
};
UUIDjs.randomUI48 = function() {
  return (0 | Math.random() * (1 << 30)) + (0 | Math.random() * (1 << 48 - 30)) * (1 << 30);
};
UUIDjs.paddedString = function(string, length, z) {
  string = String(string);
  z = (!z) ? '0' : z;
  var i = length - string.length;
  for (; i > 0; i >>>= 1, z += z) {
    if (i & 1) {
      string = z + string;
    }
  }
  return string;
};
UUIDjs.prototype.fromParts = function(timeLow, timeMid, timeHiAndVersion, clockSeqHiAndReserved, clockSeqLow, node) {
  this.version = (timeHiAndVersion >> 12) & 0xF;
  this.hex = UUIDjs.paddedString(timeLow.toString(16), 8) + '-' + UUIDjs.paddedString(timeMid.toString(16), 4) + '-' + UUIDjs.paddedString(timeHiAndVersion.toString(16), 4) + '-' + UUIDjs.paddedString(clockSeqHiAndReserved.toString(16), 2) + UUIDjs.paddedString(clockSeqLow.toString(16), 2) + '-' + UUIDjs.paddedString(node.toString(16), 12);
  return this;
};
UUIDjs.prototype.toString = function() {
  return this.hex;
};
UUIDjs.prototype.toURN = function() {
  return 'urn:uuid:' + this.hex;
};
UUIDjs.prototype.toBytes = function() {
  var parts = this.hex.split('-');
  var ints = [];
  var intPos = 0;
  for (var i = 0; i < parts.length; i++) {
    for (var j = 0; j < parts[i].length; j += 2) {
      ints[intPos++] = parseInt(parts[i].substr(j, 2), 16);
    }
  }
  return ints;
};
UUIDjs.prototype.equals = function(uuid) {
  if (!(uuid instanceof UUID)) {
    return false;
  }
  if (this.hex !== uuid.hex) {
    return false;
  }
  return true;
};
UUIDjs.getTimeFieldValues = function(time) {
  var ts = time - Date.UTC(1582, 9, 15);
  var hm = ((ts / 0x100000000) * 10000) & 0xFFFFFFF;
  return {
    low: ((ts & 0xFFFFFFF) * 10000) % 0x100000000,
    mid: hm & 0xFFFF,
    hi: hm >>> 16,
    timestamp: ts
  };
};
UUIDjs._create4 = function() {
  return new UUIDjs().fromParts(UUIDjs.randomUI32(), UUIDjs.randomUI16(), 0x4000 | UUIDjs.randomUI12(), 0x80 | UUIDjs.randomUI06(), UUIDjs.randomUI08(), UUIDjs.randomUI48());
};
UUIDjs._create1 = function() {
  var now = new Date().getTime();
  var sequence = UUIDjs.randomUI14();
  var node = (UUIDjs.randomUI08() | 1) * 0x10000000000 + UUIDjs.randomUI40();
  var tick = UUIDjs.randomUI04();
  var timestamp = 0;
  var timestampRatio = 1 / 4;
  if (now != timestamp) {
    if (now < timestamp) {
      sequence++;
    }
    timestamp = now;
    tick = UUIDjs.randomUI04();
  } else if (Math.random() < timestampRatio && tick < 9984) {
    tick += 1 + UUIDjs.randomUI04();
  } else {
    sequence++;
  }
  var tf = UUIDjs.getTimeFieldValues(timestamp);
  var tl = tf.low + tick;
  var thav = (tf.hi & 0xFFF) | 0x1000;
  sequence &= 0x3FFF;
  var cshar = (sequence >>> 8) | 0x80;
  var csl = sequence & 0xFF;
  return new UUIDjs().fromParts(tl, tf.mid, thav, cshar, csl, node);
};
UUIDjs.create = function(version) {
  version = version || 4;
  return this['_create' + version]();
};
UUIDjs.fromTime = function(time, last) {
  last = (!last) ? false : last;
  var tf = UUIDjs.getTimeFieldValues(time);
  var tl = tf.low;
  var thav = (tf.hi & 0xFFF) | 0x1000;
  if (last === false) {
    return new UUIDjs().fromParts(tl, tf.mid, thav, 0, 0, 0);
  } else {
    return new UUIDjs().fromParts(tl, tf.mid, thav, 0x80 | UUIDjs.limitUI06, UUIDjs.limitUI08 - 1, UUIDjs.limitUI48 - 1);
  }
};
UUIDjs.firstFromTime = function(time) {
  return UUIDjs.fromTime(time, false);
};
UUIDjs.lastFromTime = function(time) {
  return UUIDjs.fromTime(time, true);
};
UUIDjs.fromURN = function(strId) {
  var r,
      p = /^(?:urn:uuid:|\{)?([0-9a-f]{8})-([0-9a-f]{4})-([0-9a-f]{4})-([0-9a-f]{2})([0-9a-f]{2})-([0-9a-f]{12})(?:\})?$/i;
  if ((r = p.exec(strId))) {
    return new UUIDjs().fromParts(parseInt(r[1], 16), parseInt(r[2], 16), parseInt(r[3], 16), parseInt(r[4], 16), parseInt(r[5], 16), parseInt(r[6], 16));
  }
  return null;
};
UUIDjs.fromBytes = function(ints) {
  if (ints.length < 5) {
    return null;
  }
  var str = '';
  var pos = 0;
  var parts = [4, 2, 2, 2, 6];
  for (var i = 0; i < parts.length; i++) {
    for (var j = 0; j < parts[i]; j++) {
      var octet = ints[pos++].toString(16);
      if (octet.length == 1) {
        octet = '0' + octet;
      }
      str += octet;
    }
    if (parts[i] !== 6) {
      str += '-';
    }
  }
  return UUIDjs.fromURN(str);
};
UUIDjs.fromBinary = function(binary) {
  var ints = [];
  for (var i = 0; i < binary.length; i++) {
    ints[i] = binary.charCodeAt(i);
    if (ints[i] > 255 || ints[i] < 0) {
      throw new Error('Unexpected byte in binary data.');
    }
  }
  return UUIDjs.fromBytes(ints);
};
UUIDjs['new'] = function() {
  return this.create(4);
};
UUIDjs.newTS = function() {
  return this.create(1);
};
module.exports = UUIDjs;

},{}],29:[function(require,module,exports){
"use strict";
var randomRange = function(begin, end) {
  return (Math.random() * (end - begin)) + begin;
};
Object.defineProperties(module.exports, {
  randomRange: {get: function() {
      return randomRange;
    }},
  __esModule: {value: true}
});

},{}],30:[function(require,module,exports){
"use strict";
var $__events__,
    $__Session__;
var EventEmitter = ($__events__ = require("events"), $__events__ && $__events__.__esModule && $__events__ || {default: $__events__}).default;
var Session = ($__Session__ = require("./Session"), $__Session__ && $__Session__.__esModule && $__Session__ || {default: $__Session__}).default;
var Network = function($__super) {
  function Network(name, key) {
    var $__4,
        $__5;
    $traceurRuntime.superConstructor(Network).call(this);
    this.peerId = null;
    this.peer = new Peer(name, {key: key});
    this.sessions = {};
    var builder = {};
    this.peer.on("open", ($__4 = this, function(id) {
      console.info("Peerjs ID : " + id);
      $__4.peerId = id;
      $__4.emit("open", id);
    }));
    this.peer.on("connection", ($__5 = this, function(conn) {
      var peer = conn.peer;
      if (!builder[peer])
        builder[peer] = {};
      var built = builder[peer];
      conn.once("data", function(data) {
        built[data.connectionType] = conn;
        if (built.reliable && built.unreliable) {
          var session = new Session(peer, built.reliable, built.unreliable);
          $__5.addSession(session);
          $__5.emit("connection", session);
        }
      });
      conn.on("close", function() {
        var session = $__5.sessions[peer];
        delete $__5.sessions[peer];
        if (session) {
          session.reliable.close();
          session.unreliable.close();
          $__5.emit("close", session);
        }
      });
    }));
  }
  return ($traceurRuntime.createClass)(Network, {
    addSession: function(session) {
      var $__4 = this;
      this.sessions[session.key] = session;
      session.on("data", function(data) {
        $__4.emit(data.event, {
          session: session,
          packet: data
        });
      });
    },
    emitReliable: function(event, data) {
      var packet = {
        event: event,
        timestamp: Date.now(),
        data: data
      };
      for (var key in this.sessions) {
        this.sessions[key].reliable.send(packet);
      }
    },
    emitUnreliable: function(event, data) {
      var packet = {
        event: event,
        timestamp: Date.now(),
        data: data
      };
      for (var key in this.sessions) {
        this.sessions[key].unreliable.send(packet);
      }
    },
    createSession: function(name) {
      var $__4 = this;
      return new Promise(function(resolve, reject) {
        var peer = $__4.peer;
        var reliable = peer.connect(name, {
          reliable: true,
          ordered: true
        });
        var unreliable = peer.connect(name, {
          reliable: false,
          ordered: false
        });
        var loaded = 0;
        var tryResolve = function() {
          loaded++;
          if (loaded == 2) {
            var session = new Session(peer, reliable, unreliable);
            $__4.addSession(session);
            resolve(session);
          }
        };
        var fail = function(err) {
          reject(err);
        };
        reliable.once("open", function() {
          reliable.send({connectionType: "reliable"});
          tryResolve();
        });
        unreliable.once("open", function() {
          unreliable.send({connectionType: "unreliable"});
          tryResolve();
        });
        reliable.once("err", fail);
        unreliable.once("error", fail);
      });
    }
  }, {}, $__super);
}(EventEmitter);
var $__default = Network;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"./Session":31,"events":36}],31:[function(require,module,exports){
"use strict";
var $__events__;
var EventEmitter = ($__events__ = require("events"), $__events__ && $__events__.__esModule && $__events__ || {default: $__events__}).default;
var Session = function($__super) {
  function Session(key, reliable, unreliable) {
    var $__3,
        $__4;
    $traceurRuntime.superConstructor(Session).call(this);
    this.key = key;
    this.reliable = reliable;
    this.unreliable = unreliable;
    this.reliable.on("data", ($__3 = this, function(data) {
      $__3.emit("data", data);
    }));
    this.unreliable.on("data", ($__4 = this, function(data) {
      $__4.emit("data", data);
    }));
  }
  return ($traceurRuntime.createClass)(Session, {emitReliable: function(event, data) {
      var packet = {
        event: event,
        timestamp: Date.now(),
        data: data
      };
      this.reliable.send(packet);
    }}, {}, $__super);
}(EventEmitter);
var $__default = Session;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"events":36}],32:[function(require,module,exports){
"use strict";
var request = function(type, url, progress, data) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("progress", progress);
    xhr.addEventListener("load", resolve);
    xhr.addEventListener("error", reject);
    xhr.open(type, url);
    xhr.send(data);
  });
};
var get = function(url, async, progress) {
  return request("GET", url, progress, null);
};
var post = function(url, async, progress, data) {
  return request("POST", url, progress, data);
};
Object.defineProperties(module.exports, {
  get: {get: function() {
      return get;
    }},
  post: {get: function() {
      return post;
    }},
  request: {get: function() {
      return request;
    }},
  __esModule: {value: true}
});

},{}],33:[function(require,module,exports){
"use strict";
var $__engine_47_core_47_Process__;
var Process = ($__engine_47_core_47_Process__ = require("engine/core/Process"), $__engine_47_core_47_Process__ && $__engine_47_core_47_Process__.__esModule && $__engine_47_core_47_Process__ || {default: $__engine_47_core_47_Process__}).default;
var Interval = function($__super) {
  function Interval(cb, interval) {
    $traceurRuntime.superConstructor(Interval).call(this);
    this.cb = cb;
    this.interval = interval;
    this.elapsed = 0;
  }
  return ($traceurRuntime.createClass)(Interval, {update: function(now, deltaMs) {
      this.elapsed += deltaMs;
      if (this.elapsed >= this.interval) {
        this.elapsed -= this.interval;
        this.cb();
      }
    }}, {}, $__super);
}(Process);
var $__default = Interval;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"engine/core/Process":17}],34:[function(require,module,exports){
"use strict";
var $__engine_47_core_47_Process__;
var Process = ($__engine_47_core_47_Process__ = require("engine/core/Process"), $__engine_47_core_47_Process__ && $__engine_47_core_47_Process__.__esModule && $__engine_47_core_47_Process__ || {default: $__engine_47_core_47_Process__}).default;
var Script = function($__super) {
  function Script(cb) {
    $traceurRuntime.superConstructor(Script).call(this);
    this.cb = cb;
  }
  return ($traceurRuntime.createClass)(Script, {update: function(now, deltaMs) {
      this.cb(now, deltaMs);
    }}, {}, $__super);
}(Process);
var $__default = Script;
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{"engine/core/Process":17}],35:[function(require,module,exports){
"use strict";
var $__default = function(cb, ms) {
  var last = Date.now();
  var interval = setInterval(function() {
    var now = Date.now();
    var deltaMs = now - last;
    last = now;
    cb(now, deltaMs);
  }, ms);
  return interval;
};
Object.defineProperties(module.exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});

},{}],36:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}]},{},[1]);
