import 'reflect-metadata';

import AppError from '../errors/AppError';

import FakePacientesRepository from '../database/repositories/fakes/FakePacientesRepository';
import UpdatePacienteService from './UpdatePacienteService';

let fakePacienteRepository: FakePacientesRepository;
let updatePacienteService: UpdatePacienteService;

describe('UpdatePaciente', () => {
  beforeEach(() => {
    fakePacienteRepository = new FakePacientesRepository();

    updatePacienteService = new UpdatePacienteService(fakePacienteRepository);
  });

  it('should be able to update the paciente', async () => {
    const paciente = await fakePacienteRepository.create({
      nome: 'Diogo',
      idade: 35,
      cidade: 'Ribeirão Preto',
      estado: 'SP',
    });

    const updatePaciente = await updatePacienteService.execute({
      paciente_id: paciente.id.toString(),
      nome: 'Diogo Barreiros',
      idade: 35,
      cidade: 'Ribeirão Preto',
      estado: 'SP',
    });

    expect(updatePaciente.nome).toBe('Diogo Barreiros');
  });

  it('should not be able to update the paciente that does not exist', async () => {
    await expect(
      updatePacienteService.execute({
        paciente_id: '5f6f920d71c73354f4c8dab9',
        nome: 'Diogo Barreiros',
        idade: 35,
        cidade: 'Ribeirão Preto',
        estado: 'SP',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
