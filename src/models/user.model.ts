import mongoose, { Schema, Document } from 'mongoose';
import { ICompanyModel } from './company.model';

export interface IUserModel extends Document {
  access: boolean[];
  company: ICompanyModel;
  created: Date;
  email: string;
  locked: boolean;
  name: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  access: { type: [Boolean], default: [false, false, false, false] },
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true, unique: false },
  created: { type: Date, default: Date.now() },
  email: String,
  locked: Boolean,
  name: { type: String, required: true, unique: false },
  password: String
});

UserSchema.index({ name: 1, company: 1 }, { unique: true });

// Export the model and return ICompany interface
export default mongoose.model<IUserModel>('User', UserSchema);
