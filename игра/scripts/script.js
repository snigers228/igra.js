let minRange, maxRange, secretNumber, attempts;

document.getElementById('startGame').addEventListener('click', function() {
    minRange = parseInt(document.getElementById('minRange').value);
    maxRange = parseInt(document.getElementById('maxRange').value);
    
    if (isNaN(minRange) || isNaN(maxRange) || minRange >= maxRange) {
        alert("Пожалуйста, введите корректные значения.");
        return;
    }
    secretNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    attempts = Math.ceil(Math.log2(maxRange - minRange + 1));
    
    document.querySelector('.input-section').style.display = 'none';
    document.querySelector('.game-section').style.display = 'block';
    document.getElementById('attemptsLeft').innerText = `Осталось попыток: ${attempts}`;
    document.getElementById('message').innerText = '';
});

document.getElementById('checkGuess').addEventListener('click', function() {
    const userGuess = parseInt(document.getElementById('userGuess').value);
    
    if (isNaN(userGuess)) {
        alert("Пожалуйста, введите число.");
        return;
    }
    
    attempts--;
    
    if (userGuess === secretNumber) {
        document.getElementById('message').innerText = `Поздравляем! Вы угадали число ${secretNumber}!`;
        endGame();
    } else if (attempts === 0) {
        document.getElementById('message').innerText = `Попытки закончились! Загаданное число было ${secretNumber}.`;
        endGame();
    } else {
        const hint = userGuess < secretNumber ? 'больше' : 'меньше';
        document.getElementById('message').innerText = `Неправильно! Попробуйте число ${hint}.`;
        document.getElementById('attemptsLeft').innerText = `Осталось попыток: ${attempts}`;
    }
});
function endGame() {
    document.getElementById('checkGuess').disabled = true;
    document.getElementById('restartGame').style.display = 'block';
}

document.getElementById('restartGame').addEventListener('click', function() {
    document.querySelector('.input-section').style.display = 'block';
    document.querySelector('.game-section').style.display = 'none';
    document.getElementById('restartGame').style.display = 'none';
    document.getElementById('userGuess').value = '';
    document.getElementById('minRange').value = '';
    document.getElementById('maxRange').value = '';
});