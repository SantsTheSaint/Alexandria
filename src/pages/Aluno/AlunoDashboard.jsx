import React, { useState, useEffect } from 'react';
import { atribuirAlunoSala } from '../../services/firebaseService';
import { useAuth } from '../../context/AuthContext';

const AlunoDashboard = () => {
  const { usuario } = useAuth();
  const [nomeSala, setNomeSala] = useState('');

  const handleAssignAlunoToSala = async () => {
    if (nomeSala && usuario) {
      await atribuirAlunoSala(usuario.uid, nomeSala);
    }
  };

  return (
    <div>
      <h2>Dashboard do Aluno</h2>
      <input
        type="text"
        placeholder="Nome da Sala"
        value={nomeSala}
        onChange={(e) => setNomeSala(e.target.value)}
      />
      <button onClick={handleAssignAlunoToSala}>Atribuir Aluno à Sala</button>
    </div>
  );
};

export default AlunoDashboard;
