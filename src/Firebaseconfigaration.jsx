import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRrSHQqqmDK6ITyMqNEBKuDYsas5JNmEI",
  authDomain: "profile-9beed.firebaseapp.com",
  projectId: "profile-9beed",
  storageBucket: "profile-9beed.appspot.com",
  messagingSenderId: "624531495928",
  appId: "1:624531495928:web:3a32a5d047c7df87a9d40d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig;