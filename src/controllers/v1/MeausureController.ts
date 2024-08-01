// src/controllers/RawDataController.ts
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import MeasureData, { IMeasure } from '@models/mongo/MeasureModel';
import { BaseController } from '@controllers/BaseController';
import { IMeasureService } from '@services/IMeasureService';
import { MeasureDataRequest } from '@request/MeasureData/MeasureDataRequest';
import measureDataMessageConst from '@utils/measureData/measureDataConst';
@injectable()
export class MeausureController extends BaseController {
    constructor(@inject('IMeasureDataService') private measureService: IMeasureService) {
        super();
    }
    public async createMeasureData(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const { value, desc, type }: MeasureDataRequest = req.body;
            const measureData: IMeasure = new MeasureData({ value, desc, type });
            const savedMeasureData = await this.measureService.createMeasureData(measureData);
            this.handleCreated(res, { savedMeasureData, message: measureDataMessageConst.MEASURE_CREATED });
        } catch (error) {
            this.handleError(res, error);
            next(error);
        }
    }

    public async getAllMeasureData(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const measureDataList = await this.measureService.getAllMeasureData();
            this.handleSuccess(res, measureDataList);
        } catch (error) {
            this.handleError(res, error);
            next(error);
        }
    }
}
