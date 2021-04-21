
var monkey , monkey_running,ground;
var banana ,bananaImg, obs, obsImage;
var bananaGroup, obsGroup;
var survivalTime=0;
var count=0;

function preload(){
  
  backgroundImage=loadImage("9ca8fe90a4080517154aafcbf29280ae.jpg")
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImg  = loadImage("banana.png");
  obsImage = loadImage("obstacle.png");
 
}



function setup() {
  
createCanvas(600,600);
  
   background = createSprite(300,250,0,0);
  background.addImage(backgroundImage);
  background.scale = 1;
  
  monkey=createSprite(150,390,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.2;
  
  ground=createSprite(250,450,700,10);
  ground.velocityX=-4;
  ground.shapeColor="green"
  
  bananaGroup= new Group();
  obsGroup= new Group();
  
  
}



function draw() {
  

   
  //survivalTime=Math.round(frameCount%frameRate())
  textSize(20);
  fill("black")
  text("Survival Time: "+survivalTime,300,110)
  
  text("death count: "+count,300,80);
  
  if(ground.x<200){
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY=-15;
  }
  
  if(bananaGroup.isTouching(monkey)){
    bananaGroup.destroyEach();
    survivalTime=survivalTime+1;
  }
  
  monkey.velocityY=monkey.velocityY+0.8;
  
  if(obsGroup.isTouching(monkey)){
  obsGroup.destroyEach();
  monkey.scale=0.1;
  count=count+1;
  }
  
  if(count===5){
    bananaGroup.destroyEach();
    obsGroup.destroyEach();
    monkey.destroy();
    text("Game Over",300,300);
  }
  monkey.collide(ground);
  
  obstacles();
  food();
  drawSprites();
}

function food(){
  
  if(frameCount%80===0){
    banana=createSprite(550,Math.round(random(120,200)),10,10);
    banana.addImage(bananaImg);
    banana.scale=0.1;
    banana.velocityX=-4;
    banana.lifetime=200;
     bananaGroup.add(banana);
  }
  
  
}

function obstacles(){
  if(frameCount%150===0){
    obs=createSprite(550,415,10,10);
    obs.addImage(obsImage);
    obs.velocityX=-4;
    obs.scale=0.2;
    obs.lifetime=200;
    obsGroup.add(obs);
  }
}

