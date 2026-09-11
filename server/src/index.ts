import express from 'express';
import cors from 'cors';
import router from './routes/subscription.routes.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на http://localhost:${PORT}`);
});