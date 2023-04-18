import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1koV7z_lz9uSqIS41Kimegi6sjeHhfjM",
  authDomain: "unsplash-21e9a.firebaseapp.com",
  projectId: "unsplash-21e9a",
  storageBucket: "unsplash-21e9a.appspot.com",
  messagingSenderId: "934597752846",
  appId: "1:934597752846:web:57838e8e5fb49e3465a45f",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
