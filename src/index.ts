import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { processQuizWebhook } from './controllers/webhookController';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://reobote-mapadaconquistafront.to0i0r.easypanel.host',
  'https://reobote-mapadaconquistback.to0i0r.easypanel.host',
  process.env.ALLOWED_ORIGIN,
].filter(Boolean) as string[];

console.log('[SERVER] Origens permitidas:', allowedOrigins);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.get('/', (_req, res) => {
  res.status(200).json({
    ok: true,
    service: 'reobote-quiz-backend',
    message: 'Backend online',
    healthcheck: '/health',
    webhook: '/api/webhook',
  });
});

app.post('/api/webhook', processQuizWebhook);

app.get('/api/webhook', (_req, res) => {
  res.status(200).json({
    ok: true,
    message: 'Use POST /api/webhook para enviar os dados do quiz',
  });
});

app.get('/health', (_req, res) => {
  res.status(200).send('Backend Reobote Quiz is running');
});

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`
  🚀 Servidor Backend Reobote Quiz rodando!
  📡 Endpoint: http://0.0.0.0:${PORT}/api/webhook
  🛠️  Porta: ${PORT}
  `);
});
