import { useState } from 'react'
import Modal from 'react-modal';


export default function ModalWindow() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
    setModalIsOpen(true);
    };

    const closeModal = () => {
    setModalIsOpen(false);
    };

    const modalContent = (
    <div  id='main-menu'>
        <button className='newNote' onClick={closeModal}>note 1</button>
        <button className='createNew' onClick={closeModal}>Create new</button>
    </div>
    );

    return (
        <div >
            <button id='button-menu' onClick={openModal}>‖</button>
            <Modal id='menu' overlayClassName="menu-overlay" isOpen={modalIsOpen} 
            onRequestClose={closeModal} 
            className="custom-modal-content">
                {modalContent}
            </Modal>
        </div>
    )
}