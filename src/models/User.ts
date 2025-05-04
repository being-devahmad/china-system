// // models/user.model.ts
// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, enum: ['user', 'tenant-admin', 'super-admin'], default: 'user' }
// }, { timestamps: true });

// export const User = mongoose.models.User || mongoose.model('User', userSchema);


import mongoose, { Schema } from 'mongoose';

export const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  role: { type: String, enum: ['user', 'tenant-admin', 'super-admin'], default: 'user' },

  // For Tenant Databases
  authUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional
}, { timestamps: true });
