import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';
import { IMotorcycle, MotorcycleShema } from '../interfaces/IMotorCycle';
import MotorcycleModel from '../models/Motors';
import { ErrorTypes } from '../errors/catalog';

class MotorcycleService implements IService<IMotorcycle> {
  private _model:IModel<IMotorcycle>;

  constructor(model:IModel<IMotorcycle> = new MotorcycleModel()) {
    this._model = model;
  }

  static async zodValidation(obj: unknown):Promise<IMotorcycle> {
    const mCyclePass = await MotorcycleShema.safeParseAsync(obj);
    if (!mCyclePass.success) throw mCyclePass.error;
    return mCyclePass.data as IMotorcycle;
  }

  public async create(obj: unknown): Promise<IMotorcycle> {
    const validData = await MotorcycleService.zodValidation(obj);
    return this._model.create(validData);
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._model.read();
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const motorcycle = await this._model.readOne(_id);
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycle;
  }

  public async update(_id: string, obj: unknown): Promise<IMotorcycle> {
    const validData = await MotorcycleService.zodValidation(obj);
    const newMotorcycle = await this._model.update(_id, validData);
    if (!newMotorcycle) throw new Error(ErrorTypes.EntityNotFound);
    return newMotorcycle;
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    const motorcycleDeleted = await this._model.delete(_id);
    if (!motorcycleDeleted) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycleDeleted;
  }
}

export default MotorcycleService;