import React, { useState } from 'react';
import type { AddOnOption, SelectedAddOn } from '../../types/form';

interface Props {
  options: AddOnOption[];
  defaultValues: SelectedAddOn[];
  billingCycle: 'monthly' | 'yearly';
  onNext: (data: SelectedAddOn[]) => void;
  onBack: () => void;
}

export const AddOnsStep: React.FC<Props> = ({
  options,
  defaultValues,
  billingCycle,
  onNext,
  onBack
}) => {
  const [selectedAddOns, setSelectedAddOns] = useState<SelectedAddOn[]>(defaultValues);

  const toggleAddOn = (addOn: AddOnOption) => {
    const exists = selectedAddOns.some((item) => item.id === addOn.id);
    if (exists) {
      setSelectedAddOns(selectedAddOns.filter((item) => item.id !== addOn.id));
    } else {
      setSelectedAddOns([
        ...selectedAddOns,
        { id: addOn.id, title: addOn.title, price: addOn.price }
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(selectedAddOns);
  };

  return (
    <form onSubmit={handleSubmit} className="step-form">
      <h2>Pick add-ons</h2>
      <p>Add-ons help enhance your gaming experience.</p>

      <div className="add-ons-list">
        {options.map((item) => {
          const isChecked = selectedAddOns.some((selected) => selected.id === item.id);
          return (
            <div
              key={item.id}
              className={`add-on-card ${isChecked ? 'selected' : ''}`}
              onClick={() => toggleAddOn(item)}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {}} // Оновлюється через клик по картці
              />
              <div style={{ flexGrow: 1 }}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
              <span>+${item.price}/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
            </div>
          );
        })}
      </div>

      <div className="actions">
        <button type="button" onClick={onBack}>Go Back</button>
        <button type="submit">Next Step</button>
      </div>
    </form>
  );
};