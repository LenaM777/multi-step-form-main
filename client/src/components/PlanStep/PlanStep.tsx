import React, { useState } from 'react';
import type { FormOptions, SelectedPlan } from '../../types/form';

interface Props {
  options: FormOptions['plans'];
  defaultValues: SelectedPlan;
  onNext: (data: SelectedPlan) => void;
  onBack: () => void;
}

export const PlanStep: React.FC<Props> = ({ options, defaultValues, onNext, onBack }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    defaultValues.billingCycle
  );
  const [selectedPlanId, setSelectedPlanId] = useState<string>(defaultValues.id);

  const currentPlans = options[billingCycle];

  const handleToggleCycle = () => {
    setBillingCycle((prev) => (prev === 'monthly' ? 'yearly' : 'monthly'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const activePlan = currentPlans.find((p) => p.id === selectedPlanId) || currentPlans[0];

    onNext({
      id: activePlan.id,
      title: activePlan.title,
      billingCycle,
      price: activePlan.price,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="step-form">
      <h2>Select your plan</h2>
      <p>You have the option of monthly or yearly billing.</p>

      <div className="plans-grid">
        {currentPlans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${selectedPlanId === plan.id ? 'selected' : ''}`}
            onClick={() => setSelectedPlanId(plan.id)}
          >
            <h3>{plan.title}</h3>
            <p>${plan.price}/{billingCycle === 'monthly' ? 'mo' : 'yr'}</p>
            {billingCycle === 'yearly' && <span className="promo">2 months free</span>}
          </div>
        ))}
      </div>

      <div className="toggle-container">
        <span className={billingCycle === 'monthly' ? 'active' : ''}>Monthly</span>
        <button type="button" onClick={handleToggleCycle} className="switch">
          {billingCycle === 'yearly' ? 'Yearly' : 'Monthly'}
        </button>
        <span className={billingCycle === 'yearly' ? 'active' : ''}>Yearly</span>
      </div>

      <div className="actions">
        <button type="button" onClick={onBack}>Go Back</button>
        <button type="submit">Next Step</button>
      </div>
    </form>
  );
};