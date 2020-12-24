var ground;
var backGround, backGroundImage;
var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var invisibleGround;
var bananaGroup;
var obstacleGroup;
var bananaImage;
var survivalTime = 0;
var life=0;
var gameState=PLAY;
var PLAY=1
var END=2
var restartImg,restart;
var gameOver, gameOverImg;
var monkeyEnd;
function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  backGroundImage = loadImage("forest.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bananaImage = loadImage("banana.png")
  restartImg=loadImage("restart.png")
  gameOverImg=loadImage("gameover.png")
  monkeyEnd=loadImage("monkey.png")

}



function setup() {
  createCanvas(600, 200);
  backGround = createSprite(300, 100, 600, 200);
  backGround.addImage(backGroundImage);
  backGround.x = backGround.width / 2;
  backGround.scale = 2
  //ground=createSprite(300,193,600,5);
  //ground.x = ground.width /2;
  monkey = createSprite(50, 160, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1
  invisibleGround = createSprite(200, 195, 300, 5);
  invisibleGround.visible = false;
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  restart = createSprite(300,120);
  restart.addImage(restartImg);
  restart.scale=0.3
  restart.visible=false;
 gameOver = createSprite(300,140   );
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.4
 gameOver.visible=false;
}


function draw() {
  background("white");
  //ground.velocityX = -4
  //if (ground.x < 0){
  //ground.x = ground.width/2;
  // }
   
  //if(gameState===PLAY){
  if (keyDown("space") && monkey.y >= 100) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8
  backGround.velocityX = -4
  if (backGround.x < 0) {
    backGround.x = backGround.width / 2;
  }
  monkey.collide(invisibleGround);
  spawnBanana();
  spawnObstacle();
  if (bananaGroup.isTouching(monkey)) {
    bananaGroup.destroyEach();
    survivalTime = survivalTime + 2
  }
  if (obstacleGroup.isTouching(monkey)) {
    obstacleGroup.destroyEach();
    monkey.scale = monkey.scale/1.5
    life=life+1
  }
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  //survivalTime=survivalTime+Math.round(getFrameRate()/55)
  text("Survival Time:" + survivalTime, 400, 20);
 // }
  if (life===2){
    gameState=END;
  }
  if(gameState===END){
    backGround.velocityX = 0;
      monkey.velocityY = 0
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
    //restart.visible=true;
    gameOver.visible=true;
    monkey.addImage(monkeyEnd)
    //if(mousePressedOver(restart)) {
      //reset();
    //}

  }

  



}

function spawnBanana() {
  if (frameCount % 200 === 0) {
    banana = createSprite(600, 40, 40, 10);
    banana.y = Math.round(random(10, 100));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;

    //assign lifetime to the variable
    banana.lifetime = 220;

    //add each cloud to the group
    bananaGroup.add(banana);
  }
}

function spawnObstacle() {
  if (frameCount % 180 === 0) {
    obstacle = createSprite(600, 180, 40, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    obstacle.lifetime = 180;
    //obstacle.depth = monkey.depth;
    //monkey.depth = monkey.depth + 1;
    obstacleGroup.add(obstacle);
  }
}
switch (survivalTime) {
  case 10:
    monkey.scale = 0.15;
    break;
  case 20:
    monkey.scale = 0.15;
    break;
  case 30:
    monkey.scale = 0.15;
    break;
  case 40:
    monkey.scale = 0.15;
    break;
  case 50:
    monkey.scale = 0.15;
    break;
  case 60:
    monkey.scale = 0.15;
    break;
  default:
    break;

}
function reset(){
  gameState=PLAY;
  restart.visible=false;
  gameOver.visible=false;
  obstacleGroup.destroyEach();
  bananaGroup.destroyEach();
  survivalTime=0;

}