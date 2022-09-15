const can = document.querySelector('#newCanvas');
const ctx = can.getContext("2d");
const restart = document.querySelector('.restartBtn')

let snakeTales = [];

let eatenApples = 1; 

//this canvas containing 30x30 tiles 
let tiles = 30

//width and height of the moving object
let w = can.width/tiles-2;
let h = can.width/tiles-2;

//where is moving object start location will be
let x0 = 15; 
let y0 = 15;

//the velocity of  moving object, it's will be -1,0 or 1
let dx = 0;
let dy = 0;

//adding the first location of an apple
let appleX = 5;
let appleY = 5;

//it's the value that we operate on when calling the animate function with a perod of time 
let speed = 7;

let scores = 0


const eatSound = new Audio('eatsound.mp3')
const collidedSound = new Audio('collidedsound.mp3')

 function animate(){
  if(checkForEndingGame()){return}
  ctx.clearRect(0,0, innerWidth, innerHeight);
  checkAppleCollision()
  food();
  snake.draw()
  snake.redrawSnake()
  displayScore()
  setTimeout(()=>{
    requestAnimationFrame(animate)
  }, 1000/speed)
} 


class Snake{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  draw(){
    for(let i = 0; i<snakeTales.length;i++){
      ctx.fillStyle = 'green'
      ctx.fillRect(snakeTales[i].x*tiles, snakeTales[i].y*tiles, w, h)
    }
    snakeTales.push(new SnakeParts(this.x, this.y))
    while(snakeTales.length>eatenApples){
      snakeTales.shift()
      
    }

    ctx.fillStyle = "pink";
    ctx.fillRect(this.x*tiles, this.y*tiles, w, h);
    
  }
  redrawSnake(){
    this.x += dx
    this.y += dy
  }
}

class SnakeParts{
  constructor(x,y){
    this.x = x,
    this.y = y
  }
}

const snake = new Snake(x0,y0)


function food(){
    ctx.beginPath();
    ctx.fillStyle = 'red'
    ctx.fillRect(appleX*tiles, appleY*tiles, w, h)
    ctx.fill();
    ctx.closePath();
}

function checkAppleCollision(){
  if(snake.x === appleX && snake.y === appleY){
    generateApplePosition();
    eatSound.play()
    eatenApples++;
    eatenApples%4==0? speed++ : "";
    eatenApples%2==0? scores++ : "";
  }
} 

function generateApplePosition(){
  appleX = Math.floor(Math.random()*tiles);
  appleY = Math.floor(Math.random()*tiles);
  const isAppleSpawnedOnTail = snakeTales.some(tail=>{
    tail.x === appleX || tail.y === appleY
  })
  if(snake.x === appleX && snake.y === appleY){
    generateApplePosition()
  }
  else if(isAppleSpawnedOnTail){
    generateApplePosition()
  }
}

function displayScore(){
  ctx.fillStyle = "white";
  ctx.font = "20px Arial"
  ctx.fillText("Your Score: " + scores, can.width-tiles*5, tiles)
}

function displayLoseMessage(){
  document.querySelector('.scores').innerHTML = `Your scores: ${scores}`
  setTimeout(()=>document.querySelector('.messageCon').style.display = "flex", 200)
  
}
function checkForEndingGame(){
  for(let i = 1; i<snakeTales.length;i++){
    if(snake.x==snakeTales[i].x && snake.y == snakeTales[i].y){
      collidedSound.play()
      displayLoseMessage()
      return true 
    }
  }
  if(snake.x<0){
    collidedSound.play()
    displayLoseMessage()
    return true
  }

  if(snake.x>=tiles){
    collidedSound.play()
    displayLoseMessage()
    return true

  }

  if(snake.y<0){
    collidedSound.play()
    displayLoseMessage()
    return true
  }

  if(snake.y>=tiles){
    collidedSound.play()
    displayLoseMessage()
    return true
  }
}

addEventListener('keydown', ({key})=>{
    if(key=='w'){
      if(dy>0){
        return;
      }
      dy = -1;
      dx = 0
    }

    if(key=='a'){
      if(dx>0){
        return;
      }
      dx = -1;
      dy = 0
    }

    if(key=='s'){
      if(dy<0){
        return;
      }
      dx = 0;
      dy = 1
    }

    if(key=='d'){
      if(dx<0){
        return;
      }
      dx = 1;
      dy = 0
    }
})

//restart the game
restart.addEventListener('click', ()=>{
  location.reload()
})


animate() 

















