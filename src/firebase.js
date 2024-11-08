// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAidRzfccsCj_p_Qb2ncQEigBQ7jU-53uQ",
  authDomain: "con-ms.firebaseapp.com",
  projectId: "con-ms",
  storageBucket: "con-ms.firebasestorage.app",
  messagingSenderId: "1009529497926",
  appId: "1:1009529497926:web:8fd1e9cfc1c01cdc30dd47",
  measurementId: "G-QGVKFW4L3R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);