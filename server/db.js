import { createClient } from 'redis';
import Player from './models/Player';

export var initPack = {
    player:[],
    bullet:[]
};

export var removePack = {
    player:[],
    bullet:[]
};

export var SOCKET_LIST = {};

const redisClient = createClient(6379, 'redis');
//const redisClient = createClient();
redisClient.on('connect', () => {
	console.log('redis connected');
})
  
function checkUser(username, cb){
    redisClient.hgetall(username, (err, obj) => {
        if(err){
            cb({status:false})
        }
        if(!obj){
            cb({status: false});
        }
        else{
            cb({status: true, user: obj})
        }  
    })
}

function setDB(key, data, cb){
    redisClient.hmset(key, data, (err, reply) => {
        if(err){
            console.log(err);
            cb({status: false, error: err});
        }
        cb({status: true, message: reply});
    });
}

export function createUser(username, socket, cb){
    checkUser(username, (res) => {
        if(res.status){
            var user = res.user;
            delete SOCKET_LIST[user.id];
            delete Player.list[user.id];
            console.log(user);
            if(user.lives<=0){
                var timeDiff=(parseInt(Date.now())-parseInt(user.lastConnect))/(1000*60*60);
                console.log(timeDiff);
                if(timeDiff>=24){
                    var data = [
                        'id', socket.id, 
                        'lastConnect', Date.now(),
                        'lives', 5
                    ];
                    setDB(username, data, (res) => {
                        if(user.color){
                            res['newUser'] = false;
                        }else{
                            res['newUser'] = true;
                        }
                        cb(res);
                    })
                }else{
                    var res = {status:false, error: 'You are still dead for '+(24-Math.floor(timeDiff/24))+' hours' }
                    cb(res);
                }
            }else{
                var data = [
                    'id', socket.id, 
                    'lastConnect', Date.now()
                ];
                setDB(username, data, (res) => {
                    res['lives'] = user.lives;
                    res['score'] = user.kills;
                    res['color'] = user.color;
                    if(user.color){
                        res['newUser'] = false;
                    }else{
                        res['newUser'] = true;
                    }                    
                    cb(res);
                })
            }
        }else{
            var data = [
                'username', username,
                'id', socket.id, 
                'lastConnect', Date.now(), 
                'lives', 5,  
                'kills', 0 
            ];
            setDB(username, data, (res) => {
                res['newUser'] = true;
                cb(res);
            })
        }
    })    
} 


export function setUserColor(username, colorCode, cb){
    setDB(username, ['color', colorCode], (res) => {
        cb(res);
    })
}

export function playerKilled(username, newLives){
    setDB(username, ['lives', newLives], (res) => {
        
    })
}

export function playerScoreIncresased(username, newScore){
    setDB(username, ['kills', newScore], (res) => {

    })
}

export function noOfOnlineUsers(){
    var hmLength = 0;
    for(var i in SOCKET_LIST){
        hmLength++;
    }
    return hmLength;
}