import axios from 'axios';
// Додаємо `type` після import
import type { FormOptions, MultiStepFormData } from '../types/form';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Отримати варіанти планів та послуг з бекенду
  getOptions: async (): Promise<FormOptions> => {
    const response = await axios.get<{ status: string; data: FormOptions }>(`${API_BASE_URL}/options`);
    return response.data.data;
  },

  // Відправити готову форму на бекенд
  submitSubscription: async (formData: MultiStepFormData) => {
    const response = await axios.post(`${API_BASE_URL}/subscribe`, formData);
    return response.data;
  }
};