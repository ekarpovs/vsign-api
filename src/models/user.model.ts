import mongoose, { Schema, Document } from 'mongoose';
import { IDomainModel } from './domain.model';

export interface IUserModel extends Document {
  access: boolean[];
  domain: IDomainModel;
  created: Date;
  email: string;
  locked: boolean;
  password: string;
  username: string;
}

const UserSchema: Schema = new Schema({
  access: { type: [Boolean], default: [false, false, false, false] },
  created: { type: Date, default: Date.now() },
  domain: { type: Schema.Types.ObjectId, ref: 'Domain', required: true, unique: false },
  email: String,
  locked: Boolean,
  password: String,
  username: { type: String, required: true, unique: false }
});

UserSchema.index({ username: 1, domain: 1 }, { unique: true });

// Export the model and return IUser interface
export default mongoose.model<IUserModel>('User', UserSchema);
