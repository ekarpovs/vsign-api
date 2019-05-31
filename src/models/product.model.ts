import mongoose, { Schema, Document } from 'mongoose';
import { ICompanyModel } from './company.model';

export interface IProductModel extends Document {
  company: ICompanyModel;
  created: Date;
  description: string;
  locked: boolean;
  name: string;
}

const ProductSchema: Schema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company', unique: false },
  created: { type: Date, default: Date.now() },
  description: String,
  locked: Boolean,
  name: { type: String, required: true, unique: false }
});
ProductSchema.index({ name: 1, company: 1 }, { unique: true });
// Export the model and return ICompany interface
export default mongoose.model<IProductModel>('Product', ProductSchema);
