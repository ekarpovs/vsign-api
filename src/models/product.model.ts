import mongoose, { Schema, Document } from 'mongoose';
import { IDomainModel } from './domain.model';
import { IUserModel } from './user.model';

export interface IRegisteredModel extends Document {
  by: IUserModel;
  date: Date;
}

export interface IProductModel extends Document {
  domain: IDomainModel;
  created: Date;
  description: string;
  locked: boolean;
  name: string;
  registered: IRegisteredModel;
}

const RegisteredSchema: Schema = new Schema({
  by: { type: Schema.Types.ObjectId, ref: 'User', unique: false},
  date: { type: Date, default: Date.now() }
}, { _id: false });

const ProductSchema: Schema = new Schema({
  created: { type: Date, default: Date.now() },
  description: String,
  domain: { type: Schema.Types.ObjectId, ref: 'Domain', unique: false },
  locked: Boolean,
  name: { type: String, required: true, unique: false },
  registered: RegisteredSchema
});
ProductSchema.index({ name: 1, domain: 1 }, { unique: true });

// Export the model and return IProduct interface
export default mongoose.model<IProductModel>('Product', ProductSchema);
