import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBY6H0DVhoZuf3UY3t6rqHXC6tZW7qTpIw",
  authDomain: "e-commerce-react-firebas-4f9ad.firebaseapp.com",
  projectId: "e-commerce-react-firebas-4f9ad",
  storageBucket: "e-commerce-react-firebas-4f9ad.appspot.com",
  messagingSenderId: "771638661848",
  appId: "1:771638661848:web:4f70f704bc36974dc2bdad",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export { auth, fs, storage };
