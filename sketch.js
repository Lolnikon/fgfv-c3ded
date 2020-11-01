var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score, ground

function preload(){
  
  
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 600);
  
  
  
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  monkey.debug = true
  monkey.setCollider("circle",0,0,330)
  
  ground = createSprite(300,350,600,10);
  //ground.x = ground.width /2;
  //ground.velocityX = -(6 + 3*score/100);
  
  ground.visible = false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}
  

  



function draw() {

    background("white")
  text("score:"+score, 500, 50);
  
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    spawnObstacles();
    spawnBanana();
    
    
     if(monkey.isTouching(obstaclesGroup)){
       gameState = END;
       
     }
       
    if(keyDown("space") && monkey.y >= 100){ 
        monkey.velocityY = -12;
        
    }
    monkey.velocityY = monkey.velocityY + 0.8
  
    if(monkey.isTouching(FoodGroup)){
      score = score+100
      
      
    }
      
    
  
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    
    }
  }
  
  else if(gameState===END){
    monkey.velocityY = 0;
   obstaclesGroup.setVelocityXEach(0)
  obstaclesGroup.setLifetimeEach(-1)
  ground.velocityX = (0 + score/100);
  FoodGroup.setLifetimeEach(-1)
   FoodGroup.setVelocityXEach(0)  
    
    
    
    
    
  
    
    
  }   
    
  
    
    
  monkey.collide(ground);  
   
    
    
  
    
drawSprites();
}
  


function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(600,320,10,40);
   obstacle.debug = true
   obstacle.setCollider("circle",0,0,150)
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    
      obstacle.addImage(obstacleImage);
              
   
    
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnBanana(){
 if (frameCount % 180 === 0){
   var banana = createSprite(600,200,10,40);
   banana.velocityX = -(6 + score/100);
   
    //generate random obstacles
    
      banana.addImage(bananaImage);
              
   
    
   
    //assign scale and lifetime to the obstacle           
    banana.scale = 0.1;
    banana.lifetime = 300;
   
   //add each obstacle to the group
    FoodGroup.add(banana);
 }
}




