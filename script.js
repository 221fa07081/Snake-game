const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let snake;
let direction;
let speed = 100;
let food;
let gameInterval;
let isPaused = false;
let isGameOver = false;
let score = 0; 

const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
function startGame() {
    // Set initial snake and direction
    snake = [
        { x: 200, y: 200 },
        { x: 190, y: 200 },
        { x: 180, y: 200 }
    ];
    direction = 'RIGHT';
    score = 0; // Reset score when the game starts
    isPaused = false;
    isGameOver = false;

    placeFood(); // Place the first food
    startButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
    pauseButton.textContent = 'Pause';
    gameInterval = setInterval(gameLoop, speed); // Start the game loop
}
function updateSnake() {
    const head = { ...snake[0] }; 
    if (direction === 'UP') head.y -= 10;
    if (direction === 'DOWN') head.y += 10;
    if (direction === 'LEFT') head.x -= 10;
    if (direction === 'RIGHT') head.x += 10;
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++; // Increase score
        placeFood(); // Place new food
    } else {
        snake.pop();
    }
}
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    snake.forEach(part => {
        ctx.fillStyle = 'green';
        ctx.fillRect(part.x, part.y, 10, 10);
    });

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);

    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 30); // Show score at top right
}
function placeFood() {
    food = {
        x: Math.floor(Math.random() * 40) * 10,
        y: Math.floor(Math.random() * 40) * 10
    };
}
function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        endGame();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
        }
    }
}

function endGame() {
    clearInterval(gameInterval); 
    isGameOver = true;
    startButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
    alert(`Game Over! Your score is ${score}.`);
}

function gameLoop() {
    if (!isPaused) {
        updateSnake();
        drawGame();
        checkCollision();
    }
}
document.addEventListener('keydown', (event) => {
    if (!isGameOver) {
        if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
        if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
        if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
        if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    }
});
startButton.addEventListener('click', startGame);

pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
});
