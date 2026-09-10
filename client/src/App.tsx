import { useState, useEffect } from 'react';
import { api } from './services/api';
import type { FormOptions, MultiStepFormData } from './types/form';
import { PersonalInfoStep } from './components/PersonalInfoStep/PersonalInfoStep';
import { PlanStep } from './components/PlanStep/PlanStep';
import { AddOnsStep } from './components/AddOnsStep/AddOnsStep';
import { SummaryStep } from './components/SummaryStep/SummaryStep';

export function App() {
  const [options, setOptions] = useState<FormOptions | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

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
        console.error('Error loading data:', err);
        setError('Failed to load data from server');
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

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

  // Фінальна відправка даних на Express-сервер
  const handleFinalSubmit = async () => {
    await api.submitSubscription(formData);
    setIsSubmitted(true);
  };

  if (loading) return <div>Loading data from server...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      {!isSubmitted && <p>Step {currentStep} of 4</p>}

      {isSubmitted ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <h2>Thank you!</h2>
          <p>Thanks for confirming your subscription! We hope you have fun using our platform.</p>
        </div>
      ) : (
        <>
          {currentStep === 1 && (
            <PersonalInfoStep
              defaultValues={formData.personalInfo}
              onNext={(data) => handleUpdateFormData('personalInfo', data, 2)}
            />
          )}

          {currentStep === 2 && options && (
            <PlanStep
              options={options.plans}
              defaultValues={formData.plan}
              onNext={(data) => handleUpdateFormData('plan', data, 3)}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && options && (
            <AddOnsStep
              options={options.addOns[formData.plan.billingCycle]}
              defaultValues={formData.addOns}
              billingCycle={formData.plan.billingCycle}
              onNext={(data) => handleUpdateFormData('addOns', data, 4)}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <SummaryStep
              formData={formData}
              onConfirm={handleFinalSubmit}
              onBack={() => setCurrentStep(3)}
              onChangePlan={() => setCurrentStep(2)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;