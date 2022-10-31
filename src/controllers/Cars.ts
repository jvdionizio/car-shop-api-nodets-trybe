import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { ICar } from '../interfaces/ICar';

export default class CarsController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request, res: Response<ICar>) {
    const created = await this._service.create(req.body);
    res.status(201).json(created);
  }

  public async read(req: Request, res: Response<ICar[]>) {
    const readAll = await this._service.read(); 
    res.status(200).json(readAll);
  }

  public async readOne(req: Request, res: Response<ICar>) {
    const readById = await this._service.readOne(req.params.id);
    res.status(200).json(readById);
  }

  public async update(req: Request, res: Response<ICar>) {
    const request = req.body;
    const updated = await this._service.update(req.params.id, request);
    res.status(200).json(updated);
  }

  public async delete(req: Request, res: Response<ICar>) {
    await this._service.delete(req.params.id);
    res.status(204).json();
  }
}