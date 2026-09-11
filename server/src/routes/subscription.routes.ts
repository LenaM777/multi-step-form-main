import { Router } from 'express';
import { SubscriptionController } from '../controllers/subscription.controller.js';

const router = Router();

router.get('/options', SubscriptionController.getOptions);
router.post('/subscribe', SubscriptionController.subscribe);

export default router;