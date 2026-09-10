import React, { useState } from 'react';
import type { MultiStepFormData } from '../../types/form';

interface Props {
  formData: MultiStepFormData;
  onConfirm: () => Promise<void>;
  onBack: () => void;
  onChangePlan: () => void;
}

export const SummaryStep: React.FC<Props> = ({
  formData,
  onConfirm,
  onBack,
  onChangePlan
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isYearly = formData.plan.billingCycle === 'yearly';
  const cycleText = isYearly ? 'yr' : 'mo';

  const addOnsTotal = formData.addOns.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = formData.plan.price + addOnsTotal;

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await onConfirm();
    } catch (err) {
      console.error(err);
      setSubmitError('Failed to send data to server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="step-summary">
      <h2>Finishing up</h2>
      <p>Double-check everything looks OK before confirming.</p>

      <div>
        {/* Обраний план */}
        <div>
          <div>
            <strong>{formData.plan.title} ({isYearly ? 'Yearly' : 'Monthly'})</strong>
            <br />
            <button
              type="button"
              onClick={onChangePlan}
            >
              Change
            </button>
          </div>
          <strong>${formData.plan.price}/{cycleText}</strong>
        </div>

        {/* Дод послуги */}
        {formData.addOns.map((item) => (
          <div key={item.id}>
            <span>{item.title}</span>
            <span>+${item.price}/{cycleText}</span>
          </div>
        ))}
      </div>

      {/* Загальна сума */}
      <div>
        <span>Total (per {isYearly ? 'year' : 'month'})</span>
        <strong>+${totalPrice}/{cycleText}</strong>
      </div>

      {submitError && <div>{submitError}</div>}

      <div>
        <button type="button" onClick={onBack} disabled={isSubmitting}>
          Go Back
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Confirming...' : 'Confirm'}
        </button>
      </div>
    </div>
  );
};