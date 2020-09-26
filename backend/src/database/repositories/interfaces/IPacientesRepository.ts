import Paciente from '../../entities/Paciente';
import ICreatePacienteDTO from '../../../dtos/ICreatePacienteDTO';

export default interface IPacientesRepository {
  findAll(): Promise<Paciente[]>;
  findById(id: string): Promise<Paciente | undefined>;
  findByNome(nome: string): Promise<Paciente | undefined>;
  create(data: ICreatePacienteDTO): Promise<Paciente>;
  save(paciente: Paciente): Promise<Paciente>;
  delete(id: string): Promise<number | null | undefined>;
}
