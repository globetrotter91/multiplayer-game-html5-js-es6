// global height and width
export const WIDTH = window.innerWidth;
export const HEIGHT = window.innerHeight;

//divs
export const signDiv = document.getElementById('userDiv');
export const playerName = document.getElementById('playerName');
export const enterGame = document.getElementById('enterGame');
export const gamePage = document.getElementById('gameDiv');
export const gameInstructions = document.getElementById('gameInstructions');
export const gameInstructions0 = document.getElementById('gameInstructions0');
export const loginBox = document.getElementById('loginBox');
export const primaryButton = document.getElementById('primaryColor');
export const warningButton = document.getElementById('warningColor');
export const dangerButton = document.getElementById('dangerColor');
export const infoButton = document.getElementById('infoColor');
export const globalError = document.getElementById('globalError');
export const usernameSpan = document.getElementById('usernameSpan');
export const scoreSpan = document.getElementById('scoreSpan');
export const livesSpan = document.getElementById('livesSpan');
export const gameLostDiv = document.getElementById('gameLostDiv');
export const finalScoreSpan = document.getElementById('finalScoreSpan');

//colors
export const INFO_COLOR = '#5bc0de';
export const PRIMARY_COLOR = '#008cba';
export const DANGER_COLOR = '#F04124';
export const WARNING_COLOR = '#E99002';

//game
export const Img = {};
Img.player = new Image();
Img.player.src = 'img/player.png';
Img.bullet = new Image();
Img.bullet.src = 'img/bullet.png';

//canvas
export const canvas = document.getElementById("ctx"),
	ctx = canvas.getContext("2d");

//game instructions text
export const fullText = [
	'Welcome to KILL THE EMEMY',
	'Following are the rules', 
	'1. You have 5 lives to start with. The lives are precious. If 5 lives are lost, you have to wait for 24 hours to restart.',
	'2. Your aim is to kill as many other players as possible. Every time a player gets killed by you, your killings increase.', 
	'3. The more the killings, the higher your position on the killerboard. The game can be played by 2-4 players', 
	'Controls',
	'1. To move the player, use the arrow keys for respective direction.', 
	'2. To shoot the other player, use your mouse to target and left click to shoot a bullet.',
	'3. Your health for a life can be monitored on the bar above the player.'
];

//socket events 
export const ENTERGAME_REQUEST = 'ENTERGAME_REQUEST';
export const ENTERGAME_RESPONSE = 'ENTERGAME_RESPONSE';
export const DISCONNECT = 'disconnect';
export const EVAL_SERVER = 'EVAL_SERVER';
export const EVAL_SERVER_RESPONSE = 'EVAL_SERVER_RESPONSE';
export const INITIALIZE = 'INITIALIZE';
export const UPDATE = 'UPDATE';
export const REMOVE = 'REMOVE';
export const EVENT_HAPPENED = 'EVENT_HAPPENED';
export const COLOR_SELECTED = 'COLOR_SELECTED'; 
export const GAME_LOST = 'GAME_LOST'; 
