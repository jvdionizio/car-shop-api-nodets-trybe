import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Cars';
import mongoose from 'mongoose';
import { allCarsMock, carMock, carMockUpdate, carMockUpdateWithId, carMockWithId } from '../../mocks/carMock';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new CarModel();

  beforeEach(async () => {
    sinon.stub(mongoose.Model, 'create').resolves(carMockWithId);
    sinon.stub(mongoose.Model, 'find').resolves(allCarsMock);
    sinon.stub(mongoose.Model, 'findOne').resolves(carMockWithId);
    sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(carMockUpdateWithId);
    sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(carMockWithId);
  });

  afterEach(()=>{
    sinon.restore();
  });

  describe('Create a new car', () => {
    it('With success', async () => {
      sinon.stub(mongoose, 'isValidObjectId').returns(true);

      const result = await carModel.create(carMock);

      expect(result).to.be.deep.eq(carMockWithId);
    });
  });

  describe('Read all cars', () => {
    it('With success', async () => {
      const result = await carModel.read();

      expect(result).to.be.deep.eq(allCarsMock);
    });
  });

  describe('Read one car', () => {
    it('With success', async () => {
      sinon.stub(mongoose, 'isValidObjectId').returns(true);

      const result = await carModel.readOne('valid-id');

      expect(result).to.be.deep.eq(carMockWithId);
    });

    it('With failure - Invalid Id', async () => {
      sinon.stub(mongoose, 'isValidObjectId').returns(false);

      let err;
      try {
        await carModel.readOne('invalid-id');
      } catch (error:any) {
        err = error;
      }

      expect(err?.message).to.be.deep.eq(ErrorTypes.InvalidMongoId);
    });
  });

  describe('Update a car', () => {
    it('With success', async () => {
      sinon.stub(mongoose, 'isValidObjectId').returns(true);

      const result = await carModel.update('valid-id', carMockUpdate);

      expect(result).to.be.deep.eq(carMockUpdateWithId);
    });

    it('With failure - Invalid Id', async () => {
      sinon.stub(mongoose, 'isValidObjectId').returns(false);

      let err;
      try {
        await carModel.update('invalid-id', carMock);
      } catch (error:any) {
        err = error;
      }

      expect(err?.message).to.be.deep.eq(ErrorTypes.InvalidMongoId);
    });
  })

  describe('Delete a car', () => {
    it('With success', async () => {
      sinon.stub(mongoose, 'isValidObjectId').returns(true);

      const result = await carModel.delete('valid-id');

      expect(result).to.be.deep.eq(carMockWithId);
    });

    it('With failure - Invalid Id', async () => {
      sinon.stub(mongoose, 'isValidObjectId').returns(false);

      let err;
      try {
        await carModel.delete('invalid-id');
      } catch (error:any) {
        err = error;
      }

      expect(err?.message).to.be.deep.eq(ErrorTypes.InvalidMongoId);
    });
  });
});