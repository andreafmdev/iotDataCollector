// src/controllers/RawDataController.ts
import { Request, Response, NextFunction } from 'express';
import { injectable } from 'tsyringe';
import RawData, { IRawData } from '@models/mongo/RawDataModel';
import { BaseController } from '@controllers/BaseController';

@injectable()
export class RawDataController extends BaseController {
    public async createRawData(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { value, desc, type } = req.body;

        try {
            const rawData: IRawData = new RawData({ value, desc, type });
            const savedRawData = await rawData.save();
            this.handleCreated(res, savedRawData);
        } catch (error) {
            this.handleError(res, error);
            next(error);
        }
    }

    public async getAllRawData(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const rawDataList = await RawData.find();
            this.handleSuccess(res, rawDataList);
        } catch (error) {
            this.handleError(res, error);
            next(error);
        }
    }
}
