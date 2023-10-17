
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBIeMQ9XppqAQgFFVExjHI5J98CrXYM5O8",
    authDomain: "projectmgmtsys-b6d4a.firebaseapp.com",
    projectId: "projectmgmtsys-b6d4a",
    storageBucket: "projectmgmtsys-b6d4a.appspot.com",
    messagingSenderId: "590455083925",
    appId: "1:590455083925:web:9f4d2bea06d2a3ca541c9c"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);