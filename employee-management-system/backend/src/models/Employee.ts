import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
    name: string;
    age: number;
    class: string;
    subjects: string[];
    attendance: number;
    email: string;
    position: string;
    department: string;
    photoUrl?: string;
}

const EmployeeSchema: Schema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    class: { type: String, required: true },
    subjects: { type: [String], required: true },
    attendance: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    department: { type: String, required: true },
    photoUrl: { type: String }
}, { timestamps: true });

// Index for search optimization
EmployeeSchema.index({ name: 'text', email: 'text', department: 'text', position: 'text' });

export default mongoose.model<IEmployee>('Employee', EmployeeSchema);
