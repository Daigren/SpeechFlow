import { useState, useMemo } from 'react'
import { useSpeech } from './useWebSpeach'
import Header from './components/Header'
import Textarea from './components/Textarea'
import WebSpeachText from './components/WebSpeachText'
import Buttons from './components/Buttons'

export default function App() {
  // 1. Теперь храним МАССИВ заметок. У каждой свой ID, свой текст и своя история сказанного.
  const [notes, setNotes] = useState([
    { id: 1, text: " ", spoken: [] }
  ])
  // 2. Индекс текущей активной заметки
  const [activeIndex, setActiveIndex] = useState(0)

  // Удобная переменная для текущей заметки, чтобы не писать notes[activeIndex] везде
  const currentNote = notes[activeIndex];

  // --- ЛОГИКА ПЕРЕКЛЮЧЕНИЯ И СОЗДАНИЯ ---
  const createNewNote = () => {
    const newNote = {
      id: notes.length + 1, // ID будет 2, 3, 4 и т.д.
      text: " ",
      spoken: []
    };
    setNotes([...notes, newNote]);
    setActiveIndex(notes.length); // Сразу переключаем экран на новую пустую заметку
  }

  const nextNote = () => {
    if (activeIndex < notes.length - 1) setActiveIndex(activeIndex + 1);
  }

  const prevNote = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  }

  // ... (твой код: const prevNote = () => { ... })
  const selectNote = (index) => {
    setActiveIndex(index);
  }

  // --- ФУНКЦИИ ДЛЯ ОБНОВЛЕНИЯ ИМЕННО ТЕКУЩЕЙ ЗАМЕТКИ ---
  const setCurrentText = (newText) => {
    const updatedNotes = [...notes];
    updatedNotes[activeIndex].text = newText;
    setNotes(updatedNotes);
  }

  const setCurrentSpoken = (newSpoken) => {
    const updatedNotes = [...notes];
    updatedNotes[activeIndex].spoken = newSpoken;
    setNotes(updatedNotes);
  }

  // --- ОСТАЛЬНАЯ ЛОГИКА (как было раньше, но теперь берем данные из currentNote) ---
  const originalWords = useMemo(() => {
    return currentNote.text.split(/\s+/).filter(Boolean)
  }, [currentNote.text])

  const { startListening, isListening } = useSpeech((transcript) => {
    const recognizedWords = transcript.split(/\s+/).filter(Boolean);
    setCurrentSpoken(recognizedWords);
  })

  const normalize = (text) => text?.toLowerCase().trim().replace(/[.,!?:;"'-]/g, "") || ""

 return (
    <>
      {/* Передаем функции и данные в Header */}
      <Header 
        // --- ДОБАВЛЕНЫ ЭТИ 3 СТРОЧКИ ДЛЯ МЕНЮ ---
        notes={notes}                     
        activeIndex={activeIndex}         
        onSelectNote={selectNote}         
        // ----------------------------------------
        noteName={`Note ${currentNote.id}`}
        onNext={nextNote}
        onPrev={prevNote}
        canPrev={activeIndex > 0}
        canNext={activeIndex < notes.length - 1}
        onCreateNew={createNewNote}
      />
      <main>
        <section>
          <Textarea textSpeach={currentNote.text} setTextSpeach={setCurrentText} />

          <WebSpeachText 
            sentences={originalWords} 
            spoken={currentNote.spoken} 
            normalize={normalize} 
          />
        </section>
        
        <Buttons onButtonSpeach={startListening} isListening={isListening} />
      </main>
    </>
  )
}