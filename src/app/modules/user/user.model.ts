import { model, Schema } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangedAt: {
      type: Date,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

// methods
userSchema.methods.isUserExist = async function (
  id: string
): Promise<Partial<IUser> | null> {
  return User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needPasswordChange: 1 }
  );
};

userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return bcrypt.compare(givenPassword, savedPassword);
};

// hash password
// User.create() or user.save()
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );

  if (!this.needPasswordChange) {
    this.passwordChangedAt = new Date();
  }

  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
