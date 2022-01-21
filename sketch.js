var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obsTop1Img
var obsTopGroup
var obsTop2Img
var obsBottom1, obsBottom2, obsBottom3
var obsBottomGroup
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;

function preload(){
bgImg = loadImage("assets/bg.png")
obsTop1Img=loadImage("assets/obsTop1.png")
obsTop2Img=loadImage("assets/obsTop2.png")
obsBottom1=loadImage("assets/obsBottom1.png")
obsBottom2=loadImage("assets/obsBottom2.png")
obsBottom3=loadImage("assets/obsBottom3.png")
  restartImg=loadImage("assets/restart.png")
  gameOverImg=loadImage("assets/gameOver.png")
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
jumpSound = loadSound("assets/jump.mp3")
dieSound = loadSound("assets/die.mp3")
}

function setup(){
createCanvas (600,600);
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;
obsTopGroup = new Group ();
barGroup=new Group ();
obsBottomGroup = new Group ();

//creating gameOver and restart sprite
gameOver = createSprite(220,200);
restart = createSprite(220,240);
gameOver.addImage( gameOverImg);
gameOver.scale = 0.5;
gameOver.visible = false;
restart.addImage(restartImg);
restart.scale = 0.5;
restart.visible = false;


}

function draw() {
  
  background("black");
   if (gameState===PLAY){    
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            jumpSound.play();
            
          }
         Bar ();
          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
           spawnobstacles();
           spawnobstaclesBird();
           spawnobstaclesBottom();
        if (obsTopGroup.isTouching(balloon)||obsBottomGroup.isTouching(balloon)){
          gameState=END
          dieSound.play();
        }
          }
        if (gameState===END){
          gameOver.visible=true
          gameOver.depth=gameOver.depth+1
          restart.visible=true
          restart.depth=restart.depth+1
         balloon.velocityX=0;
         balloon.velocityY=0;
         obsTopGroup.setLifetimeEach(-1);
         obsBottomGroup.setLifetimeEach(-1);
         balloon.y=200
         if (mousePressedOver(restart)){
           reset()
         }
        }
   
        drawSprites();
        Score ();
        
} 
function spawnobstacles(){
  if (frameCount % 60 === 0) {
    var obsTop1 = createSprite(600,120,40,10);
    obsTop1.y = Math.round(random(80,120));
    obsTop1.addImage(obsTop1Img);
    obsTop1.scale = 0.1;
    obsTop1.velocityX = -3;
    
     //assign lifetime to the variable
    obsTop1.lifetime = 200;
    
    //adjust the depth
    obsTop1.depth = balloon.depth;
    balloon.depth = balloon.depth + 1;
    
    //add each cloud to the group
    obsTopGroup.add(obsTop1);
  }
}
function spawnobstaclesBird(){
  if (frameCount % 120 === 0) {
    var obsTop2 = createSprite(600,120,40,10);
    obsTop2.y = Math.round(random(80,120));
    obsTop2.addImage(obsTop2Img);
    obsTop2.scale = 0.1;
    obsTop2.velocityX = -2;
    
     //assign lifetime to the variable
    obsTop2.lifetime = 300;
    
    //adjust the depth
    obsTop2.depth = balloon.depth;
    balloon.depth = balloon.depth + 1;
    
    //add each cloud to the group
    obsTopGroup.add(obsTop2);
  }
}
function spawnobstaclesBottom() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -3
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obsBottom1);
              break;
      case 2: obstacle.addImage(obsBottom2);
              break;
      case 3: obstacle.addImage(obsBottom3);
              break;
     
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obsBottomGroup.add(obstacle);
  }
}
function Bar(){
  if (World.frameCount%60===0){
  var bar=createSprite(400,200,10,800)
  bar.velocityX=-6
  bar.depth=balloon.depth
  bar.lifetime=70
  bar.visible=false
  barGroup.add(bar)
  }
}
function Score(){
  if (balloon.isTouching(barGroup)){
    score=score+1
  }
  textFont("algerian")
  textSize(30)
  fill ("black")
  text ("Score: "+score , 250,50);
}
function reset(){
  gameState=PLAY
gameOver.visible=false
restart . visible=false
obsTopGroup.destroyEach();
obsBottomGroup.destroyEach();
score=0
}