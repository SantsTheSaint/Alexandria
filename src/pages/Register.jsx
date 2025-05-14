import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase-config'; // db importado do firebase-config
import { useNavigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import '../assets/styles/Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('aluno'); // Correção: "aluno" em vez de "student"
  const [institutionalEmail, setInstitutionalEmail] = useState('');
  const [matriculationNumber, setMatriculationNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Criando documento na coleção "usuarios"
      const userRef = doc(db, 'usuarios', user.uid);
      await setDoc(userRef, {
        email: user.email,
        type: userType, // Campo esperado: "type": "aluno" ou "professor"
        ...(userType === 'professor' && { institutionalEmail }),
        ...(userType === 'aluno' && { matriculationNumber }),
      });

      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (err) {
      setError(`Erro ao cadastrar: ${err.message}`);
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastro</h2>
      {error && <p className="message error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Tipo de usuário:</label>
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="aluno">Aluno</option>
          <option value="professor">Professor</option>
        </select>

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {userType === 'professor' && (
          <>
            <label>Email Institucional:</label>
            <input
              type="email"
              value={institutionalEmail}
              onChange={(e) => setInstitutionalEmail(e.target.value)}
              required
            />
          </>
        )}

        {userType === 'aluno' && (
          <>
            <label>Número de Matrícula:</label>
            <input
              type="text"
              value={matriculationNumber}
              onChange={(e) => setMatriculationNumber(e.target.value)}
              required
            />
          </>
        )}

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Register;
