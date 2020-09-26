import { container } from 'tsyringe';

import IPacientesRepository from '../database/repositories/interfaces/IPacientesRepository';
import PacientesRepository from '../database/repositories/PacientesRepository';

container.registerSingleton<IPacientesRepository>(
  'PacientesRepository',
  PacientesRepository,
);
