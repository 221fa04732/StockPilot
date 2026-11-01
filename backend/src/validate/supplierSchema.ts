import z from 'zod';
import { idSchema } from './productSchema';

export const supplierSchema = z.object({
  name: z.string().trim().min(1).max(150),
  email: z.string().email().max(254),
  phone: z.string().trim().min(1).max(50),
  product: z.string().trim().min(1).max(150),
});
export const updateSupplierSchema = supplierSchema.extend({ id: idSchema.shape.id });
