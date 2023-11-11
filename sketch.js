var bg, bg_img 
var player, shooter_img, shooter_shooting_img, shooter_sleep
var zombie
var zombie_img 
var zombie_grp 
var heart1, heart2, heart3
var heart1_img, heart2_img, heart3_img
var bullets = 80
var gameState = "fight"
var bullet,bullet_grp
var sound

function preload(){
  shooter_img = loadImage("assets/shooter_2.png")
  shooter_shooting_img = loadImage("assets/shooter_3.png")
  bg_img = loadImage("assets/bg.jpeg")
  shooter_sleep = loadImage("assets/shooter_1.png")
  zombie_img = loadImage("assets/zombie.png")
  heart1_img = loadImage("assets/heart_1.png")
  heart2_img = loadImage("assets/heart_2.png")
  heart3_img = loadImage("assets/heart_3.png")
  sound = loadSound("assets/lose.mp3")
}

function setup(){
  createCanvas(windowWidth, windowHeight)
  bg = createSprite(displayWidth/2 , displayHeight/2, 250,100)
  bg.addImage(bg_img)
  bg.scale = 1.2
  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visibile = false 
  heart1.addImage(heart1_img)
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth-100,40,20,20)
  heart2.visibile = false 
  heart2.addImage(heart2_img)
  heart2.scale = 0.4

  heart3 = createSprite(displayWidth-150,40,20,20)
  heart3.addImage(heart3_img)
  heart3.scale = 0.4

  player = createSprite(displayWidth-1150, displayHeight-300, 50,50)
  player.addImage(shooter_img)
  player.scale = 0.5

  zombie_grp = new Group()
  bullet_grp = new Group()
}

function draw(){
  background(0)
  if (gameState=='fight'){

  if (keyDown('DOWN_ARROW')){
    player.y = player.y + 30
  }
  if (keyDown('UP_ARROW')){
    player.y = player.y - 30
  }
  if (keyDown('RIGHT_ARROW')){
    player.x = player.x + 30 
  }
  if (keyDown('LEFT_ARROW')){
    player.x = player.x - 30
  }
  if (keyWentDown('X')){
    bullet = createSprite(displayWidth-1150,player.y-30,20,10)
    bullet.velocityX = 20
    bullet_grp.add(bullet)
    player.depth = bullet.depth
    player.depth = player.depth+2
    player.addImage(shooter_shooting_img)
    bullets = bullets - 1
    sound.play()
  }
  else if (keyWentUp('X')){
    player.addImage(shooter_img)
  }
  if (keyWentDown('Z')){
    player.addImage(shooter_sleep)
  }
  else if (keyWentUp('Z')){
    player.addImage(shooter_img)
  }
  if (zombie_grp.isTouching(player)){
    for (var i = 0 ; i < zombie_grp.length; i++){
      if (zombie_grp[i].isTouching(player)){
        zombie_grp[i].destroy()
      }
    }
  }
  if (zombie_grp.isTouching(bullet_grp)){
    for (var i = 0 ; i < zombie_grp.length; i++){
      if (zombie_grp[i].isTouching(bullet_grp)){
        zombie_grp[i].destroy()
        bullet_grp.destroyEach()
      }
    }
  }
  if (bullets == 0){
    gameState = "bullet"
  }
  enemies()
}
  if (gameState == "lost"){
    textSize(100)
    fill('white')
    text('LOSER!',400,400)
    player.destroy()
    zombie_grp.destroyEach()
  }
  else if (gameState == 'won'){
    textSize(100)
    fill('white')
    text("You won",400,400)
    player.destroy()
    zombie_grp.destroyEach()
  }
  else if (gameState == bullet){
    textSize(100)
    fill('white')
    text("Ops! You ran out of bullets",400,400)
    player.destroy()
    zombie_grp.destroyEach()
  }

  drawSprites()
  textSize(20)
  fill('red')
  text('Bullets left='+bullets,displayWidth-210,displayHeight/2 - 250)

}

function enemies(){
  if (frameCount%50 === 0 ){
    zombie = createSprite(random(500,1100),random(100,500),40,40)
    zombie.addImage(zombie_img)
    zombie.scale = 0.15
    zombie.velocityX = -1
    zombie.debug = true
    zombie.setCollider("rectangle",0,0,400,400)
    zombie.lifetime = 400
    zombie_grp.add(zombie)
  }
}