import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { ownerIdFrom } from '../security/requireInternalAuth';
const prisma = new PrismaClient();

export default async function dashboard(_req: Request, res: Response) {
  const ownerId = ownerIdFrom(res);
  try {
    const [products, supplierCnt, transaction, history] = await Promise.all([
      prisma.product.findMany({ where: { ownerId, delete: false }, orderBy: { createdAt: 'desc' } }),
      prisma.supplier.count({ where: { ownerId, delete: false } }),
      prisma.transactionHistory.findMany({ where: { ownerId }, take: 5, orderBy: { createdAt: 'desc' } }),
      prisma.transactionHistory.findMany({ where: { ownerId } }),
    ]);
    const lowStockItems = products.filter(p => p.quantity <= 100);
    const totalInventoryValue = products.reduce((total, p) => total + p.price * p.quantity, 0);
    const totalBuy = history.filter(h => h.transactionType === 'buy').reduce((total, h) => total + h.price, 0);
    const totalSell = history.filter(h => h.transactionType === 'sell').reduce((total, h) => total + h.price, 0);
    res.status(200).json({ productCnt: products.length, supplierCnt, totalInventoryValue,
      lowStockItems, transaction, totalBuy, totalSell });
  } catch (error) { console.error(error); res.status(500).json({ msg: 'Server error' }); }
}
