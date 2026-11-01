import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { tradeSchema } from '../validate/productSchema';
import { ownerIdFrom } from '../security/requireInternalAuth';
const prisma = new PrismaClient();

export default async function sellProduct(req: Request, res: Response) {
  const parsed = tradeSchema.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ msg: 'Invalid input' }); return; }
  const { id, quantity } = parsed.data;
  const ownerId = ownerIdFrom(res);
  try {
    const completed = await prisma.$transaction(async (tx) => {
      const product = await tx.product.findFirst({ where: { id, ownerId, delete: false } });
      if (!product) return false;
      // The quantity guard is evaluated by the database at update time.
      const update = await tx.product.updateMany({
        where: { id, ownerId, delete: false, quantity: { gte: quantity } },
        data: { quantity: { decrement: quantity } },
      });
      if (!update.count) return false;
      await tx.transactionHistory.create({
        data: { ownerId, productId: id, productName: product.name,
          quantity, price: product.price, transactionType: 'sell' },
      });
      return true;
    });
    if (!completed) { res.status(409).json({ msg: 'Product unavailable or insufficient stock' }); return; }
    res.status(201).json({ msg: 'Sale successful' });
  } catch (error) { console.error(error); res.status(500).json({ msg: 'Server error' }); }
}
