var isGameOver;
var player;
var playerImage;
var playerImageFlipped;
var enemy;
var enemyImage;
var collect;
var collectImage;
var backgroundImage;
var collectSound;
var gameoverSound;
var t=setInterval(createNewCollect,2000);
var t=setInterval(createNewEnemy,5000)

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
      this.sound.volume = 0.3;
    }
    this.stop = function(){
      this.sound.pause();
    }
  }
  
function preload() {
  playerImage = loadImage("https://i.imgur.com/dQlBCQz.png");
  playerImageFlipped = loadImage("https://i.imgur.com/vIxRdcD.png");
  enemyImage = loadImage("https://i.imgur.com/PM3TNfU.png");
  collectImage = loadImage("https://i.imgur.com/BBZvl6m.png")
  backgroundImage = loadImage("https://i.imgur.com/wRoEcmx.jpg");
  collectSound = new sound("monkeydodge/collecttrack.mp3");
  gameoverSound = new sound("monkeydodge/gameovertrack.wav");
  backgroundSound = new sound("monkeydodge/backgroundtrack.mp3");
  backgroundSound.loop = true
}

function setup() {
  isGameOver = false;
  createCanvas(window.innerWidth*.98, window.innerHeight*.70);
  player = createSprite(width / 2, height - (playerImage.height / 2), 0, 0);
  player.addImage(playerImage);
  player.scale = 0.8;
  player.setCollider("rectangle",0,0,70,65);
  enemygroup = []
  enemy = createSprite(width / 2, 0, 0, 0);
  enemy.addImage(enemyImage);
  enemygroup.push(enemy)
  collectgroup = []
  collect = createSprite(width / 4, 0, 0, 0);
  collect.addImage(collectImage);
  collectgroup.push(collect)
  score = 0;
  facing = "right"
  textSize(20)
}

function createNewCollect() {
  backgroundSound.play();
  collect = createSprite(width / 2, 0, 0, 0);
  collect.addImage(collectImage);
  collect.setCollider("rectangle",0,0,50,50);
  collectgroup.push(collect);
}

function createNewEnemy() {
  enemy = createSprite(width / 2, 0, 0, 0);
  enemy.addImage(enemyImage);
  enemy.setCollider("rectangle",0,0,100,100);
  enemygroup.push(enemy);
}

function draw() {
  if (isGameOver) {
    gameOver();
  } else {
    for (e of enemygroup) {
      if (e.overlap(player)) {
        gameoverSound.play();
        isGameOver = true;
    }}
    for (c of collectgroup) {
      if (c.overlap(player)) {
        score += 1;
        collectSound.play();
        c.remove()
        // collect.position.x = width*2;
        // collect.position.x = random(5, width - 5);
     
      }}
    background(backgroundImage);
    fill("white")
    text("BANANAS: " + score,50,50);
    if (keyDown(RIGHT_ARROW) && player.position.x < (width - (playerImage.width / 2))) {
      player.position.x += 8;
      if(facing=="left"){
        player.mirrorX(player.mirrorX()*-1);
        facing = "right"
      }
    }
    if (keyDown(LEFT_ARROW) && player.position.x > (playerImage.width / 2)) {
        player.position.x -= 8;
        if(facing=="right"){
          player.mirrorX(player.mirrorX()*-1);
          facing = "left"
        }
    }
    if (keyDown(DOWN_ARROW) && player.position.y < (height - (playerImage.height / 2))) {
        player.position.y += 8;
    }    
    if (keyDown(UP_ARROW) && player.position.y > (playerImage.height / 2)) {
        player.position.y -= 8;
    }
    for (e of enemygroup) {
      // console.log(enemygroup)
      e.position.y = e.position.y + 3;
      if (e.position.y > height) {
        e.position.y = 0;
        e.position.x = random(5, width - 5);
    }}
    for (c of collectgroup) {
      // console.log(collectgroup)
      c.position.y = c.position.y + 3;
      if (c.position.y > height) {
        c.position.y = 0;
        c.position.x = random(5, width - 5);
    }}
    drawSprites();
  }
}

function gameOver() {
  for (c of collectgroup) {
      c.position.y = 99999;
      c.position.x = width*2
      c.remove()
    }
  collectgroup = [];
  for (e of enemygroup) {
    e.position.y = 99999;
    e.position.x = width*2
    e.remove()
  }
  enemygroup = [];
  background(0);
  textAlign(CENTER);
  fill("yellow");
  text("Monkey Down :( Click to try again.", width / 2, height / 2);
  text("BANANAS COLLECTED: " + score, width / 2, 2* height / 3.5);
  backgroundSound.stop();
}

function mouseClicked() {
  // if black screen is shown, then restart game 
  if (isGameOver == true) {
    isGameOver = false;
    player.position.x = width / 2;
    player.position.y = height - (playerImage.height / 2);
    enemy.position.x = width / 2;
    enemy.position.y = 0;
    score = 0;
  } 
  // if in game, then set black screen
  else {
    isGameOver = true;
  }
  
}