import { useState, useCallback } from 'react';

export function useSpeech(onResultCallback) {
  const [isListening, setIsListening] = useState(false);

  const startListening = useCallback(() => {
    // Проверка поддержки браузером
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Ваш браузер не поддерживает Web Speech API");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ru-RU'; // Ставим русский язык
    recognition.continuous = true; // Остановится после одной фразы

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResultCallback(transcript); // Отправляем текст обратно в App
    };

    recognition.onerror = (event) => {
      console.error("Ошибка распознавания:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  }, [onResultCallback]);

  return { startListening, isListening };
}