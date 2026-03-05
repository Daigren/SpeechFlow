import { useState, useMemo } from 'react'
import { useSpeech } from './useWebSpeach'
import Header from './components/Header'
import Textarea from './components/Textarea'
import WebSpeachText from './components/WebSpeachText'
import Buttons from './components/Buttons'

export default function App() {
  const [textSpeach, setTextSpeach] = useState(" ")
  const [spokenSentences, setSpokenSentences] = useState([])

  const originalWords = useMemo(() => {
    // Режем эталонный текст на слова по пробелам
    return textSpeach.split(/\s+/).filter(Boolean)
  }, [textSpeach])

  const { startListening, isListening } = useSpeech((transcript) => {
    // Режем всю услышанную на данный момент речь на слова
    const recognizedWords = transcript.split(/\s+/).filter(Boolean);
    
    // ПЕРЕЗАПИСЫВАЕМ стейт полностью (без prev)
    setSpokenSentences(recognizedWords);
  })

  // Нормализация (убираем все знаки препинания)
  const normalize = (text) => text?.toLowerCase().trim().replace(/[.,!?:;"'-]/g, "") || ""

  return (
    <>
      <Header />
      <main>
        <section>
          <Textarea textSpeach={textSpeach} setTextSpeach={setTextSpeach} />

          <WebSpeachText 
            sentences={originalWords} /* <-- ИСПРАВЛЕНИЕ: передаем правильную переменную */
            spoken={spokenSentences} 
            normalize={normalize} 
          />
        </section>
        
        <Buttons onButtonSpeach={startListening} isListening={isListening} />
      </main>
    </>
  )
}