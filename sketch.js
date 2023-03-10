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

let angle;
let ranX = [];
let ranY = [];
let nowX;
let nowY;
//randomCircleのグネグネ度
const stepSize = 2;
//画像の個数
const imageNum = 7;
//randomCircleの頂点の数
const formResolution = 10;
//randomCircleの半径
const initRadius = 400;
const lineAlpha = 30;
const backAlpha = 5;
const canvasX = 960;
const canvasY = 1080;

function preload() {
  //座標ファイルを読み込み
  file = loadStrings('coordinates.txt');
  flowerImages[0] = loadImage('images/flower_0.png');
  flowerImages[1] = loadImage('images/flower_1.png');
  flowerImages[2] = loadImage('images/flower_2.png');
  flowerImages[3] = loadImage('images/flower_3.png'); 
  flowerImages[4] = loadImage('images/flower_4.png');
  flowerImages[5] = loadImage('images/flower_5.png'); //wip
  flowerImages[6] = loadImage('images/flower_6.png'); //wip
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
    console.log(coordinate[i][0]);
    if(minX > coordinate[i][0]){
      minX = coordinate[i][0];
      console.log(minX);
    }
    if(minY > coordinate[i][1]){
      minY = coordinate[i][1];
    }
    
  }


  for(let i=0;i<file.length;i++){
    coordinate[i][0] -= (minX);
    coordinate[i][1] -= (minY);
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
    coordinate[i][0] *=((canvasX+100)/maxX);
    coordinate[i][1] *=((canvasY+100)/maxY);
  }
  nowX = coordinate[0][0];
  nowY = coordinate[1][0];
  // console.log(coordinate.length);
  for(let i=0;i<file.length;i++){
    particle[i] = new Particle(parseFloat(coordinate[i][0]), parseFloat(coordinate[i][1]));
  }
  //randomCircleの準備
  angle = radians(360 / formResolution)
  for (let i = 0; i < formResolution; i++) {
    ranX.push(cos(angle * i) * initRadius);
    ranY.push(sin(angle * i) * initRadius);
      // console.log(ranX[i]); 
  }
}

function draw() {
  //録画
  // if (frameCount === 1) {
  //   const capture = P5Capture.getInstance();
  //   capture.start({
  //     format: "webm",
  //     duration: (coordinate.length-5),
  //   });
  // }

  //薄く背景を塗っていく(red,green,blue,alpha)
  fill(255,1); //test
  rect(0,0,canvasX,canvasY); //test

  // particle[count].createParticle(); //test
  // particle[count].createCircle(); //test

 try {
  particle[count].createRandomCircle();
  // console.log(particle.slice(count));
  particle[count].joinParticles(particle.slice(count)); //test

  if (count % 90 == 0){
    // 花の種類を選ぶ
    chooseFlower.push(floor(random() * imageNum));

    walker[countFlowers] = new Walker(count); 
    coordinateFlowers.push(coordinate[count]);
    countFlowers ++;
    
  } 
  } catch(e) {
  fill(255,10); //test
  rect(0,0,canvasX,canvasY); //test
  }

  for(let i = 0;i<countFlowers;i++) {
    walker[i].draw(chooseFlower[i]); //test
  }
  nowX = coordinate[count][0];
  nowY = coordinate[count][1];
  count++;
  // console.log(count/30);
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
    // this.diffX = nowY + 0.9 * (this.x - nowX);
    // this.diffY = nowX + 0.9 *(this.y - nowY);
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
  //背景を薄く染めていく
  createRandomCircle() {
    for (let i = 0; i < formResolution; i++) {
      ranX[i] += random(-stepSize, stepSize);
      ranY[i] += random(-stepSize, stepSize);
    }
    switch (chooseFlower.slice(-1)[0]) {
      //赤
      case 0:
        fill(255,173,173,backAlpha);
        break;
      //紫
      case 1:
        fill(198,198,255,backAlpha);
        break;
      //黄
      case 2:
        fill(254,245,168,backAlpha);
        break;
      //黄緑
      case 3:
        fill(166,204,73,backAlpha);
        break;
      //青
      case 4:
        fill(147,112,219,backAlpha);
        break;
      //緑
      case 5:
        fill(153,238,157,backAlpha);
        break;
      //灰色
      case 6:
        fill(255,backAlpha);
    }
    // stroke(0, 10);
    noStroke();
    strokeWeight(2);
    //複雑な図形を生成
    beginShape();
    curveVertex(ranX[formResolution-1]+this.x, ranY[formResolution-1]+this.y);

    // only these points are drawn
    for (let i = 0; i < formResolution; i++) {
      curveVertex(ranX[i]+this.x, ranY[i]+this.y);
    }
    curveVertex(ranX[0]+this.x, ranY[0]+this.y);      
    curveVertex(ranX[1]+this.x, ranY[1]+this.y);
    endShape();

  }
  joinParticles(particles) {
    particles.forEach(element =>{
      let dis = dist(this.x,this.y,element.x,element.y);
      if(dis<70) {
        switch (chooseFlower.slice(-1)[0]) {
          //赤
          case 0:
            // stroke(255,173,173,lineAlpha);
            stroke(195,139,167,lineAlpha);
            break;
          //紫
          case 1:
            // stroke(198,198,255,lineAlpha);
            stroke(116,113,228,lineAlpha);
            break;
          //黄
          case 2:
            // stroke(198,198,255,lineAlpha);
            stroke(236,186,68,lineAlpha);
            break;
          //黄緑
          case 3:
            // stroke(50,205,50,lineAlpha);
            stroke(50,183,68,lineAlpha);
            break;
          //青
          case 4:
            stroke(50,90,205,lineAlpha);
            // stroke(198,198,255,lineAlpha);
            break;
          //緑
          case 5:
            stroke(50,121,64,lineAlpha);
            break;

          case 6:
          //灰
            stroke(100,lineAlpha);
            break;
        }
        // stroke(250,100,0,10);
        strokeWeight(1);
        line(this.x,this.y,element.x,element.y);
      }
    });
  }
}

class Walker {
  constructor(numCoordinate) {
    this.position = createVector(parseFloat(coordinate[numCoordinate][0]), parseFloat(coordinate[numCoordinate][1]));
    this.angle = random(-PI/6,PI/6);
    this.size = random(60,90);
  }

  draw(i) {
    //画像の色をかえたり薄くしたりする
    tint(255,15);
    //画像を表示(x, y, width, height)
    
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    image(flowerImages[i],0, 0, this.size, this.size);
    pop();
    


  }
}

