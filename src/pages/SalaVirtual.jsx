import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config'; // Importando o db do Firebase
import '../assets/styles/SalaVirtual.css';

const SalaVirtual = () => {
  const [atividades, setAtividades] = useState([]);
  const [comunicados, setComunicados] = useState([]);

  // Função para buscar os dados
  const fetchData = async () => {
    try {
      // Buscar atividades e comunicados no Firestore
      const atividadesSnapshot = await getDocs(collection(db, 'atividades'));
      const atividadesList = atividadesSnapshot.docs.map(doc => doc.data());
      setAtividades(atividadesList);

      const comunicadosSnapshot = await getDocs(collection(db, 'comunicados'));
      const comunicadosList = comunicadosSnapshot.docs.map(doc => doc.data());
      setComunicados(comunicadosList);
    } catch (error) {
      console.error('Erro ao buscar dados do Firestore: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="sala-virtual-container">
      <h1>Sala Virtual</h1>

      <div className="sala-content">
        <section className="comunicados">
          <h2>Comunicados dos Professores</h2>
          {comunicados.map((comunicado, index) => (
            <div key={index} className="comunicado">
              <h4>{comunicado.title}</h4>
              <p>{comunicado.content}</p>
            </div>
          ))}
        </section>

        <section className="atividades">
          <h2>Atividades Postadas</h2>
          {atividades.map((atividade, index) => (
            <div key={index} className="atividade">
              <h4>{atividade.title}</h4>
              <p>{atividade.content}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default SalaVirtual;
