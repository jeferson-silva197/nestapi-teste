import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      isRequired: true,
      trim: true,
      index: true,
      unique: true,
    },

    password: {
      type: String,
      isRequired: true,
      trim: true,
    },

    email: {
      type: String,
      isRequired: true,
      trim: true,
      index: true,
    },
    roles: [
      {
        type: String,
        isRequired: true,
        enum: ['user', 'admin'],
        default: 'user',
      },
    ],
    active: {
      type: Boolean,
      isRequired: true,
      default: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);
