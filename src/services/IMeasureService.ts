import type { IMeasure} from '@models/mongo/MeasureModel';

export interface IMeasureService {
    createMeasureData(measureData:IMeasure):Promise<boolean>;
    getAllMeasureData():Promise<IMeasure[]>;
    getMeasureData(page: number, limit: number): Promise<{ data: IMeasure[], total: number }>
}