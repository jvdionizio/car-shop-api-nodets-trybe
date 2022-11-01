export const carMock = {
	"_id": "1",
  "model": "Ferrari Maranello",
  "year": 1963,
  "color": "red",
  "buyValue": 3500000,
  "seatsQty": 2,
  "doorsQty": 2
}

export const carsMockArray = [{
  "_id": "1",
  "model": "Ferrari Maranello",
  "year": 1963,
  "color": "red",
  "buyValue": 3500000,
  "seatsQty": 2,
  "doorsQty": 2
}]

export const carMockWrong = {
  "_id": "1",
  "year": 1963,
  "color": "red",
  "buyValue": 3500000,
  "seatsQty": 2,
  "doorsQty": 2
}

export const carMockWithId = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Kombi',
  year: 1989,
  color: 'white',
  status: true,
  buyValue: 5000,
  doorsQty: 2,
  seatsQty: 3,
};

export const allCarsMock = [
  {
    _id: '62cf1fc6498565d94eba52cd',
    model: 'Kombi',
    year: 1989,
    color: 'white',
    status: true,
    buyValue: 5000,
    doorsQty: 2,
    seatsQty: 3,
  }, {
    _id: '62cf1fc6498565d94eba55cd',
    model: 'Corsa',
    year: 1999,
    color: 'red',
    status: false,
    buyValue: 9999,
    doorsQty: 4,
    seatsQty: 5,
  }
];

export const carMockUpdate = {
  model: 'Kombi',
  year: 2000,
  color: 'blue',
  status: true,
  buyValue: 8000,
  doorsQty: 2,
  seatsQty: 5,
};

export const carMockUpdateWithId = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Kombi',
  year: 2000,
  color: 'blue',
  status: true,
  buyValue: 8000,
  doorsQty: 2,
  seatsQty: 5,
};

export const mockSendNewCar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

export const mockNewCar = {
  _id: "4edd40c86762e0fb12000003",
  ...mockSendNewCar,
};

export const mockSendUpdateCar = {
  model: "Mazzerati Turbo",
  year: 2004,
  color: "blue",
  buyValue: 600000,
  seatsQty: 2,
  doorsQty: 2
};

export const mockUpdateCar = {
  _id: "4edd40c86762e0fb12000003",
  ...mockSendUpdateCar,
};