// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, collection
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCyISbhAmygEXCZo2sfOXkBixsIoC93ZOY",
  authDomain: "ml-regression-app.firebaseapp.com",
  projectId: "ml-regression-app",
  storageBucket: "ml-regression-app.appspot.com",
  messagingSenderId: "940622573666",
  appId: "1:940622573666:web:a5a55e9e477a1442fa213b",
  measurementId: "G-61V3J8M2DW"
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

 export { app }
 export default db;