import { Request, Response,NextFunction } from 'express';
import AppError from '@errors/AppError';

//essendo l'ultimo middleware in catena non comprende il next 
export const errorHandler = (err: AppError , req: Request, res: Response,next: NextFunction): void => {
    //Errore Operazionale: È un errore previsto e gestibile, come la convalida dei dati o errori specifici del dominio applicativo.
    if (res.headersSent) {
        return next(err);
      }
    if (err.isOperational) {
      res.status(err.statusCode).json({ 
        status: 'error', 
        message: err.message 
      });
    } else {
        //Errore Non Operazionale: Sono errori imprevisti, come problemi del server, errori di runtime, ecc.
      res.status(500).json({ 
        status: 'error', 
        message: 'Internal Server Error' 
      });
    }
  };