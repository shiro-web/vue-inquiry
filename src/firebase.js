import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOU-Nq7KVZZmpyKCm8GhPvexdljilrABU",
  authDomain: "vue-inquiry.firebaseapp.com",
  projectId: "vue-inquiry",
  storageBucket: "vue-inquiry.appspot.com",
  messagingSenderId: "82821689650",
  appId: "1:82821689650:web:73e1e732c38559d4bfa72b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);