// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext({
  usuario: null,
  loading: true,
});

export const AuthContextProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
