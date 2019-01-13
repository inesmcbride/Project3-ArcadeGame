// Enemies our player must avoid
const Enemy = function(y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.floor(Math.random() * -300) - 101;
    this.y = y;
    this.speed = Math.floor(Math.random() * 400) + 150;
};
let livesCounter = 10;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505){
        this.x += this.speed * dt;
    } else {
        this.x = Math.floor(Math.random() * -300) - 101;
        this.speed = Math.floor(Math.random() * 400) + 150;
    }
    //check for collision
    if (player.y === this.y && (player.x > (this.x - 70) && player.x < (this.x + 70))){
        livesCounter --;
        player.x = 202;
        player.y = 394;
    }

    //check liveCounter for game over
    if(livesCounter == 0){
        gameOver();
    }

    //display lives left
    const totalLives = document.querySelector('.lives');
    totalLives.innerHTML = livesCounter;
    
};

function gameOver(){
    //GameOver Modal
    const lost = document.querySelector('.winOrLoose');
    const endLives = document.querySelector('.endLives');
    const modal = document.querySelector('.modal');
    lost.innerHTML = 'You Lost';
    endLives.innerHTML = livesCounter;
    modal.classList.remove('hide');
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 394;
};


Player.prototype.update = function() {
    //check for win
    if (this.y < 0){
        gameWon();
    }
};

function gameWon(){
    //Game won modal
    const lost = document.querySelector('.winOrLoose');
    const endLives = document.querySelector('.endLives');
    const modal = document.querySelector('.modal');
    lost.innerHTML = 'You Won!';
    endLives.innerHTML = livesCounter;
    modal.classList.remove('hide');
    playAgainButton();
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dt) {
    switch (dt){
        case 'left':
        if (this.x > 0){
            this.x -= 101;
        }
        break;
        case 'right':
        if (this.x < 404){
            this.x += 101;
        }
        break;
        case 'up':
        if (this.y > 0){
            this.y -= 83;
        }
        //if Player his water, he has won - modal and game reset
        break;
        case'down':
        if (this.y < 332){
            this.y += 83;
        }
        break;
    }
}

function reset(){
    const modal = document.querySelector('.modal');
    const totalLives = document.querySelector('.lives');
    modal.classList.add('hide');
    player.x = 202;
    player.y = 394;
    Enemy.x = Math.floor(Math.random() * -300) - 101;
    livesCounter = 10;
    totalLives.innerHTML = livesCounter;
}

function playAgainButton(){
  const playAgainButton = document.querySelector('.button');
  playAgainButton.addEventListener('click', function(){
    reset();
  });
}




// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [new Enemy(62), new Enemy(145), new Enemy(228)]
const player = new Player ()



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
