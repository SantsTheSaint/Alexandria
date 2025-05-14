import React, { useEffect, useState, useContext } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileProfessor from './ProfileProfessor';
import ProfileAluno from './ProfileAluno';

const Profile = () => {
  const { usuario } = useContext(AuthContext);
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTipoUsuario = async () => {
      if (!usuario) {
        navigate('/login');
        return;
      }

      try {
        const docRef = doc(db, 'usuarios', usuario.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTipoUsuario(docSnap.data().type);
        } else {
          console.error('Usuário não encontrado no Firestore');
        }
      } catch (error) {
        console.error('Erro ao buscar tipo de usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTipoUsuario();
  }, [usuario, navigate]);

  if (loading) return <div>Carregando perfil...</div>;

  if (tipoUsuario === 'professor') return <ProfileProfessor />;
  if (tipoUsuario === 'aluno') return <ProfileAluno />;

  return <div>Tipo de usuário desconhecido.</div>;
};

export default Profile;
