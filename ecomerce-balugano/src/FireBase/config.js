import { initializeApp } from "firebase/app";
export const getFirestoreApp = () => {
    return app;
}

const firebaseConfig = {
  apiKey: "AIzaSyAARSOE4jYyS20jqAMc3uhh4MYPnyTScqo",
  authDomain: "ecomerce-balugano.firebaseapp.com",
  projectId: "ecomerce-balugano",
  storageBucket: "ecomerce-balugano.appspot.com",
  messagingSenderId: "250635424222",
  appId: "1:250635424222:web:d42e210ab3211916080d4f"
};

// Initialize Firebase con mi api-key
const app = initializeApp(firebaseConfig);

export const getfirestoreApp = ()=>{
    return app;
}

