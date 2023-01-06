let walker = [];
let particle = [];
let file;
let flowerImages = [];
let coordinate = [];
let count = 0;
let countTemp = 0;
let coordinateFlowers = [];
let countFlowers = 0;
let chooseFlower = [];
let x, y, vx, vy;
let flag;
let timestamp;
const canvasX = 960;
const canvasY = 1080;
let trX = canvasX - 100;
let trY = canvasY - 100;

let time = 180*30;

function setup() {
  createCanvas(canvasX, canvasY);
  frameRate(30);
  background(0);
  x = 100;
  y = 100;
  vx = 5;
  vy = 1;
  flag = 1;
  timestamp = 0;

  for (i=0;i<time;i++){
    if(flag%2){
      x += vx;
      if(x < width/2){vx=vx+0.5;}
      else{vx = vx - 0.5;}
    }
    else{
      x -= vx;
      y += vy;
      if(x > width/2){
          vx = vx + 0.5;
          vy = vy + 0.1;
        }
      else{
          vx = vx - 0.5;
          vy = vy - 0.1;
        }
    }
    if(x < (canvasX - trX) || x > trX){ 
    flag++;
    vx = 0;
    vy = 0;
    // console.log(flag);
    }
    x = constrain(x, canvasX - trX, trX);
    y = constrain(y, canvasY - trY, trY);
    coordinate.push([x,y]);
  }
  for(let i=0;i<time;i++){
    particle[i] = new Particle(parseFloat(coordinate[i][0]), parseFloat(coordinate[i][1]));
  }
}

function draw() {
  //薄く背景を塗っていく(red,green,blue,alpha)
  switch (chooseFlower.slice(-1)[0]) {
    //赤
    case 0:
      fill(255,173,173,5);
      break;
    //青
    case 1:
      fill(198,198,255,5);
      break;
  }
  fill(0,10); //test
  rect(0,0,canvasX,canvasY); //test
   
  // particle[count].createParticle(); //test
  particle[count].createCircle(); //test
  particle[count].joinParticles(particle.slice(count)); //test

  count++;
  if(count >= time) background(0);
}

class Particle {
  constructor(coordinateX,coordinateY) {
    // x += random(-10,10);
    // y += random(-10,10);
    this.x = coordinateX;
    this.y = coordinateY;
    this.r = 3;
    this.xSpeed = random(-2,2);
    this.ySpeed = random(-2,2);
  }
  createParticle() {
    noStroke();
    fill(255,100);
    circle(this.x,this.y, this.r);
  }
  createCircle() {
    stroke(255,150);
    strokeWeight(1);

    noFill();
    circle(this.x, this.y,600);
  }
  joinParticles(particles) {
    particles.forEach(element =>{
      let dis = dist(this.x,this.y,element.x,element.y);
      if(dis<100) {
        stroke(198,198,255,100);
        strokeWeight(3);
        line(this.x,this.y,element.x,element.y);
      }
    });
  }
}