class AppError extends Error {
    public statusCode: number;
    //show if the error is handled or not
    public isOperational: boolean;
  
    constructor(message: string, statusCode: number, isOperational = true) {
      super(message);
      
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default AppError;
  