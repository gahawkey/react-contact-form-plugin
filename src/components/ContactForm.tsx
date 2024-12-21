import React from 'react';
import { FormField } from './FormField';
import { SuccessMessage } from './SuccessMessage';
import { useFormSubmit } from '../hooks/useFormSubmit';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  message: ''
};

export const ContactForm: React.FC = () => {
  const { formData, formState, handleSubmit, handleChange } = useFormSubmit(initialFormData);

  return (
    <div className="nf-form-wrapper">
      {formState.isSuccess ? (
        <SuccessMessage />
      ) : (
        <form onSubmit={handleSubmit} className="nf-form">
          <div className="nf-form-row">
            <FormField
              label="Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={formState.errors.name}
              className="nf-name"
            />
            <FormField
              label="Phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={formState.errors.phone}
              className="nf-phone"
            />
          </div>
          <FormField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={formState.errors.email}
            className="nf-email"
          />
          <FormField
            label="Message"
            type="textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={formState.errors.message}
            className="nf-textarea"
          />
          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="nf-button"
          >
            {formState.isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
};