Первое предложение. Второе предложение. Третье предложение. Четвертое предложение. Пятое предложение. Шестое предложение. Седьмое предложение. Восьмое предложение. Девятое предложение. Десятое предложение. Одиннадцатое предложение. Двенадцатое предложение. Тринадцатое предложение. Четырнадцатое предложение. Пятнадцатое предложение. Шестнадцатое предложение. Семнадцатое предложение. Восемнадцатое предложение. Девятнадцатое предложение. Двадцатое предложение.

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export const saveNotesToCloud = async (uid, notes) => {
  try {
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, { notes: notes });
  } catch (error) {
    console.error("Ошибка при сохранении заметок:", error);
  }
};

export const loadNotesFromCloud = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().notes;
    }
    return null; 
  } catch (error) {
    console.error("Ошибка при загрузке заметок:", error);
    return null;
  }
};