import mongoose, { Schema, Document } from "mongoose";

export interface ISchema extends Document {
    schemaId: string;
    author: string;
    schemaString: string;
}

const InvestorSchema = new Schema({
    schemaId: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    schemaString: { type: String, required: true },
});

export default mongoose.model<ISchema>("Schema", InvestorSchema);


