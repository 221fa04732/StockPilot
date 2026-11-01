import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { supplierSchema } from '../validate/supplierSchema';
import { ownerIdFrom } from '../security/requireInternalAuth';
const prisma = new PrismaClient();

export default async function addSupplier(req: Request, res: Response) {
  const validated = supplierSchema.safeParse(req.body);
  if (!validated.success) { res.status(400).json({ msg: 'Invalid input' }); return; }
  const ownerId = ownerIdFrom(res);
  const data = validated.data;
  try {
    const existing = await prisma.supplier.findFirst({ where: { ...data, ownerId, delete: false } });
    if (existing) { res.status(409).json({ msg: 'Supplier already exists' }); return; }
    await prisma.supplier.create({ data: { ...data, ownerId } });
    res.status(201).json({ msg: 'Supplier added' });
  } catch (error) { console.error(error); res.status(500).json({ msg: 'Server error' }); }
}
