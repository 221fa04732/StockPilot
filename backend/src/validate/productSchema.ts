import z from 'zod';

const productFields = {
  name: z.string().trim().min(1).max(150),
  category: z.string().trim().min(1).max(100),
  price: z.number().int().nonnegative().max(2_147_483_647),
};

export const idSchema = z.object({ id: z.string().min(1).max(100) });
export const productSchema = z.object({
  ...productFields,
  quantity: z.number().int().nonnegative().max(2_147_483_647),
});
export const UpdateproductSchema = z.object({ ...productFields, id: idSchema.shape.id });
export const tradeSchema = z.object({
  id: idSchema.shape.id,
  quantity: z.number().int().positive().max(2_147_483_647),
});
