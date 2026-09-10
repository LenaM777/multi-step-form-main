import React, { useState } from 'react';
import type { PersonalInfo } from '../../types/form';

interface Props {
  defaultValues: PersonalInfo;
  onNext: (data: PersonalInfo) => void;
}

export const PersonalInfoStep: React.FC<Props> = ({ defaultValues, onNext }) => {
  const [info, setInfo] = useState<PersonalInfo>(defaultValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!info.name.trim()) newErrors.name = "This field is required";
    if (!info.email.trim()) newErrors.email = "This field is required";
    if (!info.phone.trim()) newErrors.phone = "This field is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext(info);
  };

  return (
    <form onSubmit={handleSubmit} className="step-form">
      <h2>Personal info</h2>
      <p>Please provide your name, email address, and phone number.</p>

      <div className="form-field">
        <label>
          Name
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <input
          type="text"
          name="name"
          placeholder="e.g. Stephen King"
          value={info.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label>
          Email Address
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <input
          type="email"
          name="email"
          placeholder="e.g. stephenking@lorem.com"
          value={info.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label>
          Phone Number
          {errors.phone && <span className="error">{errors.phone}</span>}
        </label>
        <input
          type="tel"
          name="phone"
          placeholder="e.g. +1 234 567 890"
          value={info.phone}
          onChange={handleChange}
        />
      </div>

      <div className="actions">
        <button type="submit">Next Step</button>
      </div>
    </form>
  );
};