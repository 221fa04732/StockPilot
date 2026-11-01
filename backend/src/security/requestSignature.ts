import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

/** Canonical bytes shared by the Next.js proxy and the API. */
export function signaturePayload(input: {
  method: string;
  pathAndQuery: string;
  userId: string;
  timestamp: string;
  nonce: string;
  body: string;
}): string {
  const digest = createHash('sha256').update(input.body, 'utf8').digest('hex');
  return [input.method.toUpperCase(), input.pathAndQuery, input.userId, input.timestamp, input.nonce, digest].join('\n');
}

export function signRequest(key: Buffer, payload: string): string {
  return createHmac('sha256', key).update(payload, 'utf8').digest('hex');
}

export function verifySignature(key: Buffer, payload: string, presented: string): boolean {
  if (!/^[a-f0-9]{64}$/.test(presented)) return false;
  const expected = Buffer.from(signRequest(key, payload), 'hex');
  const actual = Buffer.from(presented, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function loadSigningKey(): Buffer {
  const secret = process.env.INTERNAL_API_SECRET || '';
  const key = Buffer.from(secret, 'base64');
  if (key.length < 32 || key.toString('base64') !== secret) {
    throw new Error('INTERNAL_API_SECRET must be a base64-encoded random key of >=32 bytes');
  }
  return key;
}
