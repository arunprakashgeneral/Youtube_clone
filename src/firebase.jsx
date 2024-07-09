import { initializeApp } from 'firebase/app';
import   {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCd8-Jhvjkv0Fn80q93T3XBjshurXzLi2s",
    authDomain: "copper-eye-204308.firebaseapp.com",
    projectId: "copper-eye-204308",
    storageBucket: "copper-eye-204308.appspot.com",
    messagingSenderId: "92044590487",
    appId: "1:92044590487:web:d625db0701aa2b700798d2",
    measurementId: "G-PK8H2G05JY"
  };

  const app = initializeApp(firebaseConfig)
export  const auth = getAuth(app)