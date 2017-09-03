'use strict';
import globals from './globals';
import { loginBox, gameInstructions, gameInstructions0, signDiv, gamePage, gameLostDiv } from './declarations';
import Player from './Player';
import Bullet from './Bullet';
import { 
    hideElement,
    showElement,
    showError,
    printInstructions,
    manageHieghtForGameInstructions,
    updateView,
    showFinalScore
} from './functions';

// receiving response from the server when you join the game
export function serverResponseEnterGame(data) {
    if (data.status) {
        if (data.newUser) {
            hideElement(loginBox);
            showElement(gameInstructions);
            manageHieghtForGameInstructions();
            printInstructions(gameInstructions0);
        } else {
            hideElement(signDiv);
            showElement(gamePage);
        }				
    } else{
        showError(data.error);
    }		
}

// receiving response from the server when a new player joins
export function serverResponseInitialize(data) {	
    if(data.selfId) globals.selfId = data.selfId;
    for(var i = 0 ; i < data.player.length; i++) {
        var player = new Player(data.player[i]);
        player.appear(); 
    }
    for(var i = 0 ; i < data.bullet.length; i++) {
        var bullet = new Bullet(data.bullet[i]);
        bullet.fire(); 
    }
    updateView();
}

// receiving response from the server when the player/bullet position is updated
export function serverResponseUpdate(data) {
    for(var i = 0 ; i < data.player.length; i++) {
        var pack = data.player[i];
        var player = globals.playerList[pack.id];
        if(player) player.update(pack);
    }

    if(data.player.length!==globals.playerList.length) {
        for(var id in globals.playerList){
            var check = 0;
            for(var i = 0 ; i < data.player.length; i++) {
                if (id == data.player[i].id) {
                    check=1;
                    break;
                }
            }
            if (check==0) {
                delete globals.playerList[id]
            }
        }
    }
    
    for(var i = 0 ; i < data.bullet.length; i++) {
        var pack = data.bullet[i];
        var b = globals.bulletList[data.bullet[i].id];
        if(b){
            if(pack.x !== undefined)
                b.x = pack.x;
            if(pack.y !== undefined)
                b.y = pack.y;
        }
    }
    updateView();    
}

// receiving response from the server when the player/bullet is removed
export function serverResponseRemove(data) {
    for(var i = 0 ; i < data.player.length; i++) {
        delete globals.playerList[data.player[i]];
    }
    for(var i = 0 ; i < data.bullet.length; i++) {
        delete globals.bulletList[data.bullet[i]];
    }
    updateView();
}

// receiving response from the server when the player color is set and game is to start
export function serverResponseColorSelected(data) {
    if (data.status) {
        hideElement(signDiv);
        showElement(gamePage);
        updateView();
    } else {
        showError('Some problem with server. Please try after some time.');
    }	
}

// receiving response from the server when the game is lost
export function serverResponseGameLost(data) {
    hideElement(gamePage);
    showElement(gameLostDiv);
    showFinalScore(data.score);
    socket = null; 
}