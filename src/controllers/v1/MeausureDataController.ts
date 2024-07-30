// src/controllers/RawDataController.ts
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import MeasureData, { IMeasureData } from '@models/mongo/MeasureDataModel';
import { BaseController } from '@controllers/BaseController';
import { IMeasureDataService } from '@services/IMeasureDataService';
import { MeasureDataRequest } from '@request/MeasureData/MeasureDataRequest';
import measureDataMessageConst from '@utils/measureData/measureDataConst';
@injectable()
export class MeausureDataController extends BaseController {
    constructor(@inject('IMeasureDataService') private measureDataService: IMeasureDataService) {
        super();
    }
    public async createMeasureData(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const { value, desc, type }: MeasureDataRequest = req.body;
            const measureData: IMeasureData = new MeasureData({ value, desc, type });
            const savedMeasureData = await this.measureDataService.createMeasureData(measureData);
            this.handleCreated(res, { savedMeasureData, message: measureDataMessageConst.MEASURE_CREATED });
        } catch (error) {
            this.handleError(res, error);
            next(error);
        }
    }

    public async getAllMeasureData(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const measureDataList = await this.measureDataService.getAllMeasureData();
            this.handleSuccess(res, measureDataList);
        } catch (error) {
            this.handleError(res, error);
            next(error);
        }
    }
}
