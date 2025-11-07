import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ ok: false, message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ ok: false, message: "Invalid/expired token" });
  }
};

export const requireAdmin = (req, res, next) => {
  // Optional: fetch user & check role if you need strict admin-only
  next();
};
