import { injectable, inject } from 'tsyringe';

import Paciente from '../database/entities/Paciente';
import IPacientesRepository from '../database/repositories/interfaces/IPacientesRepository';

@injectable()
export default class ListPacientesService {
  constructor(
    @inject('PacientesRepository')
    private pacientesRepository: IPacientesRepository,
  ) {}

  async execute(): Promise<Paciente[]> {
    const pacientes = await this.pacientesRepository.findAll();

    return pacientes;
  }
}
