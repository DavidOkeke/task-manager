import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCE5-B9kSc2-XIPYjhr4Jr7JiILLzVuLzo",
    authDomain: "taskmang-26af8.firebaseapp.com",
    projectId: "taskmang-26af8",
    storageBucket: "taskmang-26af8.firebasestorage.app",
    messagingSenderId: "64828960498",
    appId: "1:64828960498:web:16163c133decd54edfea6b"
  };

  const firebase = initializeApp(firebaseConfig);

  export default firebase;