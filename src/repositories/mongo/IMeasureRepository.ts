import { IMeasure } from '@models/mongo/MeasureModel';

export interface IMeasureRepository {
    findById(id: string): Promise<IMeasure | null>;
    findAll(): Promise<IMeasure[]>;
    save(measureData: IMeasure): Promise<IMeasure | null>;
    findWithPagination(skip: number, limit: number): Promise<IMeasure[]>
    count(): Promise<number>
}

