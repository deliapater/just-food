import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD91LDttrsff3LAEc7_-kfLntk8Hcne4CA",
    authDomain: "just-food-b22d0.firebaseapp.com",
    projectId: "just-food-b22d0",
    storageBucket: "just-food-b22d0.appspot.com",
    messagingSenderId: "364236214968",
    appId: "1:364236214968:web:9d1054e555fe31f111da4d",
    measurementId: "G-0X39QRLSYM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const signUp = async (name, email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    await updateProfile(user, { displayName: name });
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logOut = () => {
  signOut(auth);
};
export { auth, db, signIn, signUp, logOut };
