// src/firebase-config.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // ✅ Importando o Storage

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCgz7aRGbi2GiTEt-MouRQ6jBdkDg1XKVY",
  authDomain: "alexandria-e219a.firebaseapp.com",
  projectId: "alexandria-e219a",
  storageBucket: "alexandria-e219a.appspot.com",
  messagingSenderId: "688800167608",
  appId: "1:688800167608:web:abcdef1234567890",
  measurementId: "G-XXXXXXX"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar os serviços
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // ✅ Inicializando o Storage

// Exportar todos os serviços necessários
export { auth, db, storage };
