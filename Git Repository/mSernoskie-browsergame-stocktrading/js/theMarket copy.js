// Initialize high score
let highScore = localStorage.getItem('highScore') || 0;
document.getElementById('highScoreDisplay').innerText = 'High Score: $' + highScore;

// Function to update high score
function updateHighScore(currentScore) {
    if (currentScore > highScore) {
        highScore = currentScore;
        localStorage.setItem('highScore', highScore);
        document.getElementById('highScoreDisplay').innerText = 'High Score: $' + highScore;
    }
}

let playerMoney = 10000; // Starting money
let playerDebt = 100000; // Starting debt
let stockHoldings = 0;
let currentStockPrice = 100; // Dynamic in your game
let consecutivePositives = 0;
let dropChance = 0.10; // 10% initial chance

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('buyButton').addEventListener('click', buyStock);
    document.getElementById('sellButton').addEventListener('click', sellStock);
});

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    // Initialize or reset game variables
    // Start stock price fluctuation, etc.
    setInterval(updateStockPrice, 2000); // Start the stock price fluctuation
    setInterval(increaseDebt, 25000); // Correct interval for debt increase
}

function buyStock() {
    if (playerMoney >= currentStockPrice) {
        stockHoldings += 1;
        playerMoney -= currentStockPrice;
        updateDisplay();
    } else {
        alert("Not enough money to buy stock!");
    }
}

function sellStock() {
    if (stockHoldings > 0) {
        stockHoldings -= 1;
        playerMoney += currentStockPrice;
        updateDisplay();
    } else {
        alert("You don't have any stocks to sell!");
    }
}

function updateDisplay() {
    updatePlayerMoney();
    document.getElementById('stockHoldings').innerText = 'Stock Holdings: ' + stockHoldings;
}

function payDebt() {
    if (playerMoney >= 10000) {
        playerMoney -= 10000;
        playerDebt -= 10000;
        updatePlayerMoney();
        updatePlayerDebt();
    } else {
        alert("Not enough money to pay the debt!");
    }
}

function updatePlayerMoney() {
    document.getElementById('playerMoney').innerText = 'Your Money: $' + playerMoney.toFixed(2);
}

function increaseDebt() {
    playerDebt += 2500;
    playerDebt *= 1.08; // Increase by 8%
    updatePlayerDebt(); // Update the display
    if (playerDebt >= 125000) {
        gameOver();
    }
}

function updatePlayerDebt() {
    document.getElementById('playerDebt').innerText = 'Your Debt: $' + playerDebt.toFixed(2);
}
// The market movements
function updateStockPrice() {
    let largeDropHappened = false;

    // Check if a large drop should happen
    if (consecutivePositives >= 3 && Math.random() < dropChance) {
        currentStockPrice *= 0.3; // 50% drop
        largeDropHappened = true;
        dropChance = 0.10; // Reset to initial chance
        consecutivePositives = 0; // Reset counter
    } else {
        // Regular stock price fluctuation
        let changePercent = (Math.random() * 50 - 25) / 100; // ±25% change
        if (changePercent < 0) {
            changePercent = Math.max(changePercent, -0.08); // Not lower than -8%
        } else {
            changePercent = Math.min(changePercent, 0.08);  // Not higher than 8%
        }
        currentStockPrice *= (1 + changePercent);

        // Update consecutive positive changes
        if (changePercent > 0) {
            consecutivePositives++;
            if (!largeDropHappened && consecutivePositives >= 3) {
                dropChance = Math.min(dropChance * 2, 0.60); // Double the chance, max 60%
            }
        } else {
            consecutivePositives = 0; // Reset counter if change is not positive
            dropChance = 0.10; // Reset to initial chance
        }
    }

    updateDisplay(); // Update the displayed stock price
}
function updateDisplay() {
    document.getElementById('playerMoney').innerText = 'Your Money: $' + playerMoney.toFixed(2);
    document.getElementById('stockHoldings').innerText = 'Stock Holdings: ' + stockHoldings;
    document.getElementById('stockPrice').innerText = 'Stock Price: $' + currentStockPrice.toFixed(2);
}


function gameOver() {
    // Hide game screen and show game over screen
    //RIP BOZO
    document.getElementById('gameScreen').style.display = 'none';
    document.getElementById('gameOverScreen').style.display = 'block';
}
function restartGame() {
    playerMoney = 10000; // Reset money
    playerDebt = 100000; // Reset debt
    stockHoldings = 0; // Reset stock holdings
    currentStockPrice = 100; // Reset stock price

    updatePlayerMoney();
    updatePlayerDebt();

    // Hide game over screen and show start screen
    document.getElementById('gameOverScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
}
