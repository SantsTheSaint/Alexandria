import React, { useState } from 'react';
import { db } from '../firebase-config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import '../assets/styles/FormPages.css';

const CriarAtividade = () => {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [professor, setProfessor] = useState('');
  const [materia, setMateria] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'atividades'), {
        title: titulo,
        content: conteudo,
        professor: professor,
        materia: materia,
        createdAt: Timestamp.now()
      });
      setTitulo('');
      setConteudo('');
      setProfessor('');
      setMateria('');
      alert("Atividade criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar atividade:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Criar Atividade</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nome do Professor"
          value={professor}
          onChange={(e) => setProfessor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Matéria"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
          required
        />
        <textarea
          placeholder="Conteúdo da atividade"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          required
        />
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default CriarAtividade;
