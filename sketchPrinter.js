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
}

function draw() {
  ellipse(x, y, 10);
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
    console.log(flag);
  }
  x = constrain(x, canvasX - trX, trX);
  y = constrain(y, canvasY - trY, trY);

  //軌跡を消していく
  fill(255,5);
  rect(0,0,width,height); 
   
  // for(let i=0;i<file.length;i++)
  // {
  //   particle[i] = new Particle(parseFloat(coordinate[i][0]), parseFloat(coordinate[i][1]));
  // }
  // particle[count].createParticle();
  // particle[count].joinParticles(particle.slice(count));

  // count++;
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
  joinParticles(particles) {
    particles.forEach(element =>{
      let dis = dist(this.x,this.y,element.x,element.y);
      if(dis<5) {
        strokeWeight(0.6);
        stroke(250,100,100);
        line(this.x,this.y,element.x,element.y);
      }
    });
  }
}

