import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { productSchema } from '../validate/productSchema';
import { ownerIdFrom } from '../security/requireInternalAuth';
const prisma = new PrismaClient();

export default async function addProduct(req: Request, res: Response) {
  const validated = productSchema.safeParse(req.body);
  if (!validated.success) { res.status(400).json({ msg: 'Invalid input' }); return; }
  const ownerId = ownerIdFrom(res);
  const data = validated.data;
  try {
    const existing = await prisma.product.findFirst({
      where: { ownerId, name: data.name, category: data.category, delete: false },
    });
    if (existing) { res.status(409).json({ msg: 'Product already exists' }); return; }
    await prisma.product.create({ data: { ...data, ownerId } });
    res.status(201).json({ msg: 'Product added' });
  } catch (error) { console.error(error); res.status(500).json({ msg: 'Server error' }); }
}
