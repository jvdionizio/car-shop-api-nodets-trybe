import * as sinon from 'sinon';
import chai from 'chai';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarsModel from '../../../models/Cars';
import CarsService from '../../../services/Cars';
import { mockNewCar, mockSendNewCar, mockUpdateCar, mockSendUpdateCar } from '../../mocks/carMock';
import { any } from 'joi';
const { expect } = chai;

describe('Car Service', () => {
  const carsModel = new CarsModel();
  const carsService = new CarsService(carsModel);

  before(async () => {
    sinon.stub(carsModel, 'create').resolves(mockNewCar);
    sinon.stub(carsModel, 'read').resolves([mockNewCar]);
    // onCall para chamar o método readOne retornando resultados diferentes em cada chamada
    sinon.stub(carsModel, 'readOne').onCall(0).resolves(mockNewCar).onCall(1).resolves(null);
    sinon.stub(carsModel, 'update').onCall(0).resolves(mockUpdateCar).onCall(1).resolves(null);
    sinon.stub(carsModel, 'delete').onCall(0).resolves(mockNewCar).onCall(1).resolves(null);
  });

  after(()=>{
    sinon.restore();
  });

  describe('Criar um novo carro', () => {
    it('Caso de sucesso', async () => {
      const carCreated = await carsService.create(mockSendNewCar);
      expect(carCreated).to.be.deep.equal(mockNewCar);
    });
    it('Caso os dados não sejam enviados corretamente gera um ERRO', async () => {
      let error;
      try {
        await carsService.create({});
      } catch(err) {
        error = err;
      }
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('Busca carros cadastrados no BD', () => {
    describe('Busca todos os carros cadastrados', () => {
      it('A busca retorna um array com os carros ou um array vazio', async () => {
        const get = await carsService.read();
        expect(get).to.be.deep.equal([mockNewCar])
      });
    });
    describe('Busca um carro específico pelo seu id', () => {
      it('Caso de sucesso na busca', async () => {
        // onCall(0)
        const getCar = await carsService.readOne(mockNewCar._id)
        expect(getCar).to.be.deep.equal(mockNewCar);
      });
      it('Caso o id informado não esteja cadastrado no BD retorna uma mensagem de erro', async () => {
        let error;

        try {
          //onCall(1)
          await carsService.readOne(mockNewCar._id);
        } catch(err: any) {
          error = err;
        }
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      });
    });
  });

  describe('Atualiza um registro no banco de dados', () => {
    describe('Em casos de sucesso', () => {
      it('Atualiza o carro do id informado com o corpo enviado no body', async () => {
        const update = await carsService.update(mockUpdateCar._id, mockSendUpdateCar);
        expect(update).to.be.deep.equal(mockUpdateCar);
      });
      it('Caso o id informado não esteja cadastrado no BD retorna uma mensagem de erro', async () => {
        let error;

        try {
          //onCall(1)
          await carsService.update(mockNewCar._id, mockSendUpdateCar);
        } catch(err: any) {
          error = err;
        }
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      });
      it('Caso os dados não sejam enviados corretamente gera um ERRO', async () => {
        let error;
        try {
          await carsService.update(mockUpdateCar._id, {});
        } catch(err) {
          error = err;
        }
        expect(error).to.be.instanceOf(ZodError);
      });
    });
  });

  describe('Apaga um registro no banco de dados', () => {
    describe('Em caso de sucesso', () => {
      it('Apaga o carro do id informado', async () => {
        const deleted = await carsService.delete(mockNewCar._id);
        expect(deleted).to.be.deep.equal(mockNewCar);
      });
    });
    describe('Caso que NÃO haja sucesso', () => {
      it('Caso o id informado não esteja cadastrado no BD retorna uma mensagem de erro', async () => {
        let error;

        try {
          //onCall(1)
          await carsService.delete(mockNewCar._id);
        } catch(err: any) {
          error = err;
        }
        expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
      });
    })
  });
});