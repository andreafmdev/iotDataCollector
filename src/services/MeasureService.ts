import { IMeasure } from '@models/mongo/MeasureModel';
import { IMeasureRepository } from '@mongorepositories/IMeasureRepository';
import { IMeasureService } from '@services/IMeasureService';
import { injectable, inject } from 'tsyringe';
import measureDataMessageConst from '@utils/measureData/measureDataConst';
import httpStatusCodes from '@utils/httpStatusCodes';
import AppError from '@errors/AppError';

@injectable()
export class MeasureService implements IMeasureService {
    constructor(
        @inject('IMeasureDataRepository') private measureDataRepository: IMeasureRepository
    ) { }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async createMeasureData(measureData: IMeasure): Promise<boolean> {
        const savedMeasureData = await this.measureDataRepository.save(measureData);
        if (!savedMeasureData) {
            throw new AppError(measureDataMessageConst.MEASURE_CREATION_FAILED, httpStatusCodes.INTERNAL_SERVER_ERROR);
        }
        return true;
    }
    public async getAllMeasureData(): Promise<IMeasure[]> {
        return await this.measureDataRepository.findAll();
    }
    public async getMeasureData(page: number, limit: number): Promise<{ data: IMeasure[], total: number }> {
        const skip = (page - 1) * limit;
        const total = await this.measureDataRepository.count(); // Numero totale di misure
        const data = await this.measureDataRepository.findWithPagination(skip, limit); // Recupera solo i dati necessari

        return { data, total };
    }

}