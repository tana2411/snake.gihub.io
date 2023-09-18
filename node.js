var blocksize = 25
var rows = 20
var cols = 20
var board
var context

//Create a game container
window.onload = function () {
    board = document.getElementById("board")
    board.height = rows * blocksize
    board.width = cols * blocksize
    context = board.getContext("2d")
    foodspawn()
    document.addEventListener("keyup", changeDirection)
    setInterval(update, 1500 / 10)
}
//snake
var snakeX = blocksize * 5
var snakeY = blocksize * 5
var snakebody = [];
var velocityX = 0
var velocityY = 0
var gameover = false;

function update() {

    if (gameover) { return }
    //draw bg
    context.fillStyle = "black"
    context.fillRect(0, 0, board.width, board.height)

    //food
    context.fillStyle = "red"
    context.fillRect(foodX, foodY, blocksize, blocksize)
    //When snake eats food, increase by 1 block
    if (snakeX == foodX && snakeY == foodY) {
        snakebody.push([foodX, foodY])
        foodspawn()
    }

    //block [n] has just been created following block [n-1]
    for (let i = snakebody.length - 1; i > 0; i--) {
        snakebody[i] = snakebody[i - 1]
    }
    if (snakebody.length) { snakebody[0] = [snakeX, snakeY] }

    //snake
    context.fillStyle = "green"
    snakeX += velocityX * blocksize
    snakeY += velocityY * blocksize
    context.fillRect(snakeX, snakeY, blocksize, blocksize)
    //snake tails
    for (let i = 0; i < snakebody.length; i++) {
        context.fillStyle = "yellow"
        context.fillRect(snakebody[i][0], snakebody[i][1], blocksize, blocksize)
    }


    //if the snake goes outside the edge of the game, it appears in the opposite direction
    if (snakeX < 0) {
        snakeX = 500
    } else if (snakeX > 500) {
        snakeX = 0
    }
    else if (snakeY < 0) {
        snakeY = 500
    }
    else if (snakeY > 500) {
        snakeY = 0

    }
    //If the snake's head hits the body, the game ends
    for (let i = 0; i < snakebody.length; i++) {
        if (snakeX == snakebody[i][0] && snakeY == snakebody[i][1]) {
            gameover = true
            alert("game over")

        }
    }
}


//set move button
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0
        velocityY = -1
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }

}
//food
var foodX
var foodY
function foodspawn() {
    foodX = Math.floor(Math.random() * cols) * blocksize
    foodY = Math.floor(Math.random() * rows) * blocksize
}
