
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDZ0SoivmTIdO38pfMN_w6mdpDrJbJpE_4",

  authDomain: "reciep-62419.firebaseapp.com",

  projectId: "reciep-62419",

  storageBucket: "reciep-62419.appspot.com",

  messagingSenderId: "424863140215",

  appId: "1:424863140215:web:72b561e3ee2af1da1ff972",

  measurementId: "G-K9KT1RZ99D"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
