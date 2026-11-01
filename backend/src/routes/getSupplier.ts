import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import { ownerIdFrom } from '../security/requireInternalAuth';
const prisma = new PrismaClient();

export default async function getSupplier(req: Request, res: Response) {
  const page = Number(req.query.page ?? 0);
  if (!Number.isSafeInteger(page) || page < 0 || page > 100000) {
    res.status(400).json({ msg: 'Invalid page' }); return;
  }
  const searchWord = typeof req.query.search === 'string' ? req.query.search.slice(0, 200) : '';
  const where = {
    ownerId: ownerIdFrom(res), delete: false,
    OR: [
      { name: { contains: searchWord, mode: 'insensitive' as const } },
      { product: { contains: searchWord, mode: 'insensitive' as const } },
    ],
  };
  try {
    const [supplier, total] = await Promise.all([
      prisma.supplier.findMany({ where, skip: page * 10, take: 10, orderBy: { createdAt: 'desc' } }),
      prisma.supplier.count({ where }),
    ]);
    res.status(200).json({ supplier, hasPreviousPage: page > 0, hasNextPage: (page + 1) * 10 < total });
  } catch (error) { console.error(error); res.status(500).json({ msg: 'Server error' }); }
}
