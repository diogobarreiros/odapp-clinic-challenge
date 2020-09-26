import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';
import IPacientesRepository from '../database/repositories/interfaces/IPacientesRepository';

import Paciente from '../database/entities/Paciente';

interface IRequest {
  nome: string;
  idade: number;
  cidade: string;
  estado: string;
}

@injectable()
class CreatePacienteService {
  constructor(
    @inject('PacientesRepository')
    private pacientesRepository: IPacientesRepository,
  ) {}

  public async execute({
    nome,
    idade,
    cidade,
    estado,
  }: IRequest): Promise<Paciente> {
    const checkPacienteExists = await this.pacientesRepository.findByNome(nome);

    if (checkPacienteExists) {
      throw new AppError('Name already used.');
    }

    const paciente = await this.pacientesRepository.create({
      nome,
      idade,
      cidade,
      estado,
    });

    return paciente;
  }
}

export default CreatePacienteService;
