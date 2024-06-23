import { Request, Response } from 'express';
import RawData, { IRawData } from '../models/DataModel/RawDataModel';
import httpStatusCodes from '../utils/httpStatusCodes';

// Crea un nuovo RawData

// Crea un nuovo RawData
export const createRawData = async (req: Request, res: Response): Promise<void> => {
    const { value, desc, type } = req.body;
  
    try {
      const rawData: IRawData = new RawData({ value, desc, type });
      const savedRawData = await rawData.save();
      res.status(httpStatusCodes.CREATED).json(savedRawData);
    } catch (error) {
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
  };
  
  // Ottieni tutti i RawData
  export const getAllRawData = async (req: Request, res: Response): Promise<void> => {
    try {
      const rawDataList = await RawData.find();
      res.status(httpStatusCodes.OK).json(rawDataList);
    } catch (error) {
      res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error instanceof Error ? error.message : 'Unknown error' });
    }
  };