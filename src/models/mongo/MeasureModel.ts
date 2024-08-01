import { Schema, Document, model } from 'mongoose';

export interface IMeasure extends Document {
  value: string;
  desc: string;
  type: string;
}

const measureSchema: Schema = new Schema({
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

export default model<IMeasure>('Measure', measureSchema);
