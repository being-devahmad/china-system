// models/user.model.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'tenant-admin', 'super-admin'], default: 'user' }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
