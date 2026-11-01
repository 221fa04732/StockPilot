import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { ownerIdFrom } from '../security/requireInternalAuth';
const prisma = new PrismaClient();

export default async function getTransaction(req: Request, res: Response) {
  const page = Number(req.query.page ?? 0);
  if (!Number.isSafeInteger(page) || page < 0 || page > 100000) {
    res.status(400).json({ msg: 'Invalid page' }); return;
  }
  const where = { ownerId: ownerIdFrom(res) };
  try {
    const [transaction, total] = await Promise.all([
      prisma.transactionHistory.findMany({ where, skip: page * 7, take: 7, orderBy: { createdAt: 'desc' } }),
      prisma.transactionHistory.count({ where }),
    ]);
    res.status(200).json({ transaction, hasPreviousPage: page > 0, hasNextPage: (page + 1) * 7 < total });
  } catch (error) { console.error(error); res.status(500).json({ msg: 'Server error' }); }
}
