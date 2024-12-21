import type { FormData } from '../types/Form';

export const submitForm = async (data: FormData): Promise<void> => {
  const response = await fetch('/wp-json/react-contact-form/v1/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    console.error('Submission failed:', await response.text());
    throw new Error('Submission failed');
  }
};