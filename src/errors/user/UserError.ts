import AppError from '@errors/AppError';

class UserError extends AppError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}

export default UserError;
