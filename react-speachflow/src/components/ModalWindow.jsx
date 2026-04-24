import { useState } from 'react'
import Modal from 'react-modal';

export default function ModalWindow({ notes, onCreateNew, onSelectNote }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleCreateNew = () => {
        onCreateNew();
        closeModal();
    };

    const handleSelectNote = (index) => {
        onSelectNote(index);
        closeModal();
    };

    const modalContent = (
        <div id='main-menu'>
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
                ariaHideApp={false}
            >
                {modalContent}
            </Modal>
        </div>
    )
}