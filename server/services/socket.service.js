import { createHash } from 'crypto';

import { 
    DEBUG, 
    ENTERGAME_REQUEST, 
    ENTERGAME_RESPONSE, 
    DISCONNECT, 
    EVAL_SERVER, 
    EVAL_SERVER_RESPONSE,
    INITIALIZE,
    UPDATE, 
    REMOVE } from './../constants';
import Player from './../models/Player';
import Bullet from './../models/Bullet';
import Entity from './../models/Entity';
import { createUser, SOCKET_LIST, noOfOnlineUsers } from './../db';

export const connectSocket = (socket) => {
    var t = new Date().getTime().toString(); 
	socket.id = createHash('md5').update(t).digest("hex");
	SOCKET_LIST[socket.id] = socket;
    
    //handles when user enters name and presses enter
	socket.on(ENTERGAME_REQUEST, (data) => { 
            console.log(noOfOnlineUsers());
            if(noOfOnlineUsers()>4){
                var res = {
                    status: false, 
                    error: (noOfOnlineUsers() || 4)+' people are already playing. Overcrowded scene :('
                }
                socket.emit(ENTERGAME_RESPONSE, res);   
            }else{
                createUser(data.username, socket, (res) => {
                    if(res.status){
                        Player.onConnect(socket , data.username, res.lives, res.score, res.color);
                        //emit success resposne
                        socket.emit(ENTERGAME_RESPONSE, res);
                    }else{
                        socket.emit(ENTERGAME_RESPONSE, res);
                    }
                })
                
            }
            
	});
	
	socket.on('disconnect', () => {
        console.log('in disconnect, deleted player');
        delete SOCKET_LIST[socket.id];
        
        // delete player
        Player.onDisconnect(socket);
	});
    
    //
	socket.on(EVAL_SERVER ,(data) => {
		if(!DEBUG)  return;
		var res = eval(data);
		socket.emit(EVAL_SERVER_RESPONSE,res);		
	});
	
    
    setInterval(function(){
        var packs = Entity.getFrameUpdateData(Player, Bullet);
        for(var i in SOCKET_LIST){
            var socket = SOCKET_LIST[i];
            socket.emit(INITIALIZE, packs.initPack);
            socket.emit(UPDATE, packs.updatePack);
            socket.emit(REMOVE, packs.removePack);
        }
        
    },1000/60);

};

