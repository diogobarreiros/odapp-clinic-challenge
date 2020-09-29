import React from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';

interface IPaciente {
  id: string;
  nome: string;
  idade: number;
  cidade: string;
  estado: string;
}

interface IProps {
  paciente: IPaciente;
  handleDelete: (id: string) => {};
  handleEditPaciente: (paciente: IPaciente) => void;
}

const Paciente: React.FC<IProps> = ({
  paciente,
  handleDelete,
  handleEditPaciente,
}: IProps) => {
  function setEditingPaciente(): void {
    handleEditPaciente(paciente);
  }

  return (
    <Container>
      <section className="body">
        <h3>Paciente</h3>
        <h2>{paciente.nome}</h2>
        <h3>Cidade</h3>
        <p>
          {paciente.cidade} - {paciente.estado}
        </p>
        <h3>Idade</h3>
        <p className="age">
          <b>{paciente.idade} anos</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingPaciente()}
            data-testid={`edit-paciente-${paciente.nome}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(paciente.id)}
            data-testid={`remove-paciente-${paciente.nome}`}
          >
            <FiTrash size={20} />
          </button>
        </div>
      </section>
    </Container>
  );
};

export default Paciente;
