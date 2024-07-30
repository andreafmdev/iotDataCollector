import type { IMeasureData } from '@models/mongo/MeasureDataModel';

export interface IMeasureDataService {
    createMeasureData(measureData:IMeasureData):Promise<boolean>;
    getAllMeasureData():Promise<IMeasureData[]>;
}