import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import CarModel from '../../../models/Cars';
import CarService from '../../../services/Cars';
import CarController from '../../../controllers/Cars';
import { carMock, carsMockArray } from '../../mocks/carMock';
const { expect } = chai;

describe('Car controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request; 
  const res = {} as Response;

  before(async () => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() =>{
    sinon.restore();
  })

  describe('Create a new car', () => {
    beforeEach(() => {
      sinon.stub(carService, 'create').resolves(carMock);
    })

    it('Successfully - should return code 201 and an object created', async () => {
      req.body = carMock;
      await carController.create(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(201)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carMock)).to.be.true;
    });
  });

  describe('Get all cars', () => {
    beforeEach(() => {
      sinon.stub(carService, 'read').resolves(carsMockArray);
    })

    it('should return code 200 and an array', async () => {
      await carController.read(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carsMockArray)).to.be.true;
    });
  });

  describe('Get one car', () => {
    beforeEach(() => {
      sinon.stub(carService, 'readOne').resolves(carMock);
    })

    it('should return code 200 and an object of car', async () => {
      req.params = { id: 'any_id' };
      await carController.readOne(req, res);

      const statusStub = res.status as sinon.SinonStub;
      expect(statusStub.calledWith(200)).to.be.true;

      const jsonStub = res.json as sinon.SinonStub;
      expect(jsonStub.calledWith(carMock)).to.be.true;
    });
  });
});