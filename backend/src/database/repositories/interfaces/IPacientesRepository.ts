import Paciente from '../../entities/Paciente';
import ICreatePacienteDTO from '../../../dtos/ICreatePacienteDTO';

export default interface IPacientesRepository {
  findById(id: string): Promise<Paciente | undefined>;
  findByNome(nome: string): Promise<Paciente | undefined>;
  create(data: ICreatePacienteDTO): Promise<Paciente>;
  save(paciente: Paciente): Promise<Paciente>;
}
