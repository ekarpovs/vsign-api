import mongoose, { Schema, Document } from 'mongoose';
import { IDomainModel } from './domain.model';
import { IProductModel } from './product.model';
import { IUserModel } from './user.model';

export interface IOrderStatusModel extends Document {
  created: Date;
  downloaded: Date;
  locked: boolean;
  notified: Date;
  payed: Date;
  prepared: Date;
}
export interface IOrderModel extends Document {
  amount: number;
  creator: IUserModel;
  description: string;
  domain: IDomainModel;
  product: IProductModel;
  status: IOrderStatusModel;
}

const OrderStatusSchema: Schema = new Schema({
  created: { type: Date, default: Date.now() },
  downloaded: Date,
  locked: Boolean,
  notified: Date,
  payed: Date,
  prepared: Date
}, { _id: false });

const OrderSchema: Schema = new Schema({
  amount: Number,
  creator: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: false },
  description: String,
  domain: { type: Schema.Types.ObjectId, ref: 'Domain', unique: false },
  product: { type: Schema.Types.ObjectId, ref: 'Product', unique: false },
  status: OrderStatusSchema
});
OrderSchema.index({ domain: 1 }, { unique: true });

// Export the model and return IProduct interface
export default mongoose.model<IOrderModel>('Order', OrderSchema);
