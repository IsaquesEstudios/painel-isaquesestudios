import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA30UHJDe4dJUDMdd8npmvFQZvBSDfQaEc",
  authDomain: "isaquesestudios-45a86.firebaseapp.com",
  projectId: "isaquesestudios-45a86",
  storageBucket: "isaquesestudios-45a86.appspot.com",
  messagingSenderId: "839419658309",
  appId: "1:839419658309:web:56414bbffbd520447ee32c",
  measurementId: "G-NCH679RN6G",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { db };
