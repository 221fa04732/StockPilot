import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '../generated/prisma';
import { loadSigningKey, signaturePayload, verifySignature } from './requestSignature';

const prisma = new PrismaClient();
const key = loadSigningKey();
const allowedSkewMs = 30_000;

// The browser is NEVER allowed to set ownerId. Only the signed Next.js proxy may.
export async function requireInternalAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  const userId = req.header('x-stockpilot-user');
  const timestamp = req.header('x-stockpilot-timestamp');
  const nonce = req.header('x-stockpilot-nonce');
  const signature = req.header('x-stockpilot-signature');
  const now = Date.now();

  if (!userId || userId.length > 255 || !/^user_[A-Za-z0-9]+$/.test(userId) ||
      !timestamp || !/^\d{13}$/.test(timestamp) ||
      Math.abs(now - Number(timestamp)) > allowedSkewMs ||
      !nonce || !/^[0-9a-f-]{36}$/.test(nonce) ||
      !signature || !req.originalUrl.startsWith('/api/v1/')) {
    res.status(401).json({ msg: 'Unauthorized' });
    return;
  }

  const payload = signaturePayload({
    method: req.method,
    pathAndQuery: req.originalUrl,
    userId,
    timestamp,
    nonce,
    body: (req as Request & { rawBody?: string }).rawBody ?? '',
  });

  if (!verifySignature(key, payload, signature)) {
    res.status(401).json({ msg: 'Unauthorized' });
    return;
  }

  // A shared DB unique constraint defeats replay across serverless instances.
  try {
    await prisma.requestNonce.create({ data: { id: nonce } });
  } catch (error) {
    res.status(401).json({ msg: 'Unauthorized' });
    return;
  }
  // Best-effort cleanup. Expired nonce rows are never accepted because timestamps expire.
  if (Math.floor(now / 60000) % 10 === 0 && nonce.charCodeAt(0) % 16 === 0) {
    prisma.requestNonce.deleteMany({
      where: { createdAt: { lt: new Date(now - 24 * 60 * 60 * 1000) } },
    }).catch(() => undefined);
  }

  res.locals.ownerId = userId;
  next();
}

export function ownerIdFrom(res: Response): string {
  const ownerId = res.locals.ownerId;
  if (typeof ownerId !== 'string') throw new Error('Missing authenticated owner');
  return ownerId;
}
