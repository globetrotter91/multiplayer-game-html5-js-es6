import Entity from './Entity';
import Player from './Player';
import { initPack, removePack, playerKilled, playerScoreIncresased } from './../db';


const Bullet = (param) => {
	var self = Entity(param);
	self.angle = param.angle;
	self.spdX = Math.cos(param.angle/180*Math.PI) * 10;
	self.spdY = Math.sin(param.angle/180*Math.PI) * 10;
	self.parent = param.parent;
	
	self.timer = 0;
	self.toRemove = false;
	var super_update = self.update;
	self.update = () => {
		if(self.timer++ > 100)	self.toRemove = true;
		super_update();
		for(var i in Player.list){
			var p = Player.list[i];
			if(self.getDistance(p) < 32 && self.parent !== p.id){
				p.hp -= 1;								
				if(p.hp <= 0){
					if(p.lives > 0){
						p.lives-=1;
						playerKilled(p.username, p.lives)
						var shooter = Player.list[self.parent];
						if(shooter){
							shooter.score += 1;
							playerScoreIncresased(shooter.username, shooter.score);
						}
						p.hp = p.hpMax;
						p.x = Math.random() * 500;
						p.y = Math.random() * 500;					
					}else{
						p.gameLost(); 
					}					
				}
				self.toRemove = true;
			}
		}
	}
	self.getInitPack = () => {
		return {
			id:self.id,
			x:self.x,
			y:self.y,
		};
	}
	self.getUpdatePack = () => {
		return {
			id:self.id,
			x:self.x,
			y:self.y,		
		};
	}
	
	
	Bullet.list[self.id] = self;
	initPack.bullet.push(self.getInitPack());
	return self;
}
Bullet.list = {};

Bullet.update = () => {
	var pack = [];
	for(var i in Bullet.list){
		var bullet = Bullet.list[i];
		bullet.update();
		if(bullet.toRemove){
			delete Bullet.list[i];
			removePack.bullet.push(bullet.id);
		} else {
			pack.push(bullet.getUpdatePack());		
		}
	}
	return pack;
}

Bullet.getAllInitPack = () => {
	var bullets = [];
	for(var i in Bullet.list)
		bullets.push(Bullet.list[i].getInitPack());
	return bullets;
}


export default Bullet; 