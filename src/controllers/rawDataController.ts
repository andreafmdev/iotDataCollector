import { Request, Response } from 'express';
import RawData, { IRawData } from '@models/RawDataModel';
import httpStatusCodes from '@utils/httpStatusCodes';

// Create a new RawData
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

// Get all RawData
export const getAllRawData = async (req: Request, res: Response): Promise<void> => {
  try {
    const rawDataList = await RawData.find();
    res.status(httpStatusCodes.OK).json(rawDataList);
  } catch (error) {
    res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: error instanceof Error ? error.message : 'Unknown error' });
  }
};
