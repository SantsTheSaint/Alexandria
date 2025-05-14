import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth, db } from './firebase-config';
import { doc, getDoc } from 'firebase/firestore';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CriarAtividade from './pages/CriarAtividade';
import CriarComunicado from './pages/CriarComunicado';
import CriarPDF from './pages/CriarPDF';
import SalaVirtual from './pages/SalaVirtual';

import NavbarAluno from './components/NavbarAluno';
import NavbarProfessor from './components/NavbarProfessor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  const { usuario, loading } = useContext(AuthContext);  // Se adicionou loading no contexto
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarTipoUsuario = async () => {
      if (usuario) {
        try {
          const docRef = doc(db, 'usuarios', usuario.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setTipoUsuario(docSnap.data().type);
          } else {
            console.error("Documento de usuário não encontrado.");
            setTipoUsuario(null);
          }
        } catch (error) {
          console.error("Erro ao buscar tipo de usuário:", error);
          setTipoUsuario(null);
        }
      } else {
        setTipoUsuario(null);
      }
    };
    buscarTipoUsuario();
  }, [usuario]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (loading) {
    // Opcional: pode criar um componente Loading para ficar aqui
    return <div>Carregando...</div>;
  }

  return (
    <>
      {/* Navbar dinâmica */}
      {!usuario && <Navbar />}
      {usuario && tipoUsuario === 'professor' && <NavbarProfessor onLogout={handleLogout} />}
      {usuario && tipoUsuario === 'aluno' && <NavbarAluno onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={usuario ? <Profile /> : <Login />} />

        {/* Rotas exclusivas para professores */}
        {usuario && tipoUsuario === 'professor' && (
          <>
            <Route path="/criar-atividade" element={<CriarAtividade />} />
            <Route path="/criar-comunicado" element={<CriarComunicado />} />
            <Route path="/criar-pdf" element={<CriarPDF />} />
          </>
        )}

        {/* Rota exclusiva para alunos */}
        {usuario && tipoUsuario === 'aluno' && (
          <Route path="/sala" element={<SalaVirtual />} />
        )}
      </Routes>

      <Footer />
    </>
  );
};

export default App;
