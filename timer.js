//=================== таймер

// Переменные таймера
let totalSeconds = 0;
let timerId = null;

const minutesInput = document.getElementById('minutesInput');
const timerElement = document.getElementById('timer');
const startButtonTimer = document.getElementById('startTimer');
const resetButton = document.getElementById('reset');


// Функция обновления отображения таймера
function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    timerElement.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Функция обратного отсчета
function countdown() {
    if (totalSeconds > 0) {
        totalSeconds--;
        updateDisplay();
    } else {
        clearInterval(timerId);
        timerId = null;
        alert('Время вышло!');
    }
}

// Старт таймера
startButtonTimer.addEventListener('click', function() {
    if (timerId) return; // Если таймер уже запущен
    
    const minutes = parseInt(minutesInput.value);
    
    if (minutes > 0) {
        totalSeconds = minutes * 60;
        updateDisplay();
        timerId = setInterval(countdown, 1000);
    } else {
        alert('Введите количество минут!');
    }
});

// Сброс таймера
resetButton.addEventListener('click', function() {
    clearInterval(timerId);
    timerId = null;
    totalSeconds = 0;
    updateDisplay();
    minutesInput.value = '';
});