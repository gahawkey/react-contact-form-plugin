import { useState } from 'react';
import type { FormData, FormState } from '../types/Form';
import { validateForm } from '../utils/validation';
import { submitForm } from '../services/api';

export const useFormSubmit = (initialData: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
    errors: {}
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormState(prev => ({ ...prev, errors }));
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      await submitForm(formData);
      setFormState(prev => ({ ...prev, isSuccess: true }));
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        errors: { message: 'Failed to send message. Please try again.' }
      }));
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formState.errors[name as keyof FormData]) {
      setFormState(prev => ({
        ...prev,
        errors: { ...prev.errors, [name]: '' }
      }));
    }
  };

  return {
    formData,
    formState,
    handleSubmit,
    handleChange
  };
};