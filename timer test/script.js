// Ждем полной загрузки DOM перед выполнением скриптов
document.addEventListener('DOMContentLoaded', function() {
    // ==================== МОДАЛЬНОЕ ОКНО ====================
    
    // Получаем элементы модального окна по их ID
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');

    // Функция для открытия модального окна
    function openModal() {
        modal.classList.remove('hidden');
    }

    // Функция для закрытия модального окна
    function closeModal() {
        modal.classList.add('hidden');
    }

    // Добавляем обработчики событий на кнопки модального окна
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelModalBtn.addEventListener('click', closeModal);

    // Закрытие модального окна при клике на затемненную область
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Закрытие модального окна при нажатии клавиши Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // ==================== ВЫПАДАЮЩЕЕ МЕНЮ ====================
    
    // Получаем элементы выпадающего меню
    const dropdown = document.getElementById('dropdown');
    const dropdownBtn = document.getElementById('dropdownBtn');

    // Функция переключения видимости выпадающего меню
    function toggleDropdown() {
        dropdown.classList.toggle('hidden');
    }

    // Добавляем обработчик на кнопку меню
    dropdownBtn.addEventListener('click', toggleDropdown);

    // Закрытие выпадающего меню при клике вне его области
    document.addEventListener('click', function(e) {
        // Проверяем, был ли клик вне кнопки и вне самого меню
        if (!dropdownBtn.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });

    // ==================== ВСПЛЫВАЮЩИЕ УВЕДОМЛЕНИЯ ====================
    
    // Получаем элементы для работы с уведомлениями
    const showToastBtn = document.getElementById('showToastBtn');
    const toastContainer = document.getElementById('toastContainer');

    // Функция для показа уведомления
    function showToast(message = 'Действие выполнено успешно!', type = 'success') {
        // Создаем новый элемент уведомления
        const toast = document.createElement('div');
        
        // Определяем стили в зависимости от типа уведомления
        const styles = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        };

        // Заполняем HTML содержимое уведомления
        toast.innerHTML = `
            <div class="${styles[type]} text-white px-6 py-4 rounded-lg shadow-lg mb-2 transform transition-transform duration-300 translate-x-0">
                <div class="flex items-center gap-3">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    <span>${message}</span>
                </div>
            </div>
        `;
        
        // Добавляем уведомление в контейнер
        toastContainer.appendChild(toast);
        
        // Автоматически удаляем уведомление через 3 секунды
        setTimeout(() => {
            // Добавляем анимацию исчезновения
            toast.firstElementChild.style.transform = 'translateX(100%)';
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // Добавляем обработчик на кнопку показа уведомления
    showToastBtn.addEventListener('click', function() {
        showToast('Действие выполнено успешно!', 'success');
    });

    // ==================== БОКОВАЯ ПАНЕЛЬ ====================
    
    // Получаем элементы боковой панели
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const openSidebarBtn = document.getElementById('openSidebarBtn');
    const closeSidebarBtn = document.getElementById('closeSidebarBtn');

    // Функция для открытия боковой панели
    function openSidebar() {
        sidebar.classList.remove('-translate-x-full');
        sidebarOverlay.classList.remove('hidden');
    }

    // Функция для закрытия боковой панели
    function closeSidebar() {
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
    }

    // Добавляем обработчики событий для боковой панели
    openSidebarBtn.addEventListener('click', openSidebar);
    closeSidebarBtn.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Закрытие боковой панели при нажатии клавиши Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !sidebar.classList.contains('-translate-x-full')) {
            closeSidebar();
        }
    });

    // ==================== ДОПОЛНИТЕЛЬНЫЕ ФУНКЦИИ ====================
    
    // Функция для показа уведомления об ошибке
    window.showErrorToast = function(message) {
        showToast(message, 'error');
    };

    // Функция для показа информационного уведомления
    window.showInfoToast = function(message) {
        showToast(message, 'info');
    };

    // Функция для показа предупреждения
    window.showWarningToast = function(message) {
        showToast(message, 'warning');
    };

    console.log('Скрипты успешно загружены! Все функции доступны.');
});