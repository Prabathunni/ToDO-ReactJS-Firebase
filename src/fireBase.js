import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCHg76ah4a3AfQXJpC4iOJHAKjhcgQ6p3A",
    authDomain: "todo-app-3d4d3.firebaseapp.com",
    projectId: "todo-app-3d4d3",
    storageBucket: "todo-app-3d4d3.firebasestorage.app",
    messagingSenderId: "391047058132",
    appId: "1:391047058132:web:e1e6e2d433be8681932141"
  };


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


