import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePacienteService from '../services/CreatePacienteService';

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
}
