import firebase from "firebase/app";
import "firebase/firestore";

// Firebase configuration from SDK
const firebaseConfig = {
  apiKey: "AIzaSyApobpGFqvh-frsKmgxtjwawB0ijIpbD7g",
  authDomain: "bryandevblogs.firebaseapp.com",
  projectId: "bryandevblogs",
  storageBucket: "bryandevblogs.appspot.com",
  messagingSenderId: "81628947095",
  appId: "1:81628947095:web:99eca7629bdd65ee41bfd2"
};

// Init Firebase witht the config
const firebaseApp = firebase.initializeApp(firebaseConfig);
// Retrieve timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
