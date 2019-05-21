import mongoose, { Schema, Document } from 'mongoose';

export interface ICompanyModel extends Document {
  locked: boolean;
  name: string;
  nick: string;
  phone: string;
  email: string;
}

const CompanySchema: Schema = new Schema({
  locked: Boolean,
  name: { type: String, required: true },
  nick: { type: String, required: true, unique: true },
  phone: String,
  // tslint:disable-next-line:object-literal-sort-keys
  email: String
});

// Export the model and return ICompany interface
export default mongoose.model<ICompanyModel>('Company', CompanySchema);
