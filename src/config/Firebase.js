// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT1O7JmfNsibjAAK2pH4OVJcrxuwVgTVc",
  authDomain: "eco-diode-381908.firebaseapp.com",
  projectId: "eco-diode-381908",
  storageBucket: "eco-diode-381908.appspot.com",
  messagingSenderId: "983072390384",
  appId: "1:983072390384:web:8bbd1c8388f58c20845635",
  measurementId: "G-41JEHFSNV3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);