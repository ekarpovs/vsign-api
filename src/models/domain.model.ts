import mongoose, { Schema, Document } from 'mongoose';

export interface IDomainModel extends Document {
// addresses: [Address];
  created: Date;
  email: string;
  homeUrl: string;
  locked: boolean;
  owner: string;
  name: string;
  overview: string;
  phone: string;
  registered: Date;
  tradeMark: string;
  unregistered: Date;
}

const DomainSchema: Schema = new Schema({
  created: { type: Date, default: Date.now() },
  email: String,
  homeUrl: String,
  locked: Boolean,
  name: { type: String, required: true, unique: true },
  overview: String,
  owner: { type: String, required: true },
  phone: String,
  registred: Date,
  tradeMark: String,
  unregistred: Date
});

// Export the model and return IDomain interface
export default mongoose.model<IDomainModel>('Domain', DomainSchema);
