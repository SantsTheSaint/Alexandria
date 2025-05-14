import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/Navbar.css';

const NavbarAluno = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-title">Alexandria</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/profile">Perfil</Link>
        <Link to="/sala">Sala</Link> {/* Link para a Sala Virtual */}
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default NavbarAluno;
