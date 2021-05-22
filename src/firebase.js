import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBtZVUCPv2lwFIOFIIVD4eXifWhn8zhufU',
	authDomain: 'phone-shop-b4bce.firebaseapp.com',
	projectId: 'phone-shop-b4bce',
	storageBucket: 'phone-shop-b4bce.appspot.com',
	messagingSenderId: '19499934446',
	appId: '1:19499934446:web:db671b43d304060e7209ff',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { db, auth,storage };
