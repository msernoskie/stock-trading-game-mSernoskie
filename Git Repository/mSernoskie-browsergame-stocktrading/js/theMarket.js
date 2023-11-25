function formatMoney(amount) {
    return parseFloat(amount).toFixed(2);
}

// Initialize high score from local storage
let highScore = parseInt(localStorage.getItem('highScore')) || 0; // Default to 0 if no high score is saved

document.getElementById('highScoreDisplay').innerText = 'High Score: $' + formatMoney(highScore);


function updatePlayerMoney() {
    // Update the player's money display
    document.getElementById('playerMoney').innerText = 'Your Money: $' + playerMoney;
    updateHighScore();
}

function updatePlayerDebt() {
    // Update the player's debt display
    document.getElementById('playerDebt').innerText = 'Your Debt: $' + playerDebt;
    updateHighScore();
}

function updateHighScore() {
    let netWorth = playerMoney - playerDebt;
    if (netWorth > highScore) {
        highScore = netWorth;
        localStorage.setItem('highScore', highScore.toString());
        document.getElementById('highScoreDisplay').innerText = 'High Score: $' + formatMoney(highScore);
    }
}


// Call updateHighScore at the start to display the initial high score
document.addEventListener('DOMContentLoaded', function() {
    updateHighScore();
    // ... other event listener setups ...
});
// Call updateHighScore at the start to display the initial high score
document.addEventListener('DOMContentLoaded', function() {
    updateHighScore();
    // ... other event listener setups ...
});
const transactionFee = 10;
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
    // Calculate the total cost to buy one stock (including the fee)
    let totalCost = currentStockPrice + transactionFee;

    // Check if the player has enough money to buy one stock
    if (playerMoney >= totalCost) {
        // Deduct the cost from the player's money
        playerMoney -= totalCost;

        // Increment the stock holdings since a stock is bought
        stockHoldings += 1; // Assuming buying one stock at a time

        // Update the display
        updatePlayerMoney();
        // ... any other updates related to stock holdings ...

        // Show the total cost as a negative number
        showMoneyChangeEffect(-totalCost, 'buy');
    } else {
        showMessage("Not enough money to buy stock!");
    }
}



function sellStock() {
    // Check if the player has stocks to sell
    if (stockHoldings > 0) {
        // Calculate the total earnings from selling one stock (including the fee)
        let totalEarnings = currentStockPrice - transactionFee;

        // Update stock holdings and player's money
        stockHoldings -= 1; // Decrease stock holdings by one
        playerMoney += totalEarnings; // Add total earnings to player's money

        // Update the display
        updatePlayerMoney();
        // ... any other updates related to stock holdings ...

        // Show the earnings as a positive number
        showMoneyChangeEffect(totalEarnings, 'sell');
    } else {
        // Handle the case where there are no stocks to sell
        showMessage("No stocks to sell!");
    }
}


function updateDisplay() {
    updatePlayerMoney();
    document.getElementById('stockHoldings').innerText = 'Stock Holdings: ' + stockHoldings;
}

// Fix debt, it goes -10 only and goes under//
function payDebt() {
    const debtPayment = 10000; // The amount to pay towards the debt

    if (playerMoney >= debtPayment) {
        // Deduct the payment from player's money and reduce the debt
        playerMoney -= debtPayment;
        playerDebt -= debtPayment;

        // Update the display
        updatePlayerMoney();
        updatePlayerDebt();

        // Check for win condition
        if (playerDebt <= 0) {
            playerWins();
        }
    } else {
        showMessage("Not enough money to pay the debt!");
    }
    playerMoney -= transactionFee;
    showMoneyChangeEffect(-transactionFee);
    updatePlayerMoney();
}

function updatePlayerMoney() {
    document.getElementById('playerMoney').innerText = 'Your Money: $' + formatMoney(playerMoney);
}

function updatePlayerDebt() {
    document.getElementById('playerDebt').innerText = 'Your Debt: $' + formatMoney(playerDebt);
}

function playerWins() {
    alert("Congratulations! You've paid off your debt!");
    // Handle the win condition (e.g., display win screen, restart the game, etc.)
}

// Attach the event listener for the payDebt button in your existing event listener setup
document.addEventListener('DOMContentLoaded', function() {
    // ... existing event listeners ...
    document.getElementById('payDebtButton').addEventListener('click', payDebt);
});


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
    // Reset game state
    playerMoney = 10000; // Reset to starting money
    playerDebt = 100000; // Reset to starting debt
    stockHoldings = 0; // Reset stock holdings
    currentStockPrice = 100; // Reset stock price
    consecutivePositives = 0; // Reset any game-specific variables
    dropChance = 0.10; // Reset drop chance

    // Update display for all reset values
    updatePlayerMoney();
    updatePlayerDebt();
    // ... update any other relevant displays ...

    // Switch screens
    document.getElementById('gameOverScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
}

// Ensure the event listener is correctly attached to the restart button
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('restartButton').addEventListener('click', restartGame);
    // ... other event listener setups ...
});

//Visuals//
function showMoneyChangeEffect(amount, transactionType) {
    const effectElement = document.createElement('div');
    effectElement.classList.add('money-change-effect');
    effectElement.innerText = (amount >= 0 ? '+' : '') + formatMoney(amount);

    if (transactionType === 'buy') {
        effectElement.style.color = 'red';
    } else if (transactionType === 'sell') {
        effectElement.style.color = 'green';
    }

    document.body.appendChild(effectElement);

    // Positioning and animation setup
    effectElement.style.position = 'absolute';
    effectElement.style.left = '50%';  // Example positioning
    effectElement.style.top = '50%';   // Example positioning
    effectElement.style.animation = 'floatUpFadeOut 2s ease-out forwards';

    effectElement.addEventListener('animationend', function() {
        effectElement.remove();
    });
}
let fadeOutTimeout, hideTimeout;

function showMessage(message) {
    const messageBox = document.getElementById('messageBox');
    clearTimeout(fadeOutTimeout); // Clear existing timeout
    clearTimeout(hideTimeout); // Clear existing hide timeout

    messageBox.innerText = message;
    messageBox.classList.remove('hidden', 'fadeOut');
    messageBox.style.opacity = '1'; // Reset opacity to 1

    // Start the fade out after 4 seconds
    fadeOutTimeout = setTimeout(function() {
        messageBox.classList.add('fadeOut');
    }, 4000);

    // Hide the message box completely after fade-out
    hideTimeout = setTimeout(function() {
        messageBox.classList.add('hidden');
    }, 8000); // Sum of fade-out duration and delay
}