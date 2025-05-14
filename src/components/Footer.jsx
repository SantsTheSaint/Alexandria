import React from 'react';
import '../assets/styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Alexandria. Todos os direitos reservados.</p>
    </footer>
  );
}

export default Footer;
