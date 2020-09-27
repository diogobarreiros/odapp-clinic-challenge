import { ObjectID } from 'mongodb';

import IPacientesRepository from '../interfaces/IPacientesRepository';
import ICreatePacienteDTO from '../../../dtos/ICreatePacienteDTO';

import Paciente from '../../entities/Paciente';

class FakePacientesRepository implements IPacientesRepository {
  private pacientes: Paciente[] = [];

  public async findById(id: string): Promise<Paciente | undefined> {
    const paciente = this.pacientes.find(
      element => element.id.toString() === id,
    );

    return paciente;
  }

  public async findByNome(nome: string): Promise<Paciente | undefined> {
    const paciente = this.pacientes.find(element => element.nome === nome);

    return paciente;
  }

  public async create(pacienteData: ICreatePacienteDTO): Promise<Paciente> {
    const paciente: Paciente = {
      id: new ObjectID(),
      nome: pacienteData.nome,
      idade: pacienteData.idade,
      cidade: pacienteData.cidade,
      estado: pacienteData.estado,
      dataCadastro: new Date(),
      dataAlteracao: new Date(),
    };

    this.save(paciente);

    return paciente;
  }

  public async save(paciente: Paciente): Promise<Paciente> {
    this.pacientes.push(paciente);
    return paciente;
  }

  public async delete(id: string): Promise<number | null | undefined> {
    const paciente = this.pacientes.findIndex(
      element => element.id === new ObjectID(id),
    );

    this.pacientes.splice(paciente);

    return paciente;
  }

  public async findAll(): Promise<Paciente[]> {
    return this.pacientes;
  }
}

export default FakePacientesRepository;
