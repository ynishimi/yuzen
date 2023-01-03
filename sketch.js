let walker = [];
let file;
let coordinate = [];
let count = 0;

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
  }
}

function draw() {
  //薄く塗っていく(red,green,blue,alpha)
  fill(0,10);
  rect(0,0,960,540);
  walker[count].draw();
  count++;
}

class Walker {
  constructor(numCoordinate) {
    this.position = createVector(parseInt(coordinate[numCoordinate][0]), parseInt(coordinate[numCoordinate][1]));
  }

  draw() {
    // this.velocity = createVector(random(-2,2), random(-2,2));
    // this.position.add(this.velocity);

    //円を表示
    // noStroke();
    // fill(255,50);
    // circle(this.position.x, this.position.y, 20);


    //画像の色をかえたり薄くしたりする
    // tint(255,255,0);
    //画像を表示(x, y, width, height)
    // rotate();
    image(img,this.position.x, this.position.y, 50, 50);
  }
}

