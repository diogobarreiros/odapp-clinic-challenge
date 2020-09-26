import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';
import IPacientesRepository from '../database/repositories/interfaces/IPacientesRepository';

interface IRequest {
  paciente_id: string;
}

@injectable()
class DeletePacienteService {
  constructor(
    @inject('PacientesRepository')
    private pacientesRepository: IPacientesRepository,
  ) {}

  public async execute({
    paciente_id,
  }: IRequest): Promise<number | null | undefined> {
    const paciente = await this.pacientesRepository.findById(paciente_id);

    if (!paciente) throw new AppError('Este paciente não existe.');

    return this.pacientesRepository.delete(paciente_id);
  }
}

export default DeletePacienteService;
