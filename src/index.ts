import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { processQuizWebhook } from './controllers/webhookController';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://reobote-mapadaconquistafront.to0i0r.easypanel.host',
];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Permite requisições sem Origin explícito (health checks, Postman, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origem não permitida por CORS: ${origin}`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

// Middlewares
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
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
