import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config'; // Ajuste o caminho, se necessário
import '../assets/styles/Login.css'; // Seu CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [userType, setUserType] = useState('student'); // Definir o tipo de usuário (Aluno ou Professor)
  const [matricula, setMatricula] = useState(''); // Para o número de matrícula
  const [institucionalEmail, setInstitucionalEmail] = useState(''); // Para o email institucional
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Salva o login no localStorage
      localStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email }));

      // Redireciona para a home
      navigate('/');
    } catch (error) {
      setErro('Email ou senha inválidos. Tente novamente.');
      console.error('Erro ao logar:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Tipo de usuário:</label>
        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="student">Aluno</option>
          <option value="teacher">Professor</option>
        </select>

        {/* Campo comum para todos: Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Campo comum para todos: Senha */}
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {/* Campos adicionais dependendo do tipo de usuário */}
        {userType === 'student' && (
          <input
            type="text"
            placeholder="Número de Matrícula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
          />
        )}

        {userType === 'teacher' && (
          <input
            type="email"
            placeholder="Email Institucional"
            value={institucionalEmail}
            onChange={(e) => setInstitucionalEmail(e.target.value)}
            required
          />
        )}

        <button type="submit">Entrar</button>
        {erro && <p className="erro">{erro}</p>}
      </form>
    </div>
  );
};

export default Login;
