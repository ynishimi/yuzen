let num = 100;
let walker = [];
let file;
let coordinate = [];

function preload() {
  //座標ファイルを読み込み
  file = loadStrings('coordinates.txt');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30)
  background(0);
  for(let i=0;i<num;i++)
  {
    walker[i] = new Walker();
  }
  for(let i=0; i<file.length;i++) {
    coordinate[0] = file[i].split(',');
    console.log(coordinate[0]);
  }


}

function draw() {
  //薄く塗っていく(red,green,blue,alpha)
  fill(0,5);
  rect(0,0,width,height);
  for(let i=0;i<num;i++) {
    walker[i].draw();
  }
}

class Walker {
  constructor() {
    this.position = createVector(width/2, height/2);
  }

  draw() {
    this.velocity = createVector(random(-2,2), random(-2,2));
    this.position.add(this.velocity);
    noStroke();
    fill(255,30);
    circle(this.position.x, this.position.y, 20);
  }
}