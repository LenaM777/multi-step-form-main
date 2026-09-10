import { useState, useEffect } from 'react';
import { api } from './services/api';
import type { FormOptions, MultiStepFormData } from './types/form';

export function App() {
  const [options, setOptions] = useState<FormOptions | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<MultiStepFormData>({
    personalInfo: { name: '', email: '', phone: '' },
    plan: { id: 'arcade', title: 'Arcade', billingCycle: 'monthly', price: 9 },
    addOns: []
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const data = await api.getOptions();
        setOptions(data);
      } catch (err) {
        console.error('Помилка завантаження даних:', err);
        setError('Не вдалося завантажити дані з сервера');
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  // Допоміжна функція оновлення даних форми та переходу на наступний крок
  const handleUpdateFormData = <K extends keyof MultiStepFormData>(
    key: K,
    value: MultiStepFormData[K],
    nextStep?: number
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (nextStep) {
      setCurrentStep(nextStep);
    }
  };

  if (loading) return <div>Завантаження даних з сервера...</div>;
  if (error) return <div>Помилка: {error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Multi-Step Form</h1>
      <p>Поточний крок: {currentStep} з 4</p>

      {/* Тимчасова кнопка перевірки перемикання кроків */}
      <button 
        type="button" 
        onClick={() => setCurrentStep((prev) => (prev < 4 ? prev + 1 : 1))}
      >
        Тест: Наступний крок
      </button>

      <pre style={{ background: '#f4f4f4', padding: '10px', marginTop: '15px' }}>
        {JSON.stringify({ 
          formData, 
          availablePlansCount: options?.plans.monthly.length,
          handleUpdateFormData: typeof handleUpdateFormData 
        }, null, 2)}
      </pre>
    </div>
  );
}

export default App;