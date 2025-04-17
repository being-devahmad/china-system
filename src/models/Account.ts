
import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['business', 'personal'], required: true },
  CNIC: String,
  phone: String,
}, { timestamps: true });

export const Account = mongoose.models.Account || mongoose.model('Account', accountSchema);
