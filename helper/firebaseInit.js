//lib/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey_dev,
  authDomain: process.env.NEXT_PUBLIC_authDomain_dev,
  projectId: process.env.NEXT_PUBLIC_projectId_dev,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket_dev,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId_dev,
  appId: process.env.NEXT_PUBLIC_appId_dev,
  measurementId: process.env.NEXT_PUBLIC_measurementId_dev,
};

const app = initializeApp(firebaseConfig);

export default app;
