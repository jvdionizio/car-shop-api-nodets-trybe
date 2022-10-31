import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorCycle';
import { IService } from '../interfaces/IService';

class MotorcycleController {
  constructor(private _service:IService<IMotorcycle>) {}

  public async create(
    req:Request,
    res:Response<IMotorcycle>,
  ) {
    const motorData = { ...req.body };
    const result = await this._service.create(motorData);
    res.status(201).json(result);
  }

  public async read(
    _req:Request,
    res:Response<IMotorcycle[]>,
  ) {
    const result = await this._service.read();
    res.status(200).json(result);
  }

  public async readOne(
    req:Request,
    res:Response<IMotorcycle>,
  ) {
    const { id } = req.params;
    const result = await this._service.readOne(id);
    res.status(200).json(result);
  }

  public async update(
    req:Request,
    res:Response<IMotorcycle>,
  ) {
    const { id } = req.params;
    const obj = { ...req.body };
    const result = await this._service.update(id, obj);
    res.status(200).json(result);
  }

  public async delete(
    req:Request,
    res:Response,
  ) {
    const { id } = req.params;
    await this._service.delete(id);
    res.status(204).end();
  }
}

export default MotorcycleController;