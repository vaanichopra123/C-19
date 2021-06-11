var tower, towerImg;
var door,doorImg,doorsGroup;
var climber, climberImg, climberGroup;
var ghost,ghostImg;
var invisibleBlock, invisibleBlockGroup;
var spookySpound;

var gameState = "PLAY";

function setup(){
  createCanvas (600,600);
  
  tower = createSprite (300,300)
  tower.addImage (towerImg);
  tower.velocityY = 4;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage (ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
}

function preload(){
  towerImg = loadImage("tower.png");
  doorImg= loadImage("door.png");
  climberImg = loadImage ("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function draw(){
  background (0);
  
  if (gameState === "PLAY"){
  
  if (tower.y>400){
    tower.y = 300;
  }
  
  if (keyDown("left_arrow")){
    ghost.x= ghost.x-3;
  }
  if (keyDown("space")){
    ghost.velocityY= -10;
  }
  if (keyDown("right_arrow")){
    ghost.x= ghost.x+3;
  }
  ghost.velocityY = ghost.velocityY +0.5;
  
  if (climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){     
  ghost.destroy();
  gameState = "END";
  }                                                              
  spookySound.loop();
  SpawnDoors();
  drawSprites();
  }
  
  
  if (gameState === "END"){
    stroke("yellow"); 
    fill("yellow"); 
    textSize(30); 
    text("Game Over", 230,250);
    spookySound.stop();
    
  }
  
}

function SpawnDoors(){
  if(frameCount % 240 ===0){
  door = createSprite (200,-50);
  door.velocityY =4;
  door.x = Math.round(random(120.400));
  door.addImage(doorImg);
  door.lifetime = 400;
  doorsGroup.add (door);
  ghost.depth = door.depth;
    ghost.depth +=1 ;
    
  climber = createSprite (200,10);
  climber.velocityY =4;
  climber.x = door.x
  climber.addImage(climberImg);
  climber.lifetime = 400;
  climberGroup.add (climber);
    
  invisibleBlock = createSprite(200,15); 
  invisibleBlock.width = climber.width; 
  invisibleBlock.height = 2;
  invisibleBlock.velocityY =4
  invisibleBlock.lifetime = 800;
  invisibleBlockGroup.add(invisibleBlock);
  invisibleBlock.x = door.x;
  } 
  }

