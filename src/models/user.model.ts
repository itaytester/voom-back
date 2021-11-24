import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";

export type userJwtPayload = Omit<UserDocument, "password">;


export interface UserRequest {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface UserDocument extends mongoose.Document, UserRequest {
  createdAt: Date,
  updatedAt: Date,
  comparePasswords(candidatePassword: string): Promise<Boolean>
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) return next();

  let salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  return next();
});

userSchema.methods.comparePasswords = async function(candidatePassword:string): Promise<boolean> {
    let user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch(e => false);

}

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
