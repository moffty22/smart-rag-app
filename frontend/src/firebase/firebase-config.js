import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHiv_VlddyvCu8DKrrwEuRi_Y_s5QFvqg",
  authDomain: "smart-rag-app-b6104.firebaseapp.com",
  projectId: "smart-rag-app-b6104",
  storageBucket: "smart-rag-app-b6104.appspot.com",
  messagingSenderId: "1007136712497",
  appId: "1:1007136712497:web:4ca0e4cdcbce1d6603f210",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export the initialized services
export { app, auth, db };

