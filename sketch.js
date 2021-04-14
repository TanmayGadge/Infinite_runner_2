
var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground, gameState = "play";
var survivalTime = 0;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  monkey_steady = loadImage("sprite_0.png");

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backgroundImg = loadImage("jungle.jpg");

}



function setup() {
  createCanvas(600, 600);
  monkey = createSprite(25, 505, 10, 10);
  monkey.addAnimation("runnning", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(200, 540, 800, 10);
  FoodGroup = new Group();
  obstacleGroup = new Group();
  ground.velocityX = -5;

  score = 0;




}


function draw() {
  background(backgroundImg);

  stroke("black");
  textSize(20);
  fill("white");
  text("score: " + score, camera.x + 100, 50);
  
  stroke("black");
  textSize(20);
  fill("white");
text("survival Time: " + survivalTime, camera.x - 100, 50);

  camera.x = monkey.x;
  ground.width += 30;

  if (gameState === "play") {

    monkey.velocityX = 5;


    survivalTime = Math.ceil(frameCount / frameRate());
    

    if (keyDown("space") && monkey.y > 503) {
      monkey.velocityY = -5;
    }

    if (monkey.y < 503) {
      monkey.velocityY += 0.15;
    }

    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score += 1;
    }

    // ground.x = ground.width/2;
    monkey.collide(ground);

    spawnBanana();
    spawnObstacles();
          
    if (obstacleGroup.isTouching(monkey)) {
      gameState = "end";
    }
  }

  if (gameState === "end"){
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    monkey.changeImage(monkey_steady);
    score = 0;
    textSize(30);
    stroke("black");
    fill("white");
    text("Game Over", 300, 300);
  }

  drawSprites();
}


function spawnBanana() {
  if (frameCount % 80 === 0) {
    banana = createSprite(camera.x + 300, 500, 10, 10);
    banana.y = Math.round(random(380, 440));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    // banana.velocityX = -5;
    banana.lifetime = 80;
    FoodGroup.add(banana);
    // console.log(FoodGroup[0]);
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(camera.x + 400, 520, 20, 20);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;
    // obstacle.velocityX = -5;
    obstacle.lifetime = 80;
    obstacleGroup.add(obstacle);
  }
}

