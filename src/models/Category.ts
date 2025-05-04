import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  heCode: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    hsCode: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);


export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);