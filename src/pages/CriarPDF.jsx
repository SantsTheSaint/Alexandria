import React, { useState } from 'react';
import { storage, db } from '../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import '../assets/styles/FormPages.css';

const CriarPDF = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !description) return;

    const storageRef = ref(storage, `pdfs/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(db, 'pdfs'), {
      title,
      description,
      url,
      filename: file.name,
      createdAt: Timestamp.now()
    });

    setFile(null);
    setTitle('');
    setDescription('');
    alert("PDF enviado com sucesso!");
  };

  return (
    <div className="form-container">
      <h2>Enviar PDF</h2>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default CriarPDF;
