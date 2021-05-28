var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ship, shipImage
var rock, rockImage

var rand
var rockSize
var gameover, gameoverImage



var restart, restartImg
var score 

var credit, creditImg
var explodeSound

var music
var bg, bgImg



function preload(){
shipImage = loadImage("ship.png");
  rockImage = loadImage("rock.png");
  gameoverImage = loadImage("gameover.png");
  restartImg = loadImage("replay.png");
  explodeSound = loadSound("explosion.mp3")
  music = loadSound("music.mp3")
  bgImg = loadImage("starbg.jpeg")
creditImg =loadImage("credit.png")

}

function setup() {
  
 createCanvas(windowWidth, windowHeight)
 bg = createSprite(700,600)
 bg.addImage(bgImg)
 bg.scale= 7;
 bg.y = bg.height/1
 //ship
  ship = createSprite(700,650,50,50)
  ship.addImage(shipImage)
  ship.scale = 0.1

ship.setCollider("rectangle",0,0,500,800);

  obstaclesGroup = createGroup();
  
  //gameover
gameover = createSprite(750,400);
gameover.addImage(gameoverImage);
  gameover.scale = 1;

  restart = createSprite(750,100)
  restart.addImage(restartImg)
  restart.scale = 0.5;

  

  
  credit = createSprite(765, 700)
  credit.addImage(creditImg);
  
  score = 0;
  
}

function draw() {
  
  background("black")
 
  
  
 if (gameState === PLAY){
   
  gameover.visible = false;
  bg.visible = true;
   obstaclesGroup.visible = true;
   restart.visible = false;
   credit.visible = false;
   ship.visible = true;
   score = score + Math.round(getFrameRate()/60);
   
   rocks();
   bg.velocityY = (2+score/100);
   if (bg.y > 500){
    bg.y = bg.height/10;
  }
  console.log(bg.y)
   
   if(keyWentDown("right")){
    ship.velocityX = 13;
}
if(keyWentUp("right")){
    ship.velocityX = 0;
}
if(keyWentDown("left")){
    ship.velocityX = -13;
}
if(keyWentUp("left")){
    ship.velocityX = 0;
}


if (obstaclesGroup.isTouching(ship)){
  
gameState = END;

explodeSound.play()
}

 }
  
   else if (gameState === END) {
     
    gameover.addImage(gameoverImage)
     gameover.visible = true;
     bg.visible = false
     
     restart.visible = true;
     obstaclesGroup.destroyEach()
     ship.visible = false;
     credit.visible = true;
     obstaclesGroup.setLifetimeEach(-1);
     obstaclesGroup.setVelocityYEach(0);
     ship.velocityX = 0;

     if (keyWentDown("r")){
       gameState = PLAY;
       score = 0;
     }
   }
    
  
  



  
  drawSprites();
  stroke("white")
  textSize(40)
  text("Score: "+ score, 50,60);
  }

  function rocks(){
    if (World.frameCount % 60 === 0){
    var rand = Math.round(random(windowWidth-2000,windowWidth))
    var rock = createSprite(rand,-10)
    rock.setCollider("rectangle",0,0,150,100);
    
     rock.addImage(rockImage)
    rock.velocityY = 14;
    var rockSize = Math.round(random(1,3.5))
      rock.scale =rockSize;
      rock.lifetime = 135;
    
      obstaclesGroup.add(rock);
    }
    
    
    
  }