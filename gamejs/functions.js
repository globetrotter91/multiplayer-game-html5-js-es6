import { globalError, scoreSpan, livesSpan, ctx, WIDTH, HEIGHT, canvas, fullText } from './declarations';

import { Player, Bullet } from './models';
import globals from './globals'; 

export function showError(message){
	globalError.style.display = 'block';
	globalError.innerHTML = message;
	setTimeout(function(){
		globalError.style.display = 'none';
	}, 5000);
}

var i=0; 
export function printInstructions(div){
	i++;
	var counter=0;
	var typo = setInterval(function(){
		div.innerHTML+=fullText[i-1].charAt(counter);
		counter++; 
		if(counter>=fullText[i-1].length){
            clearInterval(typo);
            //i=0; 
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

function drawScore(){
	if(Player.list[globals.selfId]){
		if(globals.lastScore === Player.list[globals.selfId].score && globals.lastLives === Player.list[globals.selfId].lives)	return;
		globals.lastScore = Player.list[globals.selfId].score;
		globals.lastLives = Player.list[globals.selfId].lives;
		scoreSpan.innerHTML = globals.lastScore;
		livesSpan.innerHTML = globals.lastLives;
	}
}
var stopId; 
function realupdate(){
	if(!globals.selfId)		return;
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	
	drawScore();
	for(var i in Player.list)
		Player.list[i].draw();
	for(var i in Bullet.list)
		Bullet.list[i].draw();

	cancelAnimationFrame(stopId);
}


export function updateView(){
	if(!globals.selfId)		return;
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	
	drawScore();
	for(var i in Player.list)
		Player.list[i].draw();
	for(var i in Bullet.list)
		Bullet.list[i].draw();
	//stopId = window.requestAnimationFrame(realupdate);  // this created problem in profiling snapshot
}

export function configure(){
    window.addEventListener('resize', resizeCanvas, false);
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;		
    }
    resizeCanvas();
}