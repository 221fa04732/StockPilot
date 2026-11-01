import 'dotenv/config';
import express, { Request } from 'express';
import productRouter from './handler/product';
import supplierRouter from './handler/supplier';
import transactionRouter from './handler/transaction';
import dashboardRouter from './handler/dashboard';
import aiRouter from './handler/ai';
import { requireInternalAuth } from './security/requireInternalAuth';

const app = express();

// Store the raw JSON bytes used by the trusted proxy to compute its signature.
app.use(express.json({
  limit: '100kb',
  verify: (req, _res, buf) => {
    (req as Request & { rawBody?: string }).rawBody = buf.toString('utf8');
  },
}));

// No public API, no browser CORS: all API requests must come through the
// authenticated Next.js server-to-server proxy and pass HMAC verification.
app.use('/api/v1', requireInternalAuth);

app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/supplier', supplierRouter);
app.use('/api/v1/transcation', transactionRouter);
app.use('/api/v1/ai', aiRouter);

app.listen(Number(process.env.PORT || 3001), () => {
  console.log('StockPilot API listening');
});
