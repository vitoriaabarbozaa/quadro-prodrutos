import { initializeApp, type FirebaseOptions } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDdmsbss_9VYlp0t1ChS7-2W5Kr10JlAM0",
  authDomain: "quadro-de-produtos.firebaseapp.com",
  projectId: "quadro-de-produtos",
  storageBucket: "quadro-de-produtos.firebasestorage.app",
  messagingSenderId: "176869097255",
  appId: "1:176869097255:web:4660fb994a4a3057c87302",
  measurementId: "G-PM9FTW9ZF5",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
