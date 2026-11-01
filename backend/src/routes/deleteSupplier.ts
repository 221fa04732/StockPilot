import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { idSchema } from '../validate/productSchema';
import { ownerIdFrom } from '../security/requireInternalAuth';
const prisma = new PrismaClient();

export default async function deleteSupplier(req: Request, res: Response) {
  const parsed = idSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ msg: 'Invalid input' }); return; }
  try {
    const result = await prisma.supplier.updateMany({
      where: { id: parsed.data.id, ownerId: ownerIdFrom(res), delete: false },
      data: { delete: true },
    });
    if (!result.count) { res.status(404).json({ msg: 'Supplier not found' }); return; }
    res.status(200).json({ msg: 'Supplier deleted' });
  } catch (error) { console.error(error); res.status(500).json({ msg: 'Server error' }); }
}
