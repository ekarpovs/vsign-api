import mongoose, { Schema, Document } from 'mongoose';
import { ICompanyModel } from './company.model';

export interface IUserModel extends Document {
  locked: boolean;
  name: string;
  email: string;
  password: string;
  provider: ICompanyModel;
  created: Date;
}

const UserSchema: Schema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  locked: Boolean,
  name: { type: String, required: true, unique: true },
  // tslint:disable-next-line:object-literal-sort-keys
  email: String,
  password: String
});

// Export the model and return ICompany interface
export default mongoose.model<IUserModel>('User', UserSchema);
