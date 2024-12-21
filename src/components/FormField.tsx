import React from 'react';

interface FormFieldProps {
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  className
}) => {
  const InputComponent = type === 'textarea' ? 'textarea' : 'input';
  
  return (
    <div className={className}>
      <label htmlFor={name}>
        {label}
      </label>
      <InputComponent
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        rows={type === 'textarea' ? 4 : undefined}
      />
      {error && (
        <p className="error">{error}</p>
      )}
    </div>
  );
};