import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectIdColumn,
} from 'typeorm';

import { ObjectID } from 'mongodb';

@Entity('pacientes')
class Paciente {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  nome: string;

  @Column()
  idade: number;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @CreateDateColumn()
  dataCadastro: Date;

  @UpdateDateColumn()
  dataAlteracao: Date;
}

export default Paciente;
