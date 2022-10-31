import { Router } from 'express';
import MotorcycleController from '../controllers/Motors';
import MotorcycleService from '../services/Motors';

const controller = new MotorcycleController(new MotorcycleService());

const motorcycleRoute = Router();
motorcycleRoute.post('/', (req, res) => controller.create(req, res));
motorcycleRoute.get('/', (req, res) => controller.read(req, res));
motorcycleRoute.get('/:id', (req, res) => controller.readOne(req, res));
motorcycleRoute.put('/:id', (req, res) => controller.update(req, res));
motorcycleRoute.delete('/:id', (req, res) => controller.delete(req, res));

export default motorcycleRoute;