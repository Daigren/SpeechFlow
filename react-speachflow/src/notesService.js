import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export const saveNotesToCloud = async (uid, notes) => {
  try {
    console.log("Пытаемся отправить данные в облако...");
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, { notes: notes });
    console.log("Данные УСПЕШНО сохранены в Firestore!");
  } catch (error) {
    console.error("Ошибка при сохранении:", error);
  }
};

export const loadNotesFromCloud = async (uid) => {
  try {
    console.log("⬇Пытаемся скачать данные из облака...");
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Данные найдены! Загружаем в React...");
      return docSnap.data().notes;
    }
    console.log("В базе пока пусто. Начинаем с чистого листа.");
    return null;
  } catch (error) {
    console.error("Ошибка при загрузке:", error);
    return null;
  }
};