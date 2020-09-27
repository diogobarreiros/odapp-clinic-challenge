import AppError from '../errors/AppError';

import 'reflect-metadata';

import FakePacientesRepository from '../database/repositories/fakes/FakePacientesRepository';
import DeletePacienteService from './DeletePacienteService';

let fakePacienteRepository: FakePacientesRepository;
let deletePacienteService: DeletePacienteService;

describe('DeletePaciente', () => {
  beforeEach(() => {
    fakePacienteRepository = new FakePacientesRepository();

    deletePacienteService = new DeletePacienteService(fakePacienteRepository);
  });

  it('should be able to delete a paciente', async () => {
    const paciente = await fakePacienteRepository.create({
      nome: 'Diogo',
      idade: 35,
      cidade: 'Ribeirão Preto',
      estado: 'SP',
    });

    const deleteResult = await deletePacienteService.execute({
      paciente_id: paciente.id.toString(),
    });

    expect(deleteResult).toBe(-1);
  });

  it('should not be able to delete a paciente that does not exist', async () => {
    await expect(
      deletePacienteService.execute({
        paciente_id: '5f6f920d71c73354f4c8dab9',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
