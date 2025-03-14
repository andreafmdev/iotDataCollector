import MeasureData, { IMeasure } from '@models/mongo/MeasureModel';
import { IMeasureRepository } from '@mongorepositories/IMeasureRepository';

export class MeasureRepository implements IMeasureRepository {
    public async findById(id: string): Promise<IMeasure | null> {
        return await MeasureData.findById(id);
    }

    public async findAll(): Promise<IMeasure[]> {
        return await MeasureData.find({});
    }

    public async save(measureData: IMeasure): Promise<IMeasure> {
        const newMeasureData = new MeasureData(measureData);
        return await newMeasureData.save();
    }
    public async findWithPagination(skip: number, limit: number): Promise<IMeasure[]> {
        return await MeasureData.find().skip(skip).limit(limit).exec();
    }
    public async count(): Promise<number> {
        return await MeasureData.countDocuments().exec();
    }
}
