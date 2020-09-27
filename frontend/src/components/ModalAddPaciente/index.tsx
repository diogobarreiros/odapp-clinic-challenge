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
  handleAddPaciente: (paciente: IPaciente) => void;
}

const ModalAddPaciente: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  handleAddPaciente,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IPaciente) => {
      handleAddPaciente(data);
      setIsOpen();
    },
    [handleAddPaciente, setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Paciente</h1>
        <Input name="nome" placeholder="Insira seu nome" />
        <Input name="cidade" placeholder="Insira a sua cidade" />
        <Input name="estado" placeholder="Insira a seu estado" />
        <Input name="idade" placeholder="Insira a sua idade" />
        <button type="submit" data-testid="add-paciente-button">
          <p className="text">Adicionar Paciente</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalAddPaciente;
