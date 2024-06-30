import AppError from './AppError';

class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export default ValidationError;
