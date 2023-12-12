document.getElementById('highScoreDisplay').innerText = 'High Score: $' + formatMoney(highScore);function updatePlayerMoney() {
    document.getElementById('playerMoney').innerText = 'Your Money: $' + formatMoney(playerMoney);
}

function updatePlayerDebt() {
    document.getElementById('playerDebt').innerText = 'Your Debt: $' + formatMoney(playerDebt);
}
function updateHighScore() {
    let netWorth = playerMoney - playerDebt;
    if (netWorth > highScore) {
        highScore = netWorth;
        localStorage.setItem('highScore', highScore.toString());
        document.getElementById('highScoreDisplay').innerText = 'High Score: $' + formatMoney(highScore);
    }
}
function showMoneyChangeEffect(amount) {
    const effectElement = document.createElement('div');
    effectElement.classList.add('money-change-effect');
    effectElement.innerText = (amount >= 0 ? '+' : '') + formatMoney(amount);
    document.body.appendChild(effectElement);
    // ... rest of the function ...
}
function updateDisplay() {
    document.getElementById('playerMoney').innerText = 'Your Money: $' + formatMoney(playerMoney);
    document.getElementById('stockHoldings').innerText = 'Stock Holdings: ' + stockHoldings;
    document.getElementById('stockPrice').innerText = 'Stock Price: $' + formatMoney(currentStockPrice);
}
function restartGame() {
    // ... existing reset logic ...
    updatePlayerMoney();
    updatePlayerDebt();
    // ... rest of the function ...
}
