import {
	globalError,
	scoreSpan,
	livesSpan,
	ctx,
	WIDTH,
	HEIGHT,
	canvas,
	fullText,
	gameInstructions,
	finalScoreSpan
} from './declarations';

import globals from './globals'; 


//shows the error on the top of the screen
export function showError(message){
	globalError.style.display = 'block';
	globalError.innerHTML = message;
	setTimeout(function(){
		globalError.style.display = 'none';
	}, 5000);
}

//print instructions in a type effect when a new player joins 
var i=0; 
export function printInstructions(div){
	i++;
	var counter=0;
	var typo = setInterval(function(){
		div.innerHTML+=fullText[i-1].charAt(counter);
		counter++; 
		if(counter>=fullText[i-1].length){
            clearInterval(typo);
			var divTarget = document.getElementById('gameInstructions'+i)
			if(divTarget){
				printInstructions(divTarget)
			}else{
                i=0; 
				document.getElementById('startGameWithColor').style.display='block';
			}
		}
	}, 1000/25);
}

// renders the score and the lives in the top black bar of the screen
function drawScore(){
	if(globals.playerList[globals.selfId]){
		if(globals.lastScore === globals.playerList[globals.selfId].score && globals.lastLives === globals.playerList[globals.selfId].lives)	return;
		globals.lastScore = globals.playerList[globals.selfId].score;
		globals.lastLives = globals.playerList[globals.selfId].lives;
		scoreSpan.innerHTML = globals.lastScore;
		livesSpan.innerHTML = globals.lastLives;
	}
}

// renders the player and bullet on the canvas
export function updateView(){
	if(!globals.selfId)		return;
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	
	drawScore();
	for(var i in globals.playerList)
		globals.playerList[i].draw();
	for(var i in globals.bulletList)
		globals.bulletList[i].draw();
}

// configures canvas height and width according to the screen
export function configure(){
    window.addEventListener('resize', resizeCanvas, false);
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;		
    }
    resizeCanvas();
}

// hides a element
export function hideElement(element) {
	element.style.display = 'none';
}

// shows a element
export function showElement(element) {
	element.style.display = 'block';
}

// set the height of the gaming isntructions div
export function manageHieghtForGameInstructions(){
	gameInstructions.style.height = Math.floor(0.7*HEIGHT) + 'px';
}

//shows final score when the game is over
export function showFinalScore(socre){
	finalScoreSpan.innerHTML = score;
}