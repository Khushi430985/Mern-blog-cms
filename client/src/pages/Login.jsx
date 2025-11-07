import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(form.email, form.password);
      nav("/posts");
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "60px auto", padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2 style={{ marginBottom: 16 }}>Admin Login</h2>
      {err && <div style={{ background: "#ffe5e5", padding: 8, marginBottom: 12 }}>{err}</div>}
      <form onSubmit={onSubmit}>
        <label>Email</label>
        <input
          style={{ width: "100%", margin: "6px 0 12px", padding: 8 }}
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <label>Password</label>
        <input
          style={{ width: "100%", margin: "6px 0 16px", padding: 8 }}
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button style={{ padding: "8px 14px" }} type="submit">Login</button>
      </form>
    </div>
  );
}
