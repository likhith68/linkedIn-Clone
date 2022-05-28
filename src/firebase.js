import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDnL67MLeTBTacjeMsuUz6rWGKv6nFAMlc",
    authDomain: "linkedin-clone-8da5f.firebaseapp.com",
    projectId: "linkedin-clone-8da5f",
    storageBucket: "linkedin-clone-8da5f.appspot.com",
    messagingSenderId: "852562782945",
    appId: "1:852562782945:web:edd70b043df31c726b25a0",
    measurementId: "G-LD2ZHS0ZYW"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(firebaseApp);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;