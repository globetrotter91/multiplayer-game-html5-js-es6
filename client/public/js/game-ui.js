/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var WIDTH = exports.WIDTH = window.innerWidth;
var HEIGHT = exports.HEIGHT = window.innerHeight;

//divs
var signDiv = exports.signDiv = document.getElementById('userDiv');
var playerName = exports.playerName = document.getElementById('playerName');
var enterGame = exports.enterGame = document.getElementById('enterGame');
var gamePage = exports.gamePage = document.getElementById('gameDiv');
var gameInstructions = exports.gameInstructions = document.getElementById('gameInstructions');
var gameInstructions0 = exports.gameInstructions0 = document.getElementById('gameInstructions0');
var loginBox = exports.loginBox = document.getElementById('loginBox');
var primaryButton = exports.primaryButton = document.getElementById('primaryColor');
var warningButton = exports.warningButton = document.getElementById('warningColor');
var dangerButton = exports.dangerButton = document.getElementById('dangerColor');
var infoButton = exports.infoButton = document.getElementById('infoColor');
var globalError = exports.globalError = document.getElementById('globalError');
var usernameSpan = exports.usernameSpan = document.getElementById('usernameSpan');
var scoreSpan = exports.scoreSpan = document.getElementById('scoreSpan');
var livesSpan = exports.livesSpan = document.getElementById('livesSpan');
var gameLostDiv = exports.gameLostDiv = document.getElementById('gameLostDiv');
var finalScoreSpan = exports.finalScoreSpan = document.getElementById('finalScoreSpan');

//game
var Img = exports.Img = {};
Img.player = new Image();
Img.player.src = 'img/player.png';
Img.bullet = new Image();
Img.bullet.src = 'img/bullet.png';

var canvas = exports.canvas = document.getElementById("ctx"),
    ctx = exports.ctx = canvas.getContext("2d");

var fullText = exports.fullText = ['Welcome to KILL THE EMEMY', 'Following are the rules', '1. You have 5 lives to start with. The lives are precious. If 5 lives are lost, you have to wait for 24 hours to restart.', '2. Your aim is to kill as many other players as possible. Every time a player gets killed by you, your killings increase.', '3. The more the killings, the higher your position on the killerboard. The game can be played by 2-4 players', 'Controls', '1. To move the player, use the arrow keys for respective direction.', '2. To shoot the other player, use your mouse to target and left click to shoot a bullet.', '3. Your health for a life can be monitored on the bar above the player.'];

var ENTERGAME_REQUEST = exports.ENTERGAME_REQUEST = 'ENTERGAME_REQUEST';
var ENTERGAME_RESPONSE = exports.ENTERGAME_RESPONSE = 'ENTERGAME_RESPONSE';
var DISCONNECT = exports.DISCONNECT = 'disconnect';
var EVAL_SERVER = exports.EVAL_SERVER = 'EVAL_SERVER';
var EVAL_SERVER_RESPONSE = exports.EVAL_SERVER_RESPONSE = 'EVAL_SERVER_RESPONSE';
var INITIALIZE = exports.INITIALIZE = 'INITIALIZE';
var UPDATE = exports.UPDATE = 'UPDATE';
var REMOVE = exports.REMOVE = 'REMOVE';
var EVENT_HAPPENED = exports.EVENT_HAPPENED = 'EVENT_HAPPENED';
var COLOR_SELECTED = exports.COLOR_SELECTED = 'COLOR_SELECTED';
var GAME_LOST = exports.GAME_LOST = 'GAME_LOST';

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    selfId: null,
    lastScore: null,
    lastLives: null
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Bullet = exports.Player = undefined;

var _declarations = __webpack_require__(0);

var _globals = __webpack_require__(1);

var _globals2 = _interopRequireDefault(_globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Player = exports.Player = function Player(initPack) {
	var self = {};
	self.id = initPack.id;
	self.x = initPack.x;
	self.y = initPack.y;
	self.hp = initPack.hp;
	self.hpMax = initPack.hpMax;
	self.score = initPack.score;
	self.directionMod = initPack.directionMod;
	self.spriteAnimCounter = initPack.spriteAnimCounter;
	self.lives = initPack.lives;
	self.color = initPack.color;

	self.draw = function () {
		if (!self.color || self.color === '#ffffff') return;
		var x = self.x; //- Player.list[selfId].x + WIDTH/2;
		var y = self.y; //- Player.list[selfId].y + HEIGHT/2;

		if (self.x <= 20) x = 20;
		if (self.x >= _declarations.WIDTH - 20) x = _declarations.WIDTH - 20;
		if (self.y <= 100) y = 100;
		if (self.y >= _declarations.HEIGHT - 70) y = _declarations.HEIGHT - 70;

		var hpWidth = 30 * self.hp / self.hpMax;
		_declarations.ctx.fillStyle = self.color;
		_declarations.ctx.fillRect(x - hpWidth / 2, y - 60, hpWidth, 4);

		var width = _declarations.Img.player.width;
		var height = _declarations.Img.player.height;

		var frameWidth = _declarations.Img.player.width / 3;
		var frameHeight = _declarations.Img.player.height / 4 + 1;

		var walkingMod = Math.floor(self.spriteAnimCounter) % 3; //1,2

		_declarations.ctx.drawImage(_declarations.Img.player, walkingMod * frameWidth, self.directionMod * frameHeight, frameWidth, frameHeight, x - width / 2, y - height / 2, width, height);
	};

	Player.list[self.id] = self;

	return self;
};
Player.list = {};

var Bullet = exports.Bullet = function Bullet(initPack) {
	var self = {};
	self.id = initPack.id;
	self.x = initPack.x;
	self.y = initPack.y;
	//self.map = initPack.map;

	self.draw = function () {
		var selfId = _globals2.default.selfId;
		if (Player.list[selfId].map !== self.map) return;
		var width = _declarations.Img.bullet.width / 2;
		var height = _declarations.Img.bullet.height / 2;

		var x = self.x; //- Player.list[selfId].x + WIDTH/2;
		var y = self.y; //- Player.list[selfId].y + HEIGHT/2;

		_declarations.ctx.drawImage(_declarations.Img.bullet, 0, 0, _declarations.Img.bullet.width, _declarations.Img.bullet.height, x - width / 2, y - height / 2, width, height);
	};

	Bullet.list[self.id] = self;
	return self;
};
Bullet.list = {};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _declarations = __webpack_require__(0);

var _functions = __webpack_require__(4);

var _models = __webpack_require__(2);

var _globals = __webpack_require__(1);

var _globals2 = _interopRequireDefault(_globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_declarations.enterGame.onclick = function () {
	if (_declarations.playerName.value.trim() == '') {
		_declarations.playerName.style.borderColor = 'red';
		(0, _functions.showError)('Name cannot be blank');
		return;
	}

	var socket = io();

	socket.emit(_declarations.ENTERGAME_REQUEST, { username: _declarations.playerName.value });
	_declarations.usernameSpan.innerHTML = _declarations.playerName.value;
	socket.on(_declarations.ENTERGAME_RESPONSE, function (data) {
		if (data.status) {
			if (data.newUser) {
				_declarations.loginBox.style.display = 'none';
				_declarations.gameInstructions.style.display = 'block';
				_declarations.gameInstructions.style.height = Math.floor(0.7 * _declarations.HEIGHT) + 'px';
				(0, _functions.printInstructions)(_declarations.gameInstructions0);
			} else {
				_declarations.signDiv.style.display = 'none';
				_declarations.gamePage.style.display = 'block';
			}
		} else {
			//alert(res.error);
			(0, _functions.showError)(data.error);
		}
	});

	socket.on(_declarations.INITIALIZE, function (data) {
		//console.log(data);
		if (data.selfId) _globals2.default.selfId = data.selfId;
		for (var i = 0; i < data.player.length; i++) {
			new _models.Player(data.player[i]);
		}
		for (var i = 0; i < data.bullet.length; i++) {
			new _models.Bullet(data.bullet[i]);
		}
		(0, _functions.updateView)();
	});

	socket.on(_declarations.UPDATE, function (data) {
		for (var i = 0; i < data.player.length; i++) {
			var pack = data.player[i];
			var p = _models.Player.list[pack.id];
			//console.log(p, pack.x);
			if (p) {
				if (pack.x !== undefined) p.x = pack.x;
				if (pack.y !== undefined) p.y = pack.y;
				if (pack.hp !== undefined) p.hp = pack.hp;
				if (pack.score !== undefined) p.score = pack.score;
				if (pack.lives !== undefined) p.lives = pack.lives;
				if (pack.mouseAngle !== undefined) p.mouseAngle = pack.mouseAngle;
				if (pack.directionMod !== undefined) p.directionMod = pack.directionMod;
				if (pack.spriteAnimCounter !== undefined) p.spriteAnimCounter = pack.spriteAnimCounter;
				if (pack.color !== undefined) p.color = pack.color;
			}
		}
		if (data.player.length !== _models.Player.list.length) {
			for (var id in _models.Player.list) {
				var check = 0;
				for (var i = 0; i < data.player.length; i++) {
					if (id == data.player[i].id) {
						check = 1;
						break;
					}
				}
				if (check == 0) {
					delete _models.Player.list[id];
				}
			}
		}
		for (var i = 0; i < data.bullet.length; i++) {
			var pack = data.bullet[i];
			var b = _models.Bullet.list[data.bullet[i].id];
			if (b) {
				if (pack.x !== undefined) b.x = pack.x;
				if (pack.y !== undefined) b.y = pack.y;
			}
		}
		(0, _functions.updateView)();
	});

	socket.on(_declarations.REMOVE, function (data) {
		for (var i = 0; i < data.player.length; i++) {
			delete _models.Player.list[data.player[i]];
		}
		for (var i = 0; i < data.bullet.length; i++) {
			delete _models.Bullet.list[data.bullet[i]];
		}
		(0, _functions.updateView)();
	});

	socket.on(_declarations.COLOR_SELECTED, function (data) {
		if (data.status) {
			_declarations.signDiv.style.display = 'none';
			_declarations.gamePage.style.display = 'block';
			(0, _functions.updateView)();
		} else {
			(0, _functions.showError)('Some problem with server. Please try after some time.');
		}
	});

	socket.on(_declarations.GAME_LOST, function (data) {
		//console.log('in game lost', data);
		_declarations.gamePage.style.display = 'none';
		_declarations.gameLostDiv.style.display = 'block';
		_declarations.finalScoreSpan.innerHTML = data.score;
		socket = null;
	});

	document.onkeydown = function (event) {
		if (socket) {
			if (event.keyCode === 39) //right
				socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'right', state: true });else if (event.keyCode === 40) //down
				socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'down', state: true });else if (event.keyCode === 37) //left
				socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'left', state: true });else if (event.keyCode === 38) // up
				socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'up', state: true });
		}
	};
	document.onkeyup = function (event) {
		if (socket) {
			if (event.keyCode === 39) //right
				socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'right', state: false });else if (event.keyCode === 40) //down
				socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'down', state: false });else if (event.keyCode === 37) //left
				socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'left', state: false });else if (event.keyCode === 38) // up
				socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'up', state: false });
		}
	};

	document.onmousedown = function (event) {
		if (socket) {
			socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'attack', state: true });
		}
	};
	document.onmouseup = function (event) {
		if (socket) {
			socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'attack', state: false });
		}
	};
	var oldClientX = 0,
	    oldClientY = 0;
	document.onmousemove = function (event) {
		if (socket) {
			//console.log(event, event.clientX, event.clientY);
			var x = event.clientX - oldClientX;
			var y = event.clientY - oldClientY;
			var angle = Math.atan2(y, x) / Math.PI * 180;
			//console.log(angle);

			socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'mouseAngle', state: angle });
			oldClientX = event.clientX;
			oldClientY = event.clientY;
		}
	};

	document.oncontextmenu = function (event) {
		event.preventDefault();
	};

	_declarations.primaryButton.onclick = function () {
		socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'colorSelected', state: '#008cba' });
	};

	_declarations.infoButton.onclick = function () {
		socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'colorSelected', state: '#5bc0de' });
	};

	_declarations.warningButton.onclick = function () {
		socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'colorSelected', state: '#E99002' });
	};

	_declarations.dangerButton.onclick = function () {
		socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'colorSelected', state: '#F04124' });
	};

	var connectionManager = setInterval(function () {
		if (socket.disconnected) {
			(0, _functions.showError)('Error in server connection');
			setTimeout(function () {
				clearInterval(connectionManager);
				location.reload();
			}, 3000);
		}
	}, 1000);
};
(0, _functions.configure)();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.showError = showError;
exports.printInstructions = printInstructions;
exports.updateView = updateView;
exports.configure = configure;

var _declarations = __webpack_require__(0);

var _models = __webpack_require__(2);

var _globals = __webpack_require__(1);

var _globals2 = _interopRequireDefault(_globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function showError(message) {
	_declarations.globalError.style.display = 'block';
	_declarations.globalError.innerHTML = message;
	setTimeout(function () {
		_declarations.globalError.style.display = 'none';
	}, 5000);
}

var i = 0;
function printInstructions(div) {
	i++;
	var counter = 0;
	var typo = setInterval(function () {
		div.innerHTML += _declarations.fullText[i - 1].charAt(counter);
		counter++;
		if (counter >= _declarations.fullText[i - 1].length) {
			clearInterval(typo);
			//i=0; 
			var divTarget = document.getElementById('gameInstructions' + i);
			if (divTarget) {
				printInstructions(divTarget);
			} else {
				i = 0;
				document.getElementById('startGameWithColor').style.display = 'block';
			}
		}
	}, 1000 / 25);
}

function drawScore() {
	if (_models.Player.list[_globals2.default.selfId]) {
		if (_globals2.default.lastScore === _models.Player.list[_globals2.default.selfId].score && _globals2.default.lastLives === _models.Player.list[_globals2.default.selfId].lives) return;
		_globals2.default.lastScore = _models.Player.list[_globals2.default.selfId].score;
		_globals2.default.lastLives = _models.Player.list[_globals2.default.selfId].lives;
		_declarations.scoreSpan.innerHTML = _globals2.default.lastScore;
		_declarations.livesSpan.innerHTML = _globals2.default.lastLives;
	}
}

function updateView() {
	if (!_globals2.default.selfId) return;
	_declarations.ctx.clearRect(0, 0, _declarations.WIDTH, _declarations.HEIGHT);

	drawScore();
	for (var i in _models.Player.list) {
		_models.Player.list[i].draw();
	}for (var i in _models.Bullet.list) {
		_models.Bullet.list[i].draw();
	}
}

function configure() {
	window.addEventListener('resize', resizeCanvas, false);
	function resizeCanvas() {
		_declarations.canvas.width = window.innerWidth;
		_declarations.canvas.height = window.innerHeight;
	}
	resizeCanvas();
}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.map