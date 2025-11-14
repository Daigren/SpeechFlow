// Находим элементы на странице
const modal = document.getElementById('modal');
const openTimer = document.getElementById('timerButton');
const closeButton = document.getElementById('closeModal');

// Функция открытия окна
function openModal() {
    modal.classList.remove('hidden');
}

// Функция закрытия окна
function closeModal() {
    modal.classList.add('hidden');
}

// Вешаем обработчики на кнопки
openTimer.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);

// Закрытие по клику на фон
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

