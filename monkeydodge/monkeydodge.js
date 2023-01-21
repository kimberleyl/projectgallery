var isGameOver;
var player;
var playerImage;
var enemy;
var enemyImage;
var collect;
var collectImage;
var backgroundImage;
var t=setInterval(createNewCollect,2000);
var t=setInterval(createNewEnemy,5000)


function preload() {
  playerImage = loadImage("https://i.imgur.com/dQlBCQz.png");
  enemyImage = loadImage("https://i.imgur.com/PM3TNfU.png");
  collectImage = loadImage("https://i.imgur.com/BBZvl6m.png")
  backgroundImage = loadImage("https://i.imgur.com/wRoEcmx.jpg");
}

function setup() {
  isGameOver = false;
  createCanvas(window.innerWidth*.98, window.innerHeight*.98);
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
  highscore = 0;
}

function createNewCollect() {
  collect = createSprite(width / 2, 0, 0, 0);
  collect.addImage(collectImage);
  collect.setCollider("rectangle",0,0,50,50);
  collectgroup.push(collect);
  // collectgroup.scale = 0.8;
}

function createNewEnemy() {
  enemy = createSprite(width / 2, 0, 0, 0);
  enemy.addImage(enemyImage);
  enemy.setCollider("rectangle",0,0,100,100);
  enemygroup.push(enemy);
  // enemygroup.scale = 0.8;
}

function draw() {
  if (isGameOver) {
    gameOver();
  } else {
    for (e of enemygroup) {
      if (e.overlap(player)) {
        isGameOver = true;
    }}
    for (c of collectgroup) {
      if (c.overlap(player)) {
        score += 1;
        c.remove()
        // collect.position.x = width*2;
        // collect.position.x = random(5, width - 5);
     
      }}
    background(backgroundImage);
    if (keyDown(RIGHT_ARROW) && player.position.x < (width - (playerImage.width / 2))) {
      player.position.x += 8;
    }
    if (keyDown(LEFT_ARROW) && player.position.x > (playerImage.width / 2)) {
      player.position.x -= 8;
      playerImage.scale(-1,1);
      console.log("test");
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
  fill("white");
  text("Monkey Down :( Click to try again.", width / 2, height / 2);
  text("BANANAS COLLECTED: " + score, width / 2, 2* height / 3.5)
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