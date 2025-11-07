import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["admin", "author"], default: "admin" } // start with admin
  },
  { timestamps: true }
);

// hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// method to compare password
userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

export default mongoose.model("User", userSchema);
