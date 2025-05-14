// src/components/ProfessorNavbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Navbar.css'; // Pode usar o mesmo estilo

function ProfessorNavbar() {
  const [mostrarMenu, setMostrarMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">Alexandria</div>
      <ul className="nav-links">
        <li><Link to="/home">Início</Link></li>
        <li
          className="dropdown"
          onMouseEnter={() => setMostrarMenu(true)}
          onMouseLeave={() => setMostrarMenu(false)}
        >
          <span className="dropdown-toggle">Novo Post</span>
          {mostrarMenu && (
            <ul className="dropdown-menu">
              <li><Link to="/novo-post/arquivo">Arquivos</Link></li>
              <li><Link to="/novo-post/comunicado">Comunicados</Link></li>
              <li><Link to="/novo-post/trabalho">Trabalhos</Link></li>
            </ul>
          )}
        </li>
        <li><Link to="/perfil">Perfil</Link></li>
      </ul>
    </nav>
  );
}

export default ProfessorNavbar;
