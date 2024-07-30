import { IMeasureData } from '@models/mongo/MeasureDataModel';
import { IMeasureDataRepository } from '@mongorepositories/IMeasureDataRepository';
import { IMeasureDataService } from '@services/IMeasureDataService';
import { injectable, inject } from 'tsyringe';
import measureDataMessageConst from '@utils/measureData/measureDataConst';
import httpStatusCodes from '@utils/httpStatusCodes';
import AppError from '@errors/AppError';

@injectable()
export class MeasureDataService implements IMeasureDataService {
    constructor(
        @inject('IMeasureDataRepository') private measureDataRepository: IMeasureDataRepository
    ) { }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async createMeasureData(measureData: IMeasureData): Promise<boolean> {
        const savedMeasureData = await this.measureDataRepository.save(measureData);
        if (!savedMeasureData) {
            throw new AppError(measureDataMessageConst.MEASURE_CREATION_FAILED, httpStatusCodes.INTERNAL_SERVER_ERROR);
        }
        return true;
    }
    public async getAllMeasureData(): Promise<IMeasureData[]> {
        return await this.measureDataRepository.findAll();
    }

}