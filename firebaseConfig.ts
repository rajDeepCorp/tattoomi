// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQNZtP73yerM-ZYkjodpFHlDr8Vqf2TuY",
  authDomain: "tattoomi-c7d53.firebaseapp.com",
  databaseURL: "https://tattoomi-c7d53-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tattoomi-c7d53",
  storageBucket: "tattoomi-c7d53.firebasestorage.app",
  messagingSenderId: "623716115149",
  appId: "1:623716115149:web:a709a4c042529c30b43f84",
  measurementId: "G-LZG6ETZCG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);