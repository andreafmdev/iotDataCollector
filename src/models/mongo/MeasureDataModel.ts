import { Schema, Document, model } from 'mongoose';

export interface IMeasureData extends Document {
  value: string;
  desc: string;
  type: string;
}

const measureDataSchema: Schema = new Schema({
    value: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
    unique: false,
  },
  type: {
    type: String,
    required: true,
  },
});

export default model<IMeasureData>('MeasureData', measureDataSchema);
