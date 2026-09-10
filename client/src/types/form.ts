// Типи для даних з сервера (GET /api/options)
export interface PlanOption {
  id: string;
  title: string;
  price: number;
}

export interface AddOnOption {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface FormOptions {
  plans: {
    monthly: PlanOption[];
    yearly: PlanOption[];
  };
  addOns: {
    monthly: AddOnOption[];
    yearly: AddOnOption[];
  };
}

// Типи для стану форми користувача
export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
}

export interface SelectedPlan {
  id: string;
  title: string;
  billingCycle: 'monthly' | 'yearly';
  price: number;
}

export interface SelectedAddOn {
  id: string;
  title: string;
  price: number;
}

export interface MultiStepFormData {
  personalInfo: PersonalInfo;
  plan: SelectedPlan;
  addOns: SelectedAddOn[];
}