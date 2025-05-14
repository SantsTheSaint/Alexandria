import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/ProfileAluno.css';

const ProfileAluno = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alunoData, setAlunoData] = useState({ nome: '', matricula: '', curso: '' });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUsuario(user);
        try {
          const alunoRef = doc(db, 'alunos', user.uid);
          const docSnap = await getDoc(alunoRef);
          if (docSnap.exists()) {
            setAlunoData(docSnap.data());
          }
        } catch (error) {
          console.error("Erro ao obter dados do aluno:", error);
        } finally {
          setLoading(false);
        }
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlunoData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const alunoRef = doc(db, 'alunos', usuario.uid);
      await updateDoc(alunoRef, alunoData);
      setEditMode(false);
    } catch (error) {
      console.error("Erro ao salvar dados do aluno:", error);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="profile-container">
      <h2>Perfil do Aluno</h2>
      <div className="profile-info">
        <label>
          <span>Nome:</span>
          {editMode ? (
            <input
              type="text"
              name="nome"
              value={alunoData.nome}
              onChange={handleChange}
            />
          ) : (
            <p>{alunoData.nome || usuario.displayName || usuario.email}</p>
          )}
        </label>

        <label>
          <span>Email:</span>
          <p>{usuario.email}</p>
        </label>

        <label>
          <span>Matrícula:</span>
          {editMode ? (
            <input
              type="text"
              name="matricula"
              value={alunoData.matricula}
              onChange={handleChange}
            />
          ) : (
            <p>{alunoData.matricula}</p>
          )}
        </label>

        <label>
          <span>Curso:</span>
          {editMode ? (
            <input
              type="text"
              name="curso"
              value={alunoData.curso}
              onChange={handleChange}
            />
          ) : (
            <p>{alunoData.curso || 'Não informado'}</p>
          )}
        </label>

        <div className="profile-actions">
          {editMode ? (
            <>
              <button onClick={handleSave} className="save-btn">Salvar</button>
              <button onClick={() => setEditMode(false)} className="cancel-btn">Cancelar</button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)} className="edit-btn">Editar Perfil</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileAluno;
