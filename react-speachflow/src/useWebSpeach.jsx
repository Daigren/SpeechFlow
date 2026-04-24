import { useState, useEffect } from 'react';

export const useSpeech = (onResult) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.lang = 'ru-RU';
      
      recog.continuous = true;      
      recog.interimResults = true;  

      recog.onstart = () => setIsListening(true);
      recog.onend = () => setIsListening(false);

      recog.onresult = (event) => {
        let fullTranscript = '';
        
        for (let i = 0; i < event.results.length; i++) {
          fullTranscript += event.results[i][0].transcript + ' ';
        }
        
        onResult(fullTranscript);
      };

      setRecognition(recog);
    } else {
      console.error("Браузер не поддерживает Web Speech API");
    }
  }, []); 

  const startListening = () => {
    if (recognition) {
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return { startListening, stopListening, isListening };
};