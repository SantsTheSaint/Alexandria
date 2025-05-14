import React, { useState, useContext, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Modal from 'react-modal';
import { AuthContext } from '../context/AuthContext';
import { db } from '../firebase-config';
import '../assets/styles/Home.css';

const Home = () => {
  const { usuario } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [comunicadoSelecionado, setComunicadoSelecionado] = useState(null);
  const [comunicados, setComunicados] = useState([]);
  const [atividades, setAtividades] = useState([]);
  const [pdfs, setPdfs] = useState([]);

  const fetchData = async () => {
    try {
      const comunicadosSnapshot = await getDocs(collection(db, 'comunicados'));
      const comunicadosList = comunicadosSnapshot.docs
        .map(doc => doc.data())
        .filter(data => data.title && data.content); // Garante que só traga comunicados completos
      setComunicados(comunicadosList);

      const atividadesSnapshot = await getDocs(collection(db, 'atividades'));
      const atividadesList = atividadesSnapshot.docs
        .map(doc => doc.data())
        .filter(data => data.title && data.content);
      setAtividades(atividadesList);

      const pdfsSnapshot = await getDocs(collection(db, 'pdfs'));
      const pdfsList = pdfsSnapshot.docs
        .map(doc => doc.data())
        .filter(data => data.title && data.description);
      setPdfs(pdfsList);
    } catch (error) {
      console.error("Erro ao buscar dados do Firestore: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (comunicado) => {
    setComunicadoSelecionado(comunicado);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setComunicadoSelecionado(null);
  };

  return (
    <div className="home-container">
      <div className="main-content">
        <div className="feed">
          <h2>Feed de Atividades</h2>
          {atividades.map((atividade, index) => (
            <div key={index} className="post">
              <h3>{atividade.title || 'Sem título'}</h3>
              <p>{atividade.content || 'Sem conteúdo'}</p>
              <button>Curtir</button>
            </div>
          ))}
        </div>

        <div className="sidebar">
          <h3>Comunicados</h3>
          {comunicados.map((comunicado, index) => (
            <div key={index} className="comunicado" onClick={() => openModal(comunicado)}>
              <h4>{comunicado.title || 'Sem título'}</h4>
              <p>{comunicado.content?.substring(0, 50) || 'Sem conteúdo'}...</p>
            </div>
          ))}

          {usuario?.tipo === 'professor' && (
            <>
              <h3>Funções do Professor</h3>
              <div className="atividade">
                <h4>Criar Atividade</h4>
                <button>Criar</button>
              </div>
            </>
          )}

          {usuario?.tipo === 'aluno' && (
            <>
              <h3>Funções do Aluno</h3>
              <div className="atividade">
                <h4>Visualizar Atividades</h4>
                <button>Ver</button>
              </div>
            </>
          )}

          <h3>PDFs</h3>
          {pdfs.map((pdf, index) => (
            <div key={index} className="pdf-post">
              <h4>{pdf.title || 'Sem título'}</h4>
              <p>{pdf.description || 'Sem descrição'}</p>
              <button>Ver PDF</button>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Comunicado">
        <h2>{comunicadoSelecionado?.title || 'Sem título'}</h2>
        <p>{comunicadoSelecionado?.content || 'Sem conteúdo'}</p>
        <button onClick={closeModal}>Fechar</button>
      </Modal>

      <footer className="footer">
        Alexandria © 2024
      </footer>
    </div>
  );
};

export default Home;
