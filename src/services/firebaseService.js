import { db } from '../firebase-config'; // Supondo que a configuração do Firebase esteja nesse arquivo
import { doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

// Função para criar uma nova sala
export const criarSala = async (nomeSala, descricaoSala, professorId) => {
  try {
    const salaRef = doc(db, 'salas', nomeSala);
    await setDoc(salaRef, {
      nome: nomeSala,
      descricao: descricaoSala,
      professores: arrayUnion(professorId),
      alunos: [],
    });
    console.log('Sala criada com sucesso');
  } catch (error) {
    console.error('Erro ao criar a sala:', error);
  }
};

// Função para atribuir um professor a uma sala
export const atribuirProfessorSala = async (professorId, nomeSala) => {
  try {
    const salaRef = doc(db, 'salas', nomeSala);
    await updateDoc(salaRef, {
      professores: arrayUnion(professorId),
    });
    console.log('Professor atribuído à sala com sucesso');
  } catch (error) {
    console.error('Erro ao atribuir professor à sala:', error);
  }
};

// Função para atribuir um aluno a uma sala
export const atribuirAlunoSala = async (alunoId, nomeSala) => {
  try {
    const alunoRef = doc(db, 'usuarios', alunoId);
    await updateDoc(alunoRef, {
      sala: nomeSala,
    });

    const salaRef = doc(db, 'salas', nomeSala);
    await updateDoc(salaRef, {
      alunos: arrayUnion(alunoId),
    });

    console.log('Aluno atribuído à sala com sucesso');
  } catch (error) {
    console.error('Erro ao atribuir aluno à sala:', error);
  }
};
