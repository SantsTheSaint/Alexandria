import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase-config'; 
import { doc, getDoc } from 'firebase/firestore';  // Importar funções do Firestore
import '../assets/styles/Navbar.css';

const Navbar = () => {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userType, setUserType] = useState(null);  // Estado para armazenar o tipo de usuário

  useEffect(() => {
    if (usuario) {
      // Verifica o tipo de usuário (professor ou aluno) a partir do Firestore
      const userRef = doc(db, usuario.displayName === 'professor' ? 'professores' : 'alunos', usuario.uid);
      getDoc(userRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setUserType(docSnap.data().type);  // Assume que o Firestore tem um campo `type`
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar o tipo de usuário: ", error);
        });
    }
  }, [usuario]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Alexandria</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {usuario && <Link to="/profile">Perfil</Link>}
        {/* Se o usuário for professor, exibe as opções de criação */}
        {userType === 'professor' && (
          <>
            <Link to="/criar-atividade">Criar Atividade</Link>
            <Link to="/criar-comunicado">Criar Comunicado</Link>
            <Link to="/criar-pdf">Criar PDF</Link>
          </>
        )}
        {!usuario ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Cadastrar</Link>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
