import { getRepository, Repository } from 'typeorm';

import IPacientesRepository from './interfaces/IPacientesRepository';
import ICreatePacienteDTO from '../../dtos/ICreatePacienteDTO';

import Paciente from '../entities/Paciente';

class PacientesRepository implements IPacientesRepository {
  private ormRepository: Repository<Paciente>;

  constructor() {
    this.ormRepository = getRepository(Paciente);
  }

  public async findById(id: string): Promise<Paciente | undefined> {
    const paciente = await this.ormRepository.findOne(id);

    return paciente;
  }

  public async findByName(nome: string): Promise<Paciente | undefined> {
    const paciente = await this.ormRepository.findOne({
      where: { nome },
    });

    return paciente;
  }

  public async create(pacienteData: ICreatePacienteDTO): Promise<Paciente> {
    const paciente = this.ormRepository.create(pacienteData);

    await this.ormRepository.save(paciente);

    return paciente;
  }

  public async save(paciente: Paciente): Promise<Paciente> {
    return this.ormRepository.save(paciente);
  }
}

export default PacientesRepository;
