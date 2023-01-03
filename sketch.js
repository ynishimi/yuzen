let walker = [];
let particle = [];
let file;
let coordinate = [];
let count = 0;
let countTemp = 0;

function preload() {
  //座標ファイルを読み込み
  file = loadStrings('coordinates.txt');
  img = loadImage('flower_example.png');
}

function setup() {
  createCanvas(960, 540);
  frameRate(30);
  background(0);
  //座標をxとyに分割
  for(let i=0; i<file.length;i++) {
    coordinate[i] = file[i].split(',');
  }
  for(let i=0;i<file.length;i++)
  {
    walker[i] = new Walker(i);
    particle[i] = new Particle(parseFloat(coordinate[i][0]), parseFloat(coordinate[i][1]));
  }
}

function draw() {

  //薄く背景を塗っていく(red,green,blue,alpha)
  fill(0,5);
  
  rect(0,0,960,540);  
  if (count % 90 == 0){  
    countTemp = count;
  } 
  particle[count].draw();
  walker[countTemp].draw();
  count++;
}

class Particle {
  constructor(x,y) {
    // x += random(-10,10);
    // y += random(-10,10);
    this.position = createVector(x, y);
  }
  draw(){
    this.velocity = createVector(random(-30,30), random(-30,30));
    this.position.add(this.velocity);

    //円を表示
    noStroke();
    fill(255,100);
    circle(this.position.x, this.position.y, 2.5);
    circle(this.position.x, this.position.y, 2.5);
  }
}

class Walker {
  constructor(numCoordinate) {
    this.position = createVector(parseFloat(coordinate[numCoordinate][0]), parseFloat(coordinate[numCoordinate][1]));
  }

  draw() {
    //画像の色をかえたり薄くしたりする
    tint(255,20);
    //画像を表示(x, y, width, height)
    // rotate();
    image(img,this.position.x, this.position.y, 100, 100);
  }
}

