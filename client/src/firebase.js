// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFRbhk5YVNBCAxhTiILOJC3uMBc9MKfyU",
  authDomain: "blogg-37437.firebaseapp.com",
  projectId: "blogg-37437",
  storageBucket: "blogg-37437.appspot.com",
  messagingSenderId: "830965737605",
  appId: "1:830965737605:web:859c1e6877b45b2c64a1ec",
  measurementId: "G-8GEMXYBWRP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
