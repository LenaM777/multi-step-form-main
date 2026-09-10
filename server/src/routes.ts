import { Router, Request, Response } from 'express';
import { FORM_OPTIONS } from './data/options.js';
import { subscriptionSchema } from './schemas/subscription.js';

const router = Router();

// Отримати конфігурацію тарифів з сервера
router.get('/api/options', (req: Request, res: Response) => {
  res.json({ status: 'success', data: FORM_OPTIONS });
});

// Прийняти заповнену форму
router.post('/api/subscribe', (req: Request, res: Response) => {
  const result = subscriptionSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ status: 'error', errors: result.error.format() });
  }

  console.log('✅ Отримано та збережено:', result.data);
  return res.status(201).json({ status: 'success', data: result.data });
});

export default router;