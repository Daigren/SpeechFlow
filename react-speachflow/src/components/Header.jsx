import ModalWindow from './ModalWindow'

export default function Header({ notes, activeIndex, noteName, onNext, onPrev, canPrev, canNext, onCreateNew, onSelectNote }) {
  return (
    <header>
        <div id='headerImg'>
            {/* Передаем нужные данные в модальное окно */}
            <ModalWindow 
                notes={notes} 
                onCreateNew={onCreateNew} 
                onSelectNote={onSelectNote} 
            />
            <h1>Speachflow</h1>
        </div>
        
        <div id='headerDiv' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            id='left_img'
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
    </header>
  )
}