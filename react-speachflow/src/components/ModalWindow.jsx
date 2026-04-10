import { useState } from 'react'
import Modal from 'react-modal';

export default function ModalWindow({ notes, onCreateNew, onSelectNote }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    // Функция-обертка: создаем заметку и сразу закрываем меню
    const handleCreateNew = () => {
        onCreateNew();
        closeModal();
    };

    // Функция-обертка: выбираем заметку и закрываем меню
    const handleSelectNote = (index) => {
        onSelectNote(index);
        closeModal();
    };

    const modalContent = (
        <div id='main-menu'>
            {/* 1. Автоматически выводим все существующие заметки */}
            {notes.map((note, index) => (
                <button 
                    key={note.id} 
                    className='newNote' 
                    onClick={() => handleSelectNote(index)}
                >
                    Note {note.id}
                </button>
            ))}
            
            <hr style={{ margin: '10px 0', borderColor: 'gray' }} />
            
            {/* 2. Кнопка создания новой заметки */}
            <button className='createNew' onClick={handleCreateNew}>
                + Create new
            </button>
        </div>
    );

    return (
        <div>
            <button id='button-menu' onClick={openModal}>‖</button>
            <Modal 
                id='menu' 
                overlayClassName="menu-overlay" 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal} 
                className="custom-modal-content"
                ariaHideApp={false} // Добавлено, чтобы react-modal не ругался в консоли Vite
            >
                {modalContent}
            </Modal>
        </div>
    )
}