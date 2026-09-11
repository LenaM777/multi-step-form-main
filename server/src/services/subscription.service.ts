import { FORM_OPTIONS } from '../data/options.js';
import { CreateSubscriptionInput } from '../schemas/subscription.js';

export class SubscriptionService {
  static getOptions() {
    return FORM_OPTIONS;
  }

  static createSubscription(data: CreateSubscriptionInput) {
    const addOnsTotal = data.addOns.reduce((sum, item) => sum + item.price, 0);

    return {
      id: `sub_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...data,
      totalPrice: data.plan.price + addOnsTotal
    };
  }
}