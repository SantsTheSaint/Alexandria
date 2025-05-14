import React, { useState } from 'react';
import { criarSala, atribuirProfessorSala } from '../../services/firebaseService';

const ProfessorDashboard = ({ professorId }) => {
  const [nomeSala, setNomeSala] = useState('');
  const [descricaoSala, setDescricaoSala] = useState('');

  const handleCreateSala = async () => {
    if (nomeSala && descricaoSala) {
      await criarSala(nomeSala, descricaoSala, professorId);
    }
  };

  const handleAddProfessorToSala = async (nomeSala) => {
    await atribuirProfessorSala(professorId, nomeSala);
  };

  return (
    <div>
      <h2>Dashboard do Professor</h2>
      <div>
        <input
          type="text"
          placeholder="Nome da Sala"
          value={nomeSala}
          onChange={(e) => setNomeSala(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição da Sala"
          value={descricaoSala}
          onChange={(e) => setDescricaoSala(e.target.value)}
        />
        <button onClick={handleCreateSala}>Criar Sala</button>
      </div>

      {/* Exemplo de como o professor poderia ser atribuído a outras salas */}
      <button onClick={() => handleAddProfessorToSala(nomeSala)}>
        Adicionar Professor à Sala
      </button>
    </div>
  );
};

export default ProfessorDashboard;
