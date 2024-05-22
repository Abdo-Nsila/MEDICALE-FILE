// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCh_U1Ml8ygl7Qkjuw1v-cIcsou0gi0MRM",
  authDomain: "medical-file-b417e.firebaseapp.com",
  projectId: "medical-file-b417e",
  storageBucket: "medical-file-b417e.appspot.com",
  messagingSenderId: "714599880335",
  appId: "1:714599880335:web:d561a09deb9113debd42fa",
  measurementId: "G-WBHVLF7N4N"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCRBARnNL2tTB8N9SJTaDiJN3CZKifVdvI",
//   authDomain: "medical-1f24b.firebaseapp.com",
//   projectId: "medical-1f24b",
//   storageBucket: "medical-1f24b.appspot.com",
//   messagingSenderId: "1053776713808",
//   appId: "1:1053776713808:web:a34f5d4f3c66cd25e39955"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
