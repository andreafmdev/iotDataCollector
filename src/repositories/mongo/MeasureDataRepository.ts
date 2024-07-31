import MeasureData, { IMeasureData } from '@models/mongo/MeasureDataModel';
import { IMeasureDataRepository } from './IMeasureDataRepository';

export class MeasureDataRepository implements IMeasureDataRepository {
    public async findById(id: string): Promise<IMeasureData | null> {
        return await MeasureData.findById(id);
    }

    public async findAll(): Promise<IMeasureData[]> {
        return await MeasureData.find({});
    }

    public async save(measureData: IMeasureData): Promise<IMeasureData> {
        const newMeasureData = new MeasureData(measureData);
        return await newMeasureData.save();
    }
}
