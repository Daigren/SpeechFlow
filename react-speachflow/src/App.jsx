import { useState, useMemo, useEffect } from 'react'
import { useSpeech } from './useWebSpeach'
import { useTimer } from './useTimer'
import Header from './components/Header'
import Textarea from './components/Textarea'
import WebSpeachText from './components/WebSpeachText'
import Buttons from './components/Buttons'
import Timer from './components/Timer'

import { auth, provider } from './firebase'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { saveNotesToCloud, loadNotesFromCloud } from './notesService'

export default function App() {
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([{ id: 1, text: " ", spoken: [], duration: 60 }])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isTimerOpen, setIsTimerOpen] = useState(false)

  const toggleTimerMenu = () => setIsTimerOpen(!isTimerOpen)

  const currentNote = notes[activeIndex] || { id: 1, text: " ", spoken: [], duration: 60 };

  const { startListening, isListening } = useSpeech((transcript) => {
    const recognizedWords = transcript.split(/\s+/).filter(Boolean);
    setCurrentSpoken(recognizedWords);
  })

  const { timeLeft, formatTime } = useTimer(currentNote.duration, isListening);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const cloudNotes = await loadNotesFromCloud(currentUser.uid);
        if (cloudNotes) setNotes(cloudNotes);
      }
      setIsLoaded(true);
    });
    return () => unsubscribe();
  }, [])

  useEffect(() => {
    if (user && isLoaded) saveNotesToCloud(user.uid, notes);
  }, [notes, user, isLoaded])

  const createNewNote = () => {
    const newNote = { id: notes.length + 1, text: " ", spoken: [], duration: 60 };
    setNotes([...notes, newNote]);
    setActiveIndex(notes.length);
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

  const setDuration = (seconds) => {
    const updatedNotes = [...notes];
    updatedNotes[activeIndex].duration = seconds;
    setNotes(updatedNotes);
  }

  return (
    <>
      <Header 
        notes={notes}                     
        activeIndex={activeIndex}         
        onSelectNote={setActiveIndex}         
        noteName={`Note ${currentNote.id}`}
        onCreateNew={createNewNote}
        user={user}
        onLogin={() => signInWithPopup(auth, provider)}
        onLogout={() => signOut(auth)}
      />
      <main>
        <section id='mainSection' className="workspace-section">

          <Textarea 
          textSpeach={currentNote.text} 
          setTextSpeach={setCurrentText} 
          />

          <WebSpeachText 
            sentences={useMemo(() => currentNote.text.split(/\s+/).filter(Boolean), [currentNote.text])} 
            spoken={currentNote.spoken || []} 
            normalize={(text) => text?.toLowerCase().trim().replace(/[.,!?:;"'-]/g, "") || ""} 
          />

          <Timer 
            timeLeft={timeLeft} 
            formatTime={formatTime} 
            currentDuration={currentNote.duration}
            onSetDuration={setDuration}
            isOpen={isTimerOpen}       
            setIsOpen={setIsTimerOpen}
          />
        </section>
        
        <Buttons 
          onButtonSpeach={startListening} 
          isListening={isListening} 
          handleOpen={toggleTimerMenu} 
        />
      </main>
    </>
  )
}