import { z } from 'zod';

export const subscriptionSchema = z.object({
  personalInfo: z.object({
    name: z.string().min(1, "This field is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Phone is required")
  }),
  plan: z.object({
    id: z.string(),
    billingCycle: z.enum(['monthly', 'yearly']),
    price: z.number()
  }),
  addOns: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      price: z.number()
    })
  )
});