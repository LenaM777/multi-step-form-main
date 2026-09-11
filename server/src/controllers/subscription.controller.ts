import { Request, Response } from 'express';
import { SubscriptionService } from '../services/subscription.service.js';
import { createSubscriptionSchema } from '../schemas/subscription.js';

export class SubscriptionController {
  static getOptions(_req: Request, res: Response) {
    const options = SubscriptionService.getOptions();
    return res.status(200).json({ status: 'success', data: options });
  }

  static subscribe(req: Request, res: Response) {
    const parseResult = createSubscriptionSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        status: 'fail',
        errors: parseResult.error.flatten().fieldErrors
      });
    }

    const result = SubscriptionService.createSubscription(parseResult.data);
    return res.status(201).json({ status: 'success', data: result });
  }
}