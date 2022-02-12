
var trex ,trex_running;
var ground,ground_image
var invisground
var cloud,cloudimage
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var score = 0
var obstaclegroup,cloudgroup
var PLAY = 1
var END = 0
var gamestate = PLAY
var trexcollided
var gameover,gameoverimage
var restart,restartimage
var die
var checkpoint
var jump
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
  ground_image = loadImage("ground2.png")
  cloudimage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  trexcollided = loadImage("trex_collided.png")
  gameoverimage = loadImage("gameOver.png")
  restartimage = loadImage("restart.png")
  die = loadSound("die.mp3")
  checkpoint = loadSound("checkpoint.mp3")
  jump = loadSound("jump.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
    //create a trex sprite
  trex = createSprite(100,height-70,10,10)
  trex.addAnimation("running",trex_running)
  trex.addAnimation("collided",trexcollided)
  trex.scale = 0.5
  trex.setCollider("circle",0,0,30)
  ground = createSprite(width/2,height,width,20)
  ground.addImage(ground_image)
  invisground = createSprite(width/2,height-10,width,20)
  invisground.visible = false
  obstaclegroup = new Group()
  cloudgroup = new Group()
  gameover = createSprite(width/2,height/2-50,300,100)
  gameover.addImage(gameoverimage)
  gameover.scale = 0.5
  restart = createSprite(width/2,height/2,150,150)
  restart.addImage(restartimage)
  restart.scale = 0.25
}

function draw(){
  background("white")
  if(gamestate == PLAY){
    if(keyDown("space")&&trex.y>height-300){
      trex.velocityY = -12
      jump.play()
    }
    trex.velocityY += 0.5
    ground.velocityX = -(5+score/100)
    if(ground.x < 0){
      ground.x = 300
    }
    score = score + Math.round(frameCount/360)
    if(score>0&&score%300==0){
      checkpoint.play()
    }
    spawnclouds()
    spawnobstacles()
    gameover.visible = false
    restart.visible = false
if(trex.isTouching(obstaclegroup)){
  gamestate = END
  die.play()
}
  }
  else if(gamestate == END){
trex.velocityY = 0
ground.velocityX = 0
obstaclegroup.setVelocityXEach(0)
cloudgroup.setVelocityXEach(0)
trex.changeAnimation("collided",trexcollided)
obstaclegroup.setLifetimeEach(-1)
cloudgroup.setLifetimeEach(-1)
gameover.visible = true
restart.visible = true
if(keyDown("space")){
  gamestate == PLAY
}
  }
  
  
  trex.collide(invisground)
  
  
  text("Score " +score,width/2,height-200)
  
  if(mousePressedOver(restart)){
    reset()
  }
  drawSprites()
}
function spawnclouds(){
  if(frameCount % 60 === 0){
cloud = createSprite(width+20,random(height-100,height-360))
cloud.addImage(cloudimage)
cloud.scale = 0.8
cloud.velocityX = -2
cloud.depth = trex.depth
trex.depth = trex.depth + 1
cloud.lifetime = 500
cloudgroup.add(cloud)
  }

}
function spawnobstacles(){
  if(frameCount % 60 === 0){
    obstacle = createSprite(width+20,height-15)
    var rand = Math.round(random(1,6))
    switch(rand){
      case 1:obstacle.addImage(obstacle1)
      break;
      case 2:obstacle.addImage(obstacle2)
      break;
      case 3:obstacle.addImage(obstacle3)
      break;
      case 4:obstacle.addImage(obstacle4)
      break;
      case 5:obstacle.addImage(obstacle5)
      break;
      case 6:obstacle.addImage(obstacle6)
      break;
      default:break;
    }
    obstacle.velocityX = -(5+score/100)
    obstacle.scale = 0.5
    obstaclegroup.add(obstacle)
    
  }
}
function reset(){
  gamestate = PLAY
  score = 0
  gameover.visible= false
  restart.visible = false
  obstaclegroup.destroyEach()
  cloudgroup.destroyEach()
  trex.changeAnimation("running",trex_running)
}