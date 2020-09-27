import 'reflect-metadata';

import FakePacientesRepository from '../database/repositories/fakes/FakePacientesRepository';
import ListPacienteService from './ListPacienteService';

let fakePacienteRepository: FakePacientesRepository;
let listPacienteService: ListPacienteService;

describe('ListPaciente', () => {
  beforeEach(() => {
    fakePacienteRepository = new FakePacientesRepository();

    listPacienteService = new ListPacienteService(fakePacienteRepository);
  });

  it('should be able to list the pacientes', async () => {
    const paciente = await fakePacienteRepository.create({
      nome: 'Diogo',
      idade: 35,
      cidade: 'Ribeirão Preto',
      estado: 'SP',
    });

    const pacientes = await listPacienteService.execute();

    expect(pacientes[0].nome).toBe(paciente.nome);
  });
});
