import mongoose, { Schema, Document } from 'mongoose';
import { IDomainModel } from './domain.model';

export interface IProductModel extends Document {
  domain: IDomainModel;
  created: Date;
  description: string;
  locked: boolean;
  name: string;
}

const ProductSchema: Schema = new Schema({
  created: { type: Date, default: Date.now() },
  description: String,
  domain: { type: Schema.Types.ObjectId, ref: 'Domain', unique: false },
  locked: Boolean,
  name: { type: String, required: true, unique: false }
});
ProductSchema.index({ name: 1, domain: 1 }, { unique: true });

// Export the model and return IProduct interface
export default mongoose.model<IProductModel>('Product', ProductSchema);
