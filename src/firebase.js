import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB9HILSQg_Q72kPhq3oUN0qCezMij8Jqkc",
    authDomain: "wrifilestorage.firebaseapp.com",
    projectId: "wrifilestorage",
    storageBucket: "wrifilestorage.appspot.com",
    messagingSenderId: "641549826743",
    appId: "1:641549826743:web:c4717e7717d7982ee4ab32"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firestore = firebaseApp.firestore()    // For firebase database

// Acccess only folders and files collection
export const database = {
    folders: firestore.collection('folders'),
    files: firestore.collection('files'),
    formatDoc: doc => {
        return { id: doc.id, ...doc.data() }
    },
    getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebaseApp.storage();
export const auth = firebaseApp.auth();     // For firebase authentication
export default firebaseApp;