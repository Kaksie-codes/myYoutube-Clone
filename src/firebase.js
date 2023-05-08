import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvDpSX3QS4c5u6gOdUc-_6xKmNJLouXhk",
  authDomain: "my-5c3fa.firebaseapp.com",
  projectId: "my-5c3fa",
  storageBucket: "my-5c3fa.appspot.com",
  messagingSenderId: "128660498454",
  appId: "1:128660498454:web:ee399b1ab4b5cc898dad37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth };
export default db;