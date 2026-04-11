import { useState, useMemo, useEffect } from 'react' // Добавили useEffect
import { useSpeech } from './useWebSpeach'
import Header from './components/Header'
import Textarea from './components/Textarea'
import WebSpeachText from './components/WebSpeachText'
import Buttons from './components/Buttons'

// ИМПОРТИРУЕМ FIREBASE
import { auth, provider } from './firebase'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'

export default function App() {
  // --- НОВЫЙ СТЕЙТ ДЛЯ ПОЛЬЗОВАТЕЛЯ ---
  const [user, setUser] = useState(null)

  // Проверяем, авторизован ли пользователь при загрузке страницы (чтобы не выкидывало при F5)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [])

  // Функция входа
  const handleLogin = () => {
    signInWithPopup(auth, provider).catch((error) => console.error("Ошибка входа:", error));
  }

  // Функция выхода
  const handleLogout = () => {
    signOut(auth);
  }
  // ------------------------------------

  const [notes, setNotes] = useState([{ id: 1, text: " ", spoken: [] }])
  const [activeIndex, setActiveIndex] = useState(0)

  const currentNote = notes[activeIndex];

  const createNewNote = () => {
    const newNote = { id: notes.length + 1, text: " ", spoken: [] };
    setNotes([...notes, newNote]);
    setActiveIndex(notes.length);
  }

  const nextNote = () => {
    if (activeIndex < notes.length - 1) setActiveIndex(activeIndex + 1);
  }

  const prevNote = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  }

  const selectNote = (index) => {
    setActiveIndex(index);
  }

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
      <Header 
        notes={notes}                     
        activeIndex={activeIndex}         
        onSelectNote={selectNote}         
        noteName={`Note ${currentNote.id}`}
        onNext={nextNote}
        onPrev={prevNote}
        canPrev={activeIndex > 0}
        canNext={activeIndex < notes.length - 1}
        onCreateNew={createNewNote}
        // --- ПЕРЕДАЕМ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ В HEADER ---
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
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