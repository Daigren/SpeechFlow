let timerModal = document.getElementById('timerModal');

function resetTimer() {
    timerModal.textContent  = 0
}

function addTimer() {
    timerModal.textContent++
}

function subtractTimer() {
    timerModal.textContent--
}

function startTimer() {
    let interval = setInterval(() => {                
        timerModal.textContent--;

        if (timerModal.textContent <= 0) {
            clearInterval(interval);
            alert("Время вышло")
            resetTimer()
        }
    }, 1000)
}