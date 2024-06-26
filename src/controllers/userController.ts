import { Request, Response } from 'express';
import httpStatusCodes from '@utils/httpStatusCodes';
import User from '@models/User';

// Crea un nuovo RawData

// Crea un nuovo RawData
export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(httpStatusCodes.CONFLICT).json({ message: 'User already exists' });
        return;
      }
  
      // Create a new user
      const user = await User.create({ email, password });
      res.status(httpStatusCodes.CREATED).json(user);
    } catch (error) {
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error creating user', error });
    }
  };