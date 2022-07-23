import firebase from "firebase/compat/app";
import 'firebase/compat/firestore'


//Use this configuration in your app if you want to connect to Cloud Firestore database which contains all the movies/tv shows data.
const firebaseConfig = {
  apiKey: "AIzaSyBUySyFLMXZ1CEpPZOAXrfNoSQ6iutsCcc",
  authDomain: "disneyplus-e30b8.firebaseapp.com",
  projectId: "disneyplus-e30b8",
  storageBucket: "disneyplus-e30b8.appspot.com",
  messagingSenderId: "260581812326",
  appId: "1:260581812326:web:4a91ff0ef910fd1c5465a7",
  measurementId: "G-0LLDWQS54G"
};

//Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore(); //creating the data base //this allows us to use the database we created in firebase site.

export default db
