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
let minX=960;
let minY=1080;
let maxX = 0;
let maxY = 0;
const canvasX = 960;
const canvasY = 1080;

function preload() {
  //座標ファイルを読み込み
  file = loadStrings('coordinates.txt');
  flowerImages[0] = loadImage('flower_example.png');
  flowerImages[1] = loadImage('flower_blue.png');
}

function setup() {
  createCanvas(canvasX, canvasY);
  frameRate(30);
  background(255); //test
  //座標をxとyに分割
  for(let i=0; i<file.length;i++) {
    coordinate[i] = file[i].split(',');
  }
  for(let i=0; i<file.length;i++) {
    if(minX > coordinate[i][0]){
      minX = coordinate[i][0];
    }
    if(minY > coordinate[i][1]){
      minY = coordinate[i][1];
    }
  }


  for(let i=0;i<file.length;i++){
    coordinate[i][0] -= (minX-30);
    coordinate[i][1] -= (minY-30);
  }
  for(let i=0;i<file.length;i++) {
    if(maxX < coordinate[i][0]){
      maxX = coordinate[i][0];
    }
    if(maxY < coordinate[i][1]){
      maxY = coordinate[i][1];
    }
  }
  // console.log(maxY);
  for(let i=0;i<file.length;i++){
    coordinate[i][0] *=(canvasX/maxX);
    coordinate[i][1] *=(canvasY/maxY);
  }
  for(let i=0;i<file.length;i++){
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
  fill(255,10); //test
  rect(0,0,canvasX,canvasY); //test

  // particle[count].createParticle(); //test
  particle[count].createCircle(); //test
  // console.log(particle.slice(count));
  particle[count].joinParticles(particle.slice(count)); //test

  if (count % 90 == 0){
    // 花の種類を選ぶ
    chooseFlower.push(floor(random() * 2));
    // console.log(chooseFlower[countFlowers]);     
    walker[countFlowers] = new Walker(count); 
    coordinateFlowers.push(coordinate[count]);
    countFlowers ++;
  } 
  for(let i = 0;i<countFlowers;i++) {
    walker[i].draw(chooseFlower[i]); //test
  }

  count++;
  if(count >= file.length) background(0);
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
    stroke(0,150);
    strokeWeight(1);

    noFill();
    circle(this.x, this.y,600);
  }
  joinParticles(particles) {
    particles.forEach(element =>{
      let dis = dist(this.x,this.y,element.x,element.y);
      if(dis<100) {

        switch (chooseFlower.slice(-1)[0]) {
          //赤
          case 0:
            stroke(255,173,173,30);
            break;
          //青
          case 1:
            stroke(198,198,255,50);
            break;
        }
        // stroke(250,100,0,10);
        strokeWeight(3);
        line(this.x,this.y,element.x,element.y);
      }
    });
  }
}

class Walker {
  constructor(numCoordinate) {
    this.position = createVector(parseFloat(coordinate[numCoordinate][0]), parseFloat(coordinate[numCoordinate][1]));
    this.angle = random(0,PI);
  }

  draw(i) {
    //画像の色をかえたり薄くしたりする
    tint(255,10);
    //画像を表示(x, y, width, height)
    
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    image(flowerImages[i],0, 0, 70, 70);
    pop();
    


  }
}

