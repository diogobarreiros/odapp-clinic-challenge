import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import api from '../../services/api';

import Paciente from '../../components/Paciente';
import ModalAddPaciente from '../../components/ModalAddPaciente';
import ModalEditPaciente from '../../components/ModalEditPaciente';

import { PacientesContainer } from './styles';

interface IPaciente {
  id: string;
  nome: string;
  idade: number;
  cidade: string;
  estado: string;
}

const Dashboard: React.FC = () => {
  const [pacientes, setPacientes] = useState<IPaciente[]>([]);
  const [editingPaciente, setEditingPaciente] = useState<IPaciente>(
    {} as IPaciente,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    async function loadPacientes(): Promise<void> {
      await api.get('pacientes').then(response => setPacientes(response.data));
    }

    loadPacientes();
  }, []);

  async function handleAddPaciente(paciente: IPaciente): Promise<void> {
    try {
      const response = await api.post('paciente', paciente);

      setPacientes([...pacientes, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdatePaciente(paciente: IPaciente): Promise<void> {
    const { id } = editingPaciente;

    const response = await api.put(`/paciente/${id}`, paciente);

    const updatedState = pacientes.filter(item => item.id !== id);

    setPacientes([...updatedState, response.data]);
  }

  async function handleDeletePaciente(id: string): Promise<void> {
    await api.delete(`/paciente/${id}`);

    const updatedState = pacientes.filter(paciente => paciente.id !== id);

    setPacientes(updatedState);
  }

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal(): void {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditPaciente(paciente: IPaciente): void {
    setEditingPaciente(paciente);
    toggleEditModal();
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddPaciente
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddPaciente={handleAddPaciente}
      />
      <ModalEditPaciente
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingPaciente={editingPaciente}
        handleUpdatePaciente={handleUpdatePaciente}
      />

      <PacientesContainer data-testid="pacientes-list">
        {pacientes &&
          pacientes.map(paciente => (
            <Paciente
              key={paciente.id}
              paciente={paciente}
              handleDelete={handleDeletePaciente}
              handleEditPaciente={handleEditPaciente}
            />
          ))}
      </PacientesContainer>
    </>
  );
};

export default Dashboard;
