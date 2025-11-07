import jwt from "jsonwebtoken";
import User from "../models/User.js";

const cookieOptions = {
  httpOnly: true,
  secure: false,           // prod me true + sameSite:'none'
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const createToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const signup = async (req, res) => {
  try {
    const { name, email, password, role = "admin" } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ ok: false, message: "All fields required" });
    }

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ ok: false, message: "Email already registered" });

    const user = await User.create({ name, email, password, role });
    const token = createToken(user._id);
    res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({ ok: true, message: "Signup successful", user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ ok: false, message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res
      .cookie("token", token, cookieOptions)
      .json({ ok: true, message: "Login successful", user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
};

export const me = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json({ ok: true, user });
};

export const logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax", secure: false });
  res.json({ ok: true, message: "Logged out" });
};
