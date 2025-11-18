const createButton = document.getElementById('create');
const sidebar = document.querySelector('aside');
const startButton = document.querySelector('.start');
const timer = document.getElementById('timerButton');
const main = document.querySelector('main');
const line = document.getElementById('line');
const message = document.getElementById('1');

let noteCount = 11;
let timerCount = 1;

// ======================скролл

function scrollDown() {
    line.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function scrollUp() {
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function createNewMessage() {
    timerCount++;
    noteCount++;

    const newMessage = document.createElement('textarea');
    const newTimer = document.createElement('button');
    const newNote = document.createElement('button');

// ======================Поле для ввода
    newMessage.className = "bg-[#383838] text-white border border-[#262626] rounded-[20px] p-4 resize-none mx-auto block text-1";
    newMessage.id = timerCount; 
    newMessage.rows = 20;
    newMessage.cols = 100;
    newMessage.placeholder = "";
    newMessage.maxLength = 500;

// ======================Кнопка таймера 
    newTimer.className = 'note bg-[#383838] h-[45px] w-100 mt-3 flex items-center px-4 group hover:bg-gray-500 transition-colors rounded-[10px] p-4 resize-none mx-auto block mb-3';
    newTimer.innerHTML = `<span class="text-[#5ffeb9] text-[24px]">Create a timer ${timerCount}</span>
    <img src="./files/Timer.svg" class="ml-3 w-[18px]" id="createTimer${timerCount}">
    `;

// ======================Кнопка Note
    newNote.id = noteCount;
    newNote.className = 'bg-[#262626] rounded-[10px] h-[45px] w-full mt-8 flex items-center justify-between px-4 group hover:bg-gray-600 transition-colors';
    newNote.innerHTML = `<span class="text-white text-[24px]" ">Note ${timerCount}</span>`;
    newNote.onclick = function() {scrollNote(newNote.id);}

    main.insertBefore(newMessage, line);
    main.insertBefore(newTimer, line);
    sidebar.insertBefore(newNote, createButton);

    newTimer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ======================Скролл по нажатию на Note

function scrollNote(numNote) {
    let numMessage;
    numMessage = document.getElementById(numNote - 10);

    numMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
