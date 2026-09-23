import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBeitjSGcfRsFRKsrChFE_J3gCmhsl4lfU",
  authDomain: "barbershop-reservation-system.firebaseapp.com",
  projectId: "barbershop-reservation-system",
  storageBucket: "barbershop-reservation-system.firebasestorage.app",
  messagingSenderId: "298702669577",
  appId: "1:298702669577:web:4fee778c8a0ef34b41f5d8",
  measurementId: "G-0QXQ7R6Z8W"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});

export default app;