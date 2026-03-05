import { useState, useEffect } from 'react';

export const useSpeech = (onResult) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Поддержка для разных браузеров
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.lang = 'ru-RU';
      
      // 1. Слушать постоянно, не выключаться после паузы
      recog.continuous = true;      
      // 2. Отдавать результаты в реальном времени (пока слово еще говорится)
      recog.interimResults = true;  

      recog.onstart = () => setIsListening(true);
      recog.onend = () => setIsListening(false);

      recog.onresult = (event) => {
        let fullTranscript = '';
        
        // Проходимся по всем результатам и склеиваем их в один текст
        for (let i = 0; i < event.results.length; i++) {
          fullTranscript += event.results[i][0].transcript + ' ';
        }
        
        // Передаем готовую строку в App.jsx
        onResult(fullTranscript);
      };

      setRecognition(recog);
    } else {
      console.error("Браузер не поддерживает Web Speech API");
    }
  }, []); // Пустой массив зависимостей, чтобы создать объект один раз

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