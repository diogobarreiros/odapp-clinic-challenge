import { injectable, inject } from 'tsyringe';

import AppError from '../errors/AppError';
import IPacientesRepository from '../database/repositories/interfaces/IPacientesRepository';

import Paciente from '../database/entities/Paciente';

interface IRequest {
  paciente_id: string;
  nome: string;
  idade: number;
  cidade: string;
  estado: string;
}

@injectable()
class UpdatePacienteService {
  constructor(
    @inject('PacientesRepository')
    private pacientesRepository: IPacientesRepository,
  ) {}

  public async execute({
    paciente_id,
    nome,
    idade,
    cidade,
    estado,
  }: IRequest): Promise<Paciente> {
    const paciente = await this.pacientesRepository.findById(paciente_id);

    if (!paciente) {
      throw new AppError('Este paciente não existe.');
    }

    paciente.nome = nome;
    paciente.idade = idade;
    paciente.cidade = cidade;
    paciente.estado = estado;

    return this.pacientesRepository.save(paciente);
  }
}

export default UpdatePacienteService;
