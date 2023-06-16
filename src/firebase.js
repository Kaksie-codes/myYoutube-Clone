import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHc5JznV1H2nzp0OmFHXQ7W3F_Yfk9tZk",
  authDomain: "myclone-007.firebaseapp.com",
  projectId: "myclone-007",
  storageBucket: "myclone-007.appspot.com",
  messagingSenderId: "380409460169",
  appId: "1:380409460169:web:a4a211da75108a7311a418"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth };
export default db;