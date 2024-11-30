import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDx8VOojy5KTCtH_PI-yMSc0Vrck6Syfp8",
  authDomain: "passwordmg-55520.firebaseapp.com",
  projectId: "passwordmg-55520",
  storageBucket: "passwordmg-55520.firebasestorage.app",
  messagingSenderId: "449956553758",
  appId: "1:449956553758:web:9987b68ef15dda48feba0f"
};


const app = initializeApp(firebaseConfig);
export const StoreDb = getFirestore(app);