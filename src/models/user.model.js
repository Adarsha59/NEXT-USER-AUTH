import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please enter a username"],
  },

  email: {
    type: String,
    required: [true, "please enter a valid email address"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, " please enter a valid password"],
  },

  isVarified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  verifyToken: String,
  verifyTokenExpiration: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
