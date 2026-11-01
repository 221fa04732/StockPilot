import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { updateSupplierSchema } from '../validate/supplierSchema';
import { ownerIdFrom } from '../security/requireInternalAuth';
const prisma = new PrismaClient();

export default async function updateSupplier(req: Request, res: Response) {
  const parsed = updateSupplierSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ msg: 'Invalid input' }); return; }
  const { id, ...data } = parsed.data;
  try {
    const result = await prisma.supplier.updateMany({
      where: { id, ownerId: ownerIdFrom(res), delete: false }, data,
    });
    if (!result.count) { res.status(404).json({ msg: 'Supplier not found' }); return; }
    res.status(200).json({ msg: 'Supplier updated' });
  } catch (error) { console.error(error); res.status(500).json({ msg: 'Server error' }); }
}
