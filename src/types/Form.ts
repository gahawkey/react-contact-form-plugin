export interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
  errors: Partial<Record<keyof FormData, string>>;
}