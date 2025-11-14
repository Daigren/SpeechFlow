
const createButton = document.getElementById('create');
const sidebar = document.querySelector('aside');
const startButton = document.querySelector('.start');
const timer = document.getElementById('timerButton');
const main = document.querySelector('main');
const line = document.getElementById('line');
const down = document.getElementById('down');
const up = document.getElementById('up');
const message = document.getElementById('message1');

let noteCount = 1;
let messageCount = 1;
let timerCount = 1;

// ======================скролл

function scrollDown() {
    line.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function scrollUp() {
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ======================Поле для ввода

function createNewMessage() {
    messageCount++;
    timerCount++;

    const newMessage = document.createElement('textarea');
    const newTimer = document.createElement('button');

    newMessage.className = "bg-[#383838] text-white border border-[#262626] rounded-[20px] p-4 resize-none mx-auto block text-1";
    
    newMessage.id = "message" + messageCount; 
    newMessage.rows = 20;
    newMessage.cols = 100;
    newMessage.placeholder = "";
    newMessage.maxLength = 500;

    newTimer.className = 'note bg-[#383838] h-[45px] w-100 mt-3 flex items-center px-4 group hover:bg-gray-500 transition-colors rounded-[10px] p-4 resize-none mx-auto block mb-3';
    newTimer.innerHTML = `<span class="text-[#5ffeb9] text-[24px]">create a timer ${timerCount}</span>
    <img src="./files/Timer.svg" class="ml-3 w-[18px]">
    `;

    main.insertBefore(newMessage, line);
    main.insertBefore(newTimer, line);


    newTimer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ======================Кнопка "Создать"

function createNewNote() {
    noteCount++;
    
    const newNote = document.createElement('button');
    newNote.className = 'note bg-[#262626] rounded-[10px] h-[45px] w-full mt-8 flex items-center justify-between px-4 group hover:bg-gray-600 transition-colors';
    newNote.innerHTML = `<span class="text-white text-[24px]">Note ${noteCount}</span>`;

    
    sidebar.insertBefore(newNote, createButton);
    
    newNote.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Добавляем обработчик на кнопку "Create new +"
createButton.addEventListener('click', createNewNote);
createButton.addEventListener('click', createNewMessage);
down.addEventListener('click', scrollDown);
up.addEventListener('click', scrollUp);




