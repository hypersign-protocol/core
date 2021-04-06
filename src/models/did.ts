import mongoose, { Schema, Document } from "mongoose";

export interface IDID extends Document {
    did: string;
    didDocString: string;
}

const InvestorSchema = new Schema({
  did: { type: String, required: true, unique: true },
  didDocString: { type: String, required: true },
});

export default mongoose.model<IDID>("DID", InvestorSchema);


