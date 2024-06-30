import UserError from './UserError';

class EmailAlreadyExistsError extends UserError {
  constructor() {
    super('Email already exists', 409);
  }
}

export default EmailAlreadyExistsError;
