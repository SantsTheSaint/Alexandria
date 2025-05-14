import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/ProfileProfessor.css'; // Certifique-se de que esse caminho está correto

const ProfileProfessor = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [professorData, setProfessorData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
        setLoading(false);

        const professorRef = doc(db, 'professores', user.uid);
        getDoc(professorRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              setProfessorData(docSnap.data());
            }
          })
          .catch((error) => {
            console.error("Erro ao obter dados do professor:", error);
          });
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="profile-container">
      <h2>Perfil do Professor</h2>
      <div className="profile-info">
        <p><strong>Nome:</strong> {usuario.displayName || usuario.email}</p>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Área de atuação:</strong> {professorData?.areaAtuacao}</p>
      </div>
    </div>
  );
};

export default ProfileProfessor;
