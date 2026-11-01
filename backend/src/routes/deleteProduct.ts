import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { idSchema } from '../validate/productSchema';
import { ownerIdFrom } from '../security/requireInternalAuth';
const prisma = new PrismaClient();

export default async function deleteProduct(req: Request, res: Response) {
  const parsed = idSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ msg: 'Invalid input' }); return; }
  try {
    const result = await prisma.product.updateMany({
      where: { id: parsed.data.id, ownerId: ownerIdFrom(res), delete: false },
      data: { delete: true },
    });
    if (!result.count) { res.status(404).json({ msg: 'Product not found' }); return; }
    res.status(200).json({ msg: 'Product deleted' });
  } catch (error) { console.error(error); res.status(500).json({ msg: 'Server error' }); }
}
