import type { IMeasure} from '@models/mongo/MeasureModel';

export interface IMeasureService {
    createMeasureData(measureData:IMeasure):Promise<boolean>;
    getAllMeasureData():Promise<IMeasure[]>;
}