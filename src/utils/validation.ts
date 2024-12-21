import type { FormData } from '../types/Form';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Matches international format like +614 123 456 789
  const phoneRegex = /^\+\d{1,4}\s\d{3}\s\d{3}\s\d{3}$/;
  return phoneRegex.test(phone);
};

export const validateForm = (data: FormData): Partial<Record<keyof FormData, string>> => {
  const errors: Partial<Record<keyof FormData, string>> = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Format not recognized, please try again';
  }

  if (!validatePhone(data.phone)) {
    errors.phone = 'Format not recognized, please use format: +614 123 456 789';
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required';
  }

  return errors;
};