import { z } from 'zod';

export const VehicleSchema = z.object({
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  }).min(3, { message: 'Model must be 3 or more characters long' }),

  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  }).min(1900, {
    message: 'Year must be 1900 or more',
  }).max(2022, {
    message: 'Year must be 2022 or less',
  }).int({
    message: 'Year must be an integer',
  }),

  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be 3 or more characters long' }),

  status: z.boolean({
    invalid_type_error: 'Status must true or false',
  }).optional(),

  buyValue: z.number({
    required_error: 'Buy Value is required',
    invalid_type_error: 'Buy Value must be a number',
  }).int({ 
    message: 'Buy Value must be an integer',
  }),
});

export type IVehicle = z.infer<typeof VehicleSchema>;