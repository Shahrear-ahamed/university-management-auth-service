import { z } from 'zod';

const createFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title must be required' }),
  }),
});

const updateFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title must be required' }),
  }),
});

export const AcademicFacultyValidation = {
  createFacultyZodSchema,
  updateFacultyZodSchema,
};
