import mongoose, { Schema, Document } from 'mongoose';

export interface IDomainModel extends Document {
// addresses: [Address];
  created: Date;
  domainname: string;
  email: string;
  homeUrl: string;
  locked: boolean;
  owner: string;
  overview: string;
  phone: string;
  registered: Date;
  tradeMark: string;
  unregistered: Date;
}

const DomainSchema: Schema = new Schema({
  created: { type: Date, default: Date.now() },
  domainname: { type: String, required: true, unique: true },
  email: String,
  homeUrl: String,
  locked: Boolean,
  overview: String,
  owner: { type: String, required: true },
  phone: String,
  registred: Date,
  tradeMark: String,
  unregistred: Date
});

DomainSchema.index({ domainname: 1 }, { unique: true });

// Export the model and return IDomain interface
export default mongoose.model<IDomainModel>('Domain', DomainSchema);
