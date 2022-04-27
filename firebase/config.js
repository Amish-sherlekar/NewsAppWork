import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBeVZYukP_QvQKQqLWDq3jBdYHzFCUzIv8",
    authDomain: "my-awesome-news-app.firebaseapp.com",
    projectId: "my-awesome-news-app",
    storageBucket: "my-awesome-news-app.appspot.com",
    messagingSenderId: "994429566005",
    appId: "1:994429566005:web:5a746abde3624c937a857c"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;