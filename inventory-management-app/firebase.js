import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
 apiKey: "AIzaSyBf_nYyGEoWNK9LMxY8gn8WlNYk7OOQuPc",
 authDomain: "inventory-management-app-6b919.firebaseapp.com",
 projectId: "inventory-management-app-6b919",
 storageBucket: "inventory-management-app-6b919.appspot.com",
 messagingSenderId: "1089206093568",
 appId: "1:1089206093568:web:70af587832becd83bf15e5"
 };
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };