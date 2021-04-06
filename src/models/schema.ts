import mongoose, { Schema, Document } from "mongoose";

export interface ISchema extends Document {
    schemaId: string;
    schemaString: string;
}

const InvestorSchema = new Schema({
    schemaId: { type: String, required: true, unique: true },
    schemaString: { type: String, required: true },
});

export default mongoose.model<ISchema>("Schema", InvestorSchema);


