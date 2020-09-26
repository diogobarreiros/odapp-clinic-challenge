import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import PacienteController from '../controllers/PacientesController';

const pacienteController = new PacienteController();
const routes = Router();

routes.get('/', (request, response) =>
  response.json({ message: 'Hello Odapp!' }),
);

routes.post(
  '/paciente',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      idade: Joi.number().required(),
      cidade: Joi.string().required(),
      estado: Joi.string().required(),
    },
  }),
  pacienteController.create,
);

routes.put(
  '/paciente/:id',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      idade: Joi.number().required(),
      cidade: Joi.string().required(),
      estado: Joi.string().required(),
    },
  }),
  pacienteController.update,
);

routes.delete('/paciente/:id', pacienteController.delete);

export default routes;
