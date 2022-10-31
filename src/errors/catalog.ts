export enum ErrorTypes {
  InvalidMongoId = 'InvalidMongoId',
  EntityNotFound = 'EntityNotFound',
}

type ErrorResponseObject = { 
  error: string;
  httpStatus: number
};

export type ErrorCatalog = Record<ErrorTypes, ErrorResponseObject>;

export const errorCatalog: ErrorCatalog = {
  InvalidMongoId: {
    error: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  EntityNotFound: {
    error: 'Object not found',
    httpStatus: 404,
  },
};