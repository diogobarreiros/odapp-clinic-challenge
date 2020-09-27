import React, { useRef, useCallback } from 'react';

import { FiCheckSquare } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';

interface IPaciente {
  id: string;
  nome: string;
  idade: number;
  cidade: string;
  estado: string;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleUpdatePaciente: (paciente: IPaciente) => void;
  editingPaciente: IPaciente;
}

const ModalEditPaciente: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  editingPaciente,
  handleUpdatePaciente,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IPaciente) => {
      handleUpdatePaciente(data);
      setIsOpen();
    },
    [handleUpdatePaciente, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingPaciente}>
        <h1>Editar Paciente</h1>
        <Input name="nome" placeholder="Insira seu nome" />
        <Input name="cidade" placeholder="Insira a sua cidade" />
        <Input name="estado" placeholder="Insira seu estado" />
        <Input name="idade" placeholder="Insira a sua idade" />
        <button type="submit" data-testid="edit-paciente-button">
          <div className="text">Editar Paciente</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalEditPaciente;
