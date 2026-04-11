import ModalWindow from './ModalWindow'

// Не забудь добавить user, onLogin и onLogout в пропсы!
export default function Header({ notes, activeIndex, noteName, onNext, onPrev, canPrev, canNext, onCreateNew, onSelectNote, user, onLogin, onLogout }) {
  return (
    <header>
        <div id='headerImg'>
            <ModalWindow 
                notes={notes} 
                onCreateNew={onCreateNew} 
                onSelectNote={onSelectNote} 
            />
            <h1>Speachflow</h1>
        </div>
        
        <div id='headerDiv' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img 
            src='/img/left.svg' 
            alt="Previous" 
            onClick={onPrev}
            style={{ opacity: canPrev ? 1 : 0.3, cursor: canPrev ? 'pointer' : 'default' }}
          />
          
          <span id='nameNote'>{noteName}</span>
          
          <img 
            src='/img/right.svg' 
            alt="Next" 
            onClick={onNext}
            style={{ opacity: canNext ? 1 : 0.3, cursor: canNext ? 'pointer' : 'default' }}
          />
        </div>

        <div style={{ marginLeft: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {user ? (
              // Если пользователь вошел: показываем фото и кнопку выхода
              <>
                <img 
                  src={user.photoURL} 
                  alt="Avatar" 
                  style={{ width: '35px', height: '35px', borderRadius: '50%' }} 
                />
                <button id='authButtonStyleOn' onClick={onLogout} >Log out</button>
              </>
            ) : (
              // Если НЕ вошел: показываем кнопку входа
              <button id='authButtonStyle' onClick={onLogin} >Log in</button>
            )}
          </div>
    </header>
  )
}

// const authButtonStyle = {
//   padding: '5px 15px',
//   borderRadius: '8px',
//   border: 'none',
//   backgroundColor: '#ffffff00',
//   color: 'white',
//   cursor: 'pointer',
//   fontWeight: 'bold'
// };