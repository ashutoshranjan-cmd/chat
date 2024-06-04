// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDa94GYaShDXtFWzCoPpZvClRLXEDpcNI",
  authDomain: "chat-892aa.firebaseapp.com",
  projectId: "chat-892aa",
  storageBucket: "chat-892aa.appspot.com",
  messagingSenderId: "1014942794820",
  appId: "1:1014942794820:web:625487061c8ba243162811",
  measurementId: "G-5LJT5PBK01"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);