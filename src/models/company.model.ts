import mongoose, { Schema, Document } from 'mongoose';

export interface ICompanyModel extends Document {
// addresses: [Address];
  created: Date;
  email: string;
  homeUrl: string;
  locked: boolean;
  name: string;
  nick: string;
  overview: string;
  phone: string;
  registered: Date;
  tradeMark: string;
  unregistered: Date;
}

const CompanySchema: Schema = new Schema({
  created: { type: Date, default: Date.now() },
  email: String,
  homeUrl: String,
  locked: Boolean,
  name: { type: String, required: true },
  nick: { type: String, required: true, unique: true },
  overview: String,
  phone: String,
  registred: Date,
  tradeMark: String,
  unregistred: Date
});

// Export the model and return ICompany interface
export default mongoose.model<ICompanyModel>('Company', CompanySchema);
