import { IMeasureData } from '@models/mongo/MeasureDataModel';

export interface IMeasureDataRepository {
    findById(id: string): Promise<IMeasureData | null>;
    findAll(): Promise<IMeasureData[]>;
    save(measureData: IMeasureData): Promise<IMeasureData | null>;
   
}

