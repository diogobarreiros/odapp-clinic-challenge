import 'reflect-metadata';

import AppError from '../errors/AppError';

import FakePacientesRepository from '../database/repositories/fakes/FakePacientesRepository';
import CreatePacienteService from './CreatePacienteService';

let fakePacienteRepository: FakePacientesRepository;
let createPaciente: CreatePacienteService;

describe('CreatePaciente', () => {
  beforeEach(() => {
    fakePacienteRepository = new FakePacientesRepository();

    createPaciente = new CreatePacienteService(fakePacienteRepository);
  });

  it('should be able to create a new paciente', async () => {
    const paciente = await createPaciente.execute({
      nome: 'Diogo',
      idade: 35,
      cidade: 'Ribeirão Preto',
      estado: 'SP',
    });

    expect(paciente).toHaveProperty('id');
  });

  it('should not be able to create a new paciente with an name that has already been used', async () => {
    await createPaciente.execute({
      nome: 'Diogo',
      idade: 35,
      cidade: 'Ribeirão Preto',
      estado: 'SP',
    });

    await expect(
      createPaciente.execute({
        nome: 'Diogo',
        idade: 35,
        cidade: 'Ribeirão Preto',
        estado: 'SP',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
