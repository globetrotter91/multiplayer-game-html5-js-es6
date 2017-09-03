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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
// global height and width
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

//colors
var INFO_COLOR = exports.INFO_COLOR = '#5bc0de';
var PRIMARY_COLOR = exports.PRIMARY_COLOR = '#008cba';
var DANGER_COLOR = exports.DANGER_COLOR = '#F04124';
var WARNING_COLOR = exports.WARNING_COLOR = '#E99002';

//game
var Img = exports.Img = {};
Img.player = new Image();
Img.player.src = 'img/player.png';
Img.bullet = new Image();
Img.bullet.src = 'img/bullet.png';

//canvas
var canvas = exports.canvas = document.getElementById("ctx"),
    ctx = exports.ctx = canvas.getContext("2d");

//game instructions text
var fullText = exports.fullText = ['Welcome to KILL THE EMEMY', 'Following are the rules', '1. You have 5 lives to start with. The lives are precious. If 5 lives are lost, you have to wait for 24 hours to restart.', '2. Your aim is to kill as many other players as possible. Every time a player gets killed by you, your killings increase.', '3. The more the killings, the higher your position on the killerboard. The game can be played by 2-4 players', 'Controls', '1. To move the player, use the arrow keys for respective direction.', '2. To shoot the other player, use your mouse to target and left click to shoot a bullet.', '3. Your health for a life can be monitored on the bar above the player.'];

//socket events 
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
                                selfId: null, // selfId is the id of the player who is logged in 
                                //-- helps to differentiate the player playing from his enemies
                                lastScore: null, // score global for the player
                                // -- helps to save the last score of the player playing.
                                lastLives: null, // lives global for the player
                                // also referred to as killings in the game.
                                // -- helps to save the remaining lives of the player playing.
                                playerList: {}, // global player list
                                // -- helps to keep the track of the players and the enemies 
                                bulletList: {} // global bullet list
                                // -- helps to keep track of the bullets fired. 
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _globals = __webpack_require__(1);

var _globals2 = _interopRequireDefault(_globals);

var _declarations = __webpack_require__(0);

var _functions = __webpack_require__(3);

var _socketEvent = __webpack_require__(7);

var _Player = __webpack_require__(4);

var _Player2 = _interopRequireDefault(_Player);

var _Bullet = __webpack_require__(5);

var _Bullet2 = _interopRequireDefault(_Bullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_declarations.enterGame.onclick = function () {
	if (_declarations.playerName.value.trim() == '') {
		_declarations.playerName.style.borderColor = 'red';
		(0, _functions.showError)('Name cannot be blank');
		return;
	}

	// if the username is not blank create a new connection
	var socket = io();
	//sending player name to the server
	socket.emit(_declarations.ENTERGAME_REQUEST, { username: _declarations.playerName.value });
	_declarations.usernameSpan.innerHTML = _declarations.playerName.value;

	// handling server response for new player
	socket.on(_declarations.ENTERGAME_RESPONSE, _socketEvent.serverResponseEnterGame);

	// handling server response when a player is initialized
	socket.on(_declarations.INITIALIZE, _socketEvent.serverResponseInitialize);

	// handling server response when a player is moving or attacking
	socket.on(_declarations.UPDATE, _socketEvent.serverResponseUpdate);

	// handling server response when a player is removed
	socket.on(_declarations.REMOVE, _socketEvent.serverResponseRemove);

	// handling server response when a player selects color to start game
	socket.on(_declarations.COLOR_SELECTED, _socketEvent.serverResponseColorSelected);

	// handling server response when a player has lost
	socket.on(_declarations.GAME_LOST, _socketEvent.serverResponseGameLost);

	//handling the key down event 
	//fires a event sending the event data to server
	//-- helps in movement of the player
	document.onkeydown = function (event) {
		if (socket) {
			if (event.keyCode === 39) //right
				socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'right', state: true });else if (event.keyCode === 40) //down
				socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'down', state: true });else if (event.keyCode === 37) //left
				socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'left', state: true });else if (event.keyCode === 38) // up
				socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'up', state: true });
		}
	};

	//handling the key up event 
	//fires a event sending the event data to server based on the key codes
	//-- helps in stopping movement of the player
	document.onkeyup = function (event) {
		if (socket) {
			if (event.keyCode === 39) //right
				socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'right', state: false });else if (event.keyCode === 40) //down
				socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'down', state: false });else if (event.keyCode === 37) //left
				socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'left', state: false });else if (event.keyCode === 38) // up
				socket.emit(_declarations.EVENT_HAPPENED, { inputId: ' up', state: false });
		}
	};

	//handling the mouse down/left-click event 
	//fires a event sending the event data to server 
	//-- helps in firing the bullets
	document.onmousedown = function (event) {
		if (socket) {
			socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'attack', state: true });
		}
	};

	//handling the mouse up event 
	//fires a event sending the event data to server 
	//-- helps in stop firing the bullets
	document.onmouseup = function (event) {
		if (socket) {
			socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'attack', state: false });
		}
	};

	//handling the mouse move event 
	//fires a event sending the event data to server [event data being the mouse angle calculated wrt player]
	//-- helps in firing bullets at a particlar angle 
	//-- helps in positioning the player sprite image 
	document.onmousemove = function (event) {
		if (socket && _globals2.default.playerList[_globals2.default.selfId]) {
			var x = event.clientX - _globals2.default.playerList[_globals2.default.selfId].x;
			var y = event.clientY - _globals2.default.playerList[_globals2.default.selfId].y;
			var angle = Math.atan2(y, x) / Math.PI * 180;
			socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'mouseAngle', state: angle });
		}
	};

	//disabling the right click on the document
	document.oncontextmenu = function (event) {
		event.preventDefault();
	};

	//following four functions 
	//sends the selected color by the player to the server
	_declarations.primaryButton.onclick = function () {
		socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'colorSelected', state: _declarations.PRIMARY_COLOR });
	};
	_declarations.infoButton.onclick = function () {
		socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'colorSelected', state: _declarations.INFO_COLOR });
	};
	_declarations.warningButton.onclick = function () {
		socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'colorSelected', state: _declarations.WARNING_COLOR });
	};
	_declarations.dangerButton.onclick = function () {
		socket.emit(_declarations.EVENT_HAPPENED, { inputId: 'colorSelected', state: _declarations.DANGER_COLOR });
	};

	//checks the connection is active with the server	
	// * note - this can also be achieved in more optimized manner user service workers if the the connection is https
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
//configure the size of the canvas based on the size of the screen.
(0, _functions.configure)();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.showError = showError;
exports.printInstructions = printInstructions;
exports.updateView = updateView;
exports.configure = configure;
exports.hideElement = hideElement;
exports.showElement = showElement;
exports.manageHieghtForGameInstructions = manageHieghtForGameInstructions;
exports.showFinalScore = showFinalScore;

var _declarations = __webpack_require__(0);

var _globals = __webpack_require__(1);

var _globals2 = _interopRequireDefault(_globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//shows the error on the top of the screen
function showError(message) {
	_declarations.globalError.style.display = 'block';
	_declarations.globalError.innerHTML = message;
	setTimeout(function () {
		_declarations.globalError.style.display = 'none';
	}, 5000);
}

//print instructions in a type effect when a new player joins 
var i = 0;
function printInstructions(div) {
	i++;
	var counter = 0;
	var typo = setInterval(function () {
		div.innerHTML += _declarations.fullText[i - 1].charAt(counter);
		counter++;
		if (counter >= _declarations.fullText[i - 1].length) {
			clearInterval(typo);
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

// renders the score and the lives in the top black bar of the screen
function drawScore() {
	if (_globals2.default.playerList[_globals2.default.selfId]) {
		if (_globals2.default.lastScore === _globals2.default.playerList[_globals2.default.selfId].score && _globals2.default.lastLives === _globals2.default.playerList[_globals2.default.selfId].lives) return;
		_globals2.default.lastScore = _globals2.default.playerList[_globals2.default.selfId].score;
		_globals2.default.lastLives = _globals2.default.playerList[_globals2.default.selfId].lives;
		_declarations.scoreSpan.innerHTML = _globals2.default.lastScore;
		_declarations.livesSpan.innerHTML = _globals2.default.lastLives;
	}
}

// renders the player and bullet on the canvas
function updateView() {
	if (!_globals2.default.selfId) return;
	_declarations.ctx.clearRect(0, 0, _declarations.WIDTH, _declarations.HEIGHT);

	drawScore();
	for (var i in _globals2.default.playerList) {
		_globals2.default.playerList[i].draw();
	}for (var i in _globals2.default.bulletList) {
		_globals2.default.bulletList[i].draw();
	}
}

// configures canvas height and width according to the screen
function configure() {
	window.addEventListener('resize', resizeCanvas, false);
	function resizeCanvas() {
		_declarations.canvas.width = window.innerWidth;
		_declarations.canvas.height = window.innerHeight;
	}
	resizeCanvas();
}

// hides a element
function hideElement(element) {
	element.style.display = 'none';
}

// shows a element
function showElement(element) {
	element.style.display = 'block';
}

// set the height of the gaming isntructions div
function manageHieghtForGameInstructions() {
	_declarations.gameInstructions.style.height = Math.floor(0.7 * _declarations.HEIGHT) + 'px';
}

//shows final score when the game is over
function showFinalScore(socre) {
	_declarations.finalScoreSpan.innerHTML = score;
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _declarations = __webpack_require__(0);

var _globals = __webpack_require__(1);

var _globals2 = _interopRequireDefault(_globals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @ES6 class
 * @name Player
 * @description creates a player whenever a new player joins in.
 * draw function used for rendering, 
 * update function used for updating coords and score
 */
var Player = function () {
	//using ES6 desctruct to get properties of the player
	function Player(_ref) {
		var id = _ref.id,
		    x = _ref.x,
		    y = _ref.y,
		    hp = _ref.hp,
		    hpMax = _ref.hpMax,
		    score = _ref.score,
		    directionMod = _ref.directionMod,
		    spriteAnimCounter = _ref.spriteAnimCounter,
		    lives = _ref.lives,
		    color = _ref.color;

		_classCallCheck(this, Player);

		this.id = id; //id of the player -- helps in keeping track of the players
		this.x = x; //x in the (x,y) coords of 2d -- helps in moving the player on canvas 
		this.y = y; //y in the (x,y) coords of 2d -- helps in moving the player on canvas
		this.hpMax = hpMax; //maximum health of the player in a life
		this.hp = hp; //remaining health of the player in a life
		this.score = score; //no of players killed by the player also ref as killings
		this.directionMod = directionMod; //1,2,3,4 depending on the mouse angle and key pressed 
		//-- helps in displaying the correct part of player sprite image
		this.spriteAnimCounter = spriteAnimCounter; //kinda the speed of the avatar, can be 0,1,2 
		//-- helps in displaying the correct part of player sprite image
		this.lives = lives; //remaining lives of the player
		this.color = color; //color of the hp bar 
		this.image = _declarations.Img.player; //image if the player 
		this.width = _declarations.Img.player.width; //width of the player image
		this.height = _declarations.Img.player.height; //height of the player image
	}

	// the draw function is responsible for rendering the image of the player on the canvas.


	_createClass(Player, [{
		key: 'draw',
		value: function draw() {
			if (!this.color || this.color === '#ffffff') return;
			var x = this.x;
			var y = this.y;

			if (this.x <= 20) x = 20;
			if (this.x >= _declarations.WIDTH - 20) x = _declarations.WIDTH - 20;
			if (this.y <= 100) y = 100;
			if (this.y >= _declarations.HEIGHT - 70) y = _declarations.HEIGHT - 70;

			var hpWidth = 30 * this.hp / this.hpMax;
			_declarations.ctx.fillStyle = this.color;
			_declarations.ctx.fillRect(x - hpWidth / 2, y - 60, hpWidth, 4);

			var frameWidth = this.width / 3;
			var frameHeight = this.height / 4 + 1;

			var walkingMod = Math.floor(this.spriteAnimCounter) % 3; //1,2

			_declarations.ctx.drawImage(this.image, walkingMod * frameWidth, this.directionMod * frameHeight, frameWidth, frameHeight, x - this.width / 2, y - this.height / 2, this.width, this.height);
		}

		// when a player is connected with the server this function is called to 
		// add the player to the global player list.

	}, {
		key: 'appear',
		value: function appear() {
			_globals2.default.playerList[this.id] = this;
		}

		// the function update is called whenever there is a update event from the server
		// this function sets the properties of the player as the pack received from the server.

	}, {
		key: 'update',
		value: function update(pack) {
			//console.log(this); 
			if (pack.x !== undefined) this.x = pack.x;
			if (pack.y !== undefined) this.y = pack.y;
			if (pack.hp !== undefined) this.hp = pack.hp;
			if (pack.score !== undefined) this.score = pack.score;
			if (pack.lives !== undefined) this.lives = pack.lives;
			if (pack.mouseAngle !== undefined) this.mouseAngle = pack.mouseAngle;
			if (pack.directionMod !== undefined) this.directionMod = pack.directionMod;
			if (pack.spriteAnimCounter !== undefined) this.spriteAnimCounter = pack.spriteAnimCounter;
			if (pack.color !== undefined) this.color = pack.color;
		}
	}]);

	return Player;
}();

exports.default = Player;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _globals = __webpack_require__(1);

var _globals2 = _interopRequireDefault(_globals);

var _declarations = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @ES6 class
 * @name Bullet
 * @description creates a bullet whenever the player presses the mouse.
 * draw function used for rendering, 
 * fire function used for adding to bullet list
 */
var Bullet = function () {
    function Bullet(_ref) {
        var id = _ref.id,
            x = _ref.x,
            y = _ref.y;

        _classCallCheck(this, Bullet);

        this.id = id; // id of the bullet 
        // -- helps in keeping track of the bullets and removing when out of bound of hit player
        this.x = x; //x in the (x,y) coords of 2d -- helps in moving the bullet on canvas 
        this.y = y; //y in the (x,y) coords of 2d -- helps in moving the bullet on canvas
        this.image = _declarations.Img.bullet; //image if the player 
        this.width = _declarations.Img.bullet.width; //width of bullet image
        this.height = _declarations.Img.bullet.height; //height of bullet image
    }

    // the draw function is responsible for rendering the image of the bullet on the canvas.


    _createClass(Bullet, [{
        key: 'draw',
        value: function draw() {
            _declarations.ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x - this.width / 4, this.y - this.height / 4, this.width / 2, this.height / 2);
        }
        // this method is used to add the created bullets to the global bullet list.

    }, {
        key: 'fire',
        value: function fire() {
            _globals2.default.bulletList[this.id] = this;
        }
    }]);

    return Bullet;
}();

exports.default = Bullet;

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.serverResponseEnterGame = serverResponseEnterGame;
exports.serverResponseInitialize = serverResponseInitialize;
exports.serverResponseUpdate = serverResponseUpdate;
exports.serverResponseRemove = serverResponseRemove;
exports.serverResponseColorSelected = serverResponseColorSelected;
exports.serverResponseGameLost = serverResponseGameLost;

var _globals = __webpack_require__(1);

var _globals2 = _interopRequireDefault(_globals);

var _declarations = __webpack_require__(0);

var _Player = __webpack_require__(4);

var _Player2 = _interopRequireDefault(_Player);

var _Bullet = __webpack_require__(5);

var _Bullet2 = _interopRequireDefault(_Bullet);

var _functions = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// receiving response from the server when you join the game
function serverResponseEnterGame(data) {
    if (data.status) {
        if (data.newUser) {
            (0, _functions.hideElement)(_declarations.loginBox);
            (0, _functions.showElement)(_declarations.gameInstructions);
            (0, _functions.manageHieghtForGameInstructions)();
            (0, _functions.printInstructions)(_declarations.gameInstructions0);
        } else {
            (0, _functions.hideElement)(_declarations.signDiv);
            (0, _functions.showElement)(_declarations.gamePage);
        }
    } else {
        (0, _functions.showError)(data.error);
    }
}

// receiving response from the server when a new player joins
function serverResponseInitialize(data) {
    if (data.selfId) _globals2.default.selfId = data.selfId;
    for (var i = 0; i < data.player.length; i++) {
        var player = new _Player2.default(data.player[i]);
        player.appear();
    }
    for (var i = 0; i < data.bullet.length; i++) {
        var bullet = new _Bullet2.default(data.bullet[i]);
        bullet.fire();
    }
    (0, _functions.updateView)();
}

// receiving response from the server when the player/bullet position is updated
function serverResponseUpdate(data) {
    for (var i = 0; i < data.player.length; i++) {
        var pack = data.player[i];
        var player = _globals2.default.playerList[pack.id];
        if (player) player.update(pack);
    }

    if (data.player.length !== _globals2.default.playerList.length) {
        for (var id in _globals2.default.playerList) {
            var check = 0;
            for (var i = 0; i < data.player.length; i++) {
                if (id == data.player[i].id) {
                    check = 1;
                    break;
                }
            }
            if (check == 0) {
                delete _globals2.default.playerList[id];
            }
        }
    }

    for (var i = 0; i < data.bullet.length; i++) {
        var pack = data.bullet[i];
        var b = _globals2.default.bulletList[data.bullet[i].id];
        if (b) {
            if (pack.x !== undefined) b.x = pack.x;
            if (pack.y !== undefined) b.y = pack.y;
        }
    }
    (0, _functions.updateView)();
}

// receiving response from the server when the player/bullet is removed
function serverResponseRemove(data) {
    for (var i = 0; i < data.player.length; i++) {
        delete _globals2.default.playerList[data.player[i]];
    }
    for (var i = 0; i < data.bullet.length; i++) {
        delete _globals2.default.bulletList[data.bullet[i]];
    }
    (0, _functions.updateView)();
}

// receiving response from the server when the player color is set and game is to start
function serverResponseColorSelected(data) {
    if (data.status) {
        (0, _functions.hideElement)(_declarations.signDiv);
        (0, _functions.showElement)(_declarations.gamePage);
        (0, _functions.updateView)();
    } else {
        (0, _functions.showError)('Some problem with server. Please try after some time.');
    }
}

// receiving response from the server when the game is lost
function serverResponseGameLost(data) {
    (0, _functions.hideElement)(_declarations.gamePage);
    (0, _functions.showElement)(_declarations.gameLostDiv);
    (0, _functions.showFinalScore)(data.score);
    socket = null;
}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.map