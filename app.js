'use strict';

const gameBoard = document.querySelector('#gameBoard');
const gameScore = document.querySelector('.gameScore');
const resetBtn = document.querySelector('#resetBtn');

// Buttons
const btnUp = document.querySelector('#btnUp');
const btnLeft = document.querySelector('#btnLeft');
const btnDown = document.querySelector('#btnDown');
const btnRight = document.querySelector('#btnRight');

const buttons = document.querySelectorAll('.buttons button');


const ctx = gameBoard.getContext('2d');
const boardWidth = gameBoard.width;
const boardHeight = gameBoard.height;
const boardBackground = '#131d40';
const snakeColor = '#1af00a';
const snakeBorder = '40'
const foodColor = 'red';
const unitSize = 20;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let running = false;
let snake = [
  {x: unitSize * 4, y: 0},
  {x: unitSize * 3, y: 0},
  {x: unitSize * 2, y: 0},
  {x: unitSize, y: 0},
  {x: 0, y: 0}
];


const startGame = function () {
  running = true;
  gameScore.textContent = `Score: ${score}`;
  createFood();
  drawFood();
  nextTick()
};
const createFood = function () { 
  function randomFoodPosition(min, max) {
    const roundNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return roundNum;
    // console.log(roundNum);
  };
  foodX = randomFoodPosition(0, boardWidth - unitSize)
  foodY = randomFoodPosition(0, boardWidth - unitSize)
};
const drawFood = function () {
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize)
};

const nextTick = function () {
  if (running) {
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 400)
  } else {
    displayGameOver();
  }
};
const clearBoard = function () {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, boardWidth, boardHeight);
};
const drawSnake = function () {
  ctx.strokeStyle = snakeBorder
  ctx.fillStyle = snakeColor;
  snake.forEach(snakePart => {
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize)
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize)
    /* ctx.beginPath();
    ctx.fillStyle = snakeColor;
    ctx.roundRect(snakePart.x, snakePart.y, unitSize, unitSize, [10]);
    ctx.stroke() */
  })
};
const moveSnake = function () {
  const snakeHead = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};
  snake.unshift(snakeHead);

  if (snake[0].x == foodX && snake[0].y == foodY) {
    score += 1;
    gameScore.textContent = `Score: ${score}`;
    createFood()
  } else {
    snake.pop()
  }
};

const directionUnits = function() {
  
}

let goingUp;
let goingDown;
let goingLeft;
let goingRight;

let goingUpBTN;
let goingDownBTN;
let goingLeftBTN;
let goingRightBTN;



const changeSnakeDirection = function (e) {
  const keyPressed = e.keyCode;
  const keyLeft = 37;
  const keyUp = 38;
  const keyRight = 39;
  const keyDown = 40;

  goingUp = (yVelocity == -unitSize);
  goingDown = (yVelocity == unitSize);
  goingLeft = (xVelocity == -unitSize);
  goingRight = (xVelocity == unitSize);


  switch(true) {
    case(keyPressed == keyLeft && !goingRight):
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    
    case(keyPressed == keyRight && !goingLeft):
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    
    case(keyPressed == keyUp && !goingDown):
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    
    case(keyPressed == keyDown && !goingUp):
      xVelocity = -0;
      yVelocity = unitSize;
      break;
    
  }
};

// Button controls
buttons.forEach(key => {
  key.addEventListener('click', () => changeSnakeDirection({ keyCode: key.dataset.key }))
})



const checkGameOver = function () {
  switch(true) {
    case(snake[0].x < 0):
      running = false;
      break;
    
    case(snake[0].x >= boardWidth):
      running = false;
      break;
    
    case(snake[0].y < 0):
      running = false;
      break;
    
    case(snake[0].y >= boardHeight):
      running = false;
      break;
    
  }
  
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      running = false
    }
  }
};

const displayGameOver = function () {
  ctx.font = '50px MV Boli';
  ctx.fillStyle = 'red';
  ctx.textAlign = 'center';
  ctx.fillText('Game over', boardWidth / 2, boardHeight / 2);
};
const resetGame = function () {
  score = 0;
  xVelocity = unitSize;
  yVelocity = 0;
  snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
  ];
  startGame();
};


startGame();

window.addEventListener('keydown', changeSnakeDirection);
resetBtn.addEventListener('click', resetGame);

