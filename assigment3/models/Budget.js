import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
department: { type: String, required: true, trim: true },
sector: { type: String, required: true, trim: true },
year: { type: Number, required: true },
allocatedAmount: { type: Number, required: true, min: 0 },
utilizedAmount: { type: Number, default: 0, min: 0 },
notes: { type: String },
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date }
});


budgetSchema.pre('save', function (next) {
this.updatedAt = Date.now();
next();
});

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;