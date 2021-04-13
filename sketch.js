
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var survivalTime = 0;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
}



function setup() {
  createCanvas(600, 600);
  monkey = createSprite(25, 335, 10, 10);
  monkey.addAnimation("runnning", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200, 370, 800, 10);
  FoodGroup = new Group();
  obstacleGroup = new Group();
  ground .velocityX = -5;
  
  score = 0;

  
  
}


function draw() {
  background("white");
  //console.log(monkey.y);
  
  stroke("black");
  textSize(20);
  fill("black");
  text("score: "+ score, camera.x+100, 50);

  monkey.velocityX = 5;
  camera.x = monkey.x;
  ground.width += 30;
  
  if(keyDown("space")&& monkey.y > 333){
    monkey.velocityY = -12;
  }
  
  if(monkey.y < 335){
    monkey.velocityY += 0.4;
  }
  
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score += 1;
  }

  /*
  if(obstacleGroup.isTouching(monkey)){
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    monkey.changeAnimation("steady", )
    score = 0;
  }
  */
  // ground.x = ground.width/2;
  monkey.collide(ground);
  
  stroke("black");
  textSize(20);
  fill("black");survivalTime = Math.ceil(frameCount/frameRate());
  
  text("survival Time: "+ survivalTime, camera.x-100, 50);
  
  spawnBanana();
  spawnObstacles();
  
  drawSprites();
} 

function spawnBanana(){
  if(frameCount % 80 === 0){
    banana = createSprite(camera.x+300, 200, 10, 10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    // banana.velocityX = -5;
    banana.lifetime = 80;
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(camera.x+400, 350, 20, 20);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;
    // obstacle.velocityX = -5;
    obstacle.lifetime = 80;
    obstacleGroup.add(obstacle);
  }
}


