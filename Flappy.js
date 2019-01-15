var bird;
var pipes=[];
var running;
var score;
var mult=2;


function setup(){
	createCanvas(400,600);
	reset();
}

function reset(){
pipes=[];
bird= new Bird();
score=0;
//pipes.push(new Pipe());
running=true;
mult=4;
}

function draw(){
	if (running){
	background(0);
	bird.show();
	bird.update();


	if (frameCount%50==0){
		
		score+=50;
		if (score%300==0){
			if (mult<10){
				mult+=1.5;
			}
			}

		if (score%1000==0){
			mult=4;
		}

		for (var i=0;i<pipes.length-1;i++){
			pipes[i].intersect();
		}
		
		pipes.push(new Pipe(mult));	

		}
	

	for (var i=pipes.length-1;i>=0;i--){
		pipes[i].show();
		pipes[i].update();
		pipes[i].intersect();
		if (pipes[i].x<-1){
			pipes.splice(i,1);
		}
	}	
}
}

function keyPressed(isOver){
	if (keyCode==UP_ARROW){
	bird.jump();
	bird.update();
}
	if (keyCode==13){
		if (isOver){
			console.log("gameover");
			reset();
		}
		
	}
}


function Bird(){
	this.x=64;
	this.y=height/2;
	this.velocity = 0;
	this.gravity=1;
	this.jumpheight=-14;

	this.show = function() {
		fill(255);
		ellipse(this.x,this.y,32,32);
	}

	this.jump = function(){
		this.velocity=this.jumpheight;
	}


	this.update = function(){

		
			this.y+=this.velocity;

			if (this.y>584){
				this.y=584;
			}
			else if (this.y<18){
				this.y=18;
			}

		if (this.velocity<7){
		this.velocity+=this.gravity;
	}

	}
}


function Pipe(mult){
	this.top=random(height/2);
	this.spacing=random(200);
	this.minlength=125;
	this.bottom=this.top+this.spacing+this.minlength;
	this.x=width;
	this.w=20;
	this.speed=mult;
	this.highlight=false;

	this.show = function(){
		fill(255);
		if (this.highlight){
			fill(255,0,0);
		}
		rect(this.x,0,this.w,this.top);
		rect(this.x,this.bottom,this.w,height-this.bottom);

	}

	this.update = function(){
		this.x-=this.speed;
	}

	this.intersect = function(){
			if (this.x+this.w > bird.x && this.x-this.w < bird.x){
				if (bird.y > this.bottom || bird.y < this.top){
					this.highlight=true;
					running=false;
					textSize(32);
    				fill(255);
    				text("Game over!", width*0.25, height*0.3);
    				text("Score: " + score, width*0.20, height*0.4);
    				text("Press enter to restart! ", width*0.20, height*0.5);
					gameOver=true;
					keyPressed(gameOver);
				}
			}
		}

}

