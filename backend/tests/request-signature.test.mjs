import test from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes, randomUUID } from 'node:crypto';
import {
  signaturePayload, signRequest, verifySignature, loadSigningKey,
} from '../src/security/requestSignature.ts';

const key = randomBytes(32);
const base = {
  method: 'POST', pathAndQuery: '/api/v1/product/buy?x=1',
  userId: 'user_abc123', timestamp: String(Date.now()),
  nonce: randomUUID(), body: JSON.stringify({ id: 'p123', quantity: 1 }),
};

test('valid signed payload is accepted', () => {
  const payload = signaturePayload(base);
  assert.equal(verifySignature(key, payload, signRequest(key, payload)), true);
});

test('tampered body, method, path, user, nonce or timestamp is rejected', () => {
  const signature = signRequest(key, signaturePayload(base));
  const modifications = [
    { body: '{"id":"p123","quantity":1000}' },
    { method: 'GET' },
    { pathAndQuery: '/api/v1/product/buy?x=2' },
    { userId: 'user_another' },
    { nonce: randomUUID() },
    { timestamp: String(Date.now() - 60_000) },
  ];
  for (const change of modifications) {
    assert.equal(verifySignature(key, signaturePayload({ ...base, ...change }), signature), false);
  }
});

test('malformed or incorrect signatures are rejected', () => {
  const payload = signaturePayload(base);
  assert.equal(verifySignature(key, payload, 'not-a-signature'), false);
  assert.equal(verifySignature(randomBytes(32), payload, signRequest(key, payload)), false);
});

test('only strong base64 signing keys are accepted', () => {
  const previous = process.env.INTERNAL_API_SECRET;
  try {
    process.env.INTERNAL_API_SECRET = 'a';
    assert.throws(() => loadSigningKey());
    process.env.INTERNAL_API_SECRET = key.toString('base64');
    assert.deepEqual(loadSigningKey(), key);
  } finally {
    if (previous === undefined) delete process.env.INTERNAL_API_SECRET;
    else process.env.INTERNAL_API_SECRET = previous;
  }
});
