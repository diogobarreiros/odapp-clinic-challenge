import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePacienteService from '../services/CreatePacienteService';
import UpdatePacienteService from '../services/UpdatePacienteService';

export default class PacientesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, idade, cidade, estado } = request.body;

    const createPaciente = container.resolve(CreatePacienteService);

    const paciente = await createPaciente.execute({
      nome,
      idade,
      cidade,
      estado,
    });

    return response.json(classToClass(paciente));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const paciente_id = request.params.id;
    const { nome, idade, cidade, estado } = request.body;

    const updatePaciente = container.resolve(UpdatePacienteService);

    const paciente = await updatePaciente.execute({
      paciente_id,
      nome,
      idade,
      cidade,
      estado,
    });

    return response.json(classToClass(paciente));
  }
}
