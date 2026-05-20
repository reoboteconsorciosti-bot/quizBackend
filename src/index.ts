import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { processQuizWebhook } from './controllers/webhookController';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Middlewares
app.use(cors()); // Habilita CORS para o frontend Vite
app.use(express.json()); // Parser para JSON

// Logs de requisição simples
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Rotas
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

// Health check
app.get('/health', (_req, res) => {
  res.status(200).send('Backend Reobote Quiz is running');
});

// Iniciar servidor
app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`
  🚀 Servidor Backend Reobote Quiz rodando!
  📡 Endpoint: http://0.0.0.0:${PORT}/api/webhook
  🛠️  Porta: ${PORT}
  `);
});
