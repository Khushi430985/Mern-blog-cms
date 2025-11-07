import { useEffect, useState } from "react";
import { request } from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function PostForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ title: "", content: "", status: "draft" });
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      if (!isEdit) return;
      try {
        const res = await request(`/api/posts/${id}`);
        const { title, content, status } = res.post;
        setForm({ title, content, status });
      } catch (e) { setErr(e.message); }
    })();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault(); setErr("");
    try {
      if (isEdit) {
        await request(`/api/posts/${id}`, { method: "PUT", body: form });
      } else {
        await request(`/api/posts`, { method: "POST", body: form });
      }
      nav("/posts");
    } catch (e) { setErr(e.message); }
  };

  return (
    <div style={{ maxWidth: 720, margin: "30px auto", padding: 16 }}>
      <h2>{isEdit ? "Edit Post" : "New Post"}</h2>
      {err && <div style={{ background: "#ffe5e5", padding: 8, marginBottom: 12 }}>{err}</div>}
      <form onSubmit={onSubmit}>
        <label>Title</label>
        <input
          style={{ width: "100%", margin: "6px 0 12px", padding: 8 }}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <label>Content</label>
        <textarea
          style={{ width: "100%", margin: "6px 0 12px", padding: 8, minHeight: 160 }}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
        <label>Status</label>
        <select
          style={{ display: "block", margin: "6px 0 16px", padding: 8 }}
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="draft">draft</option>
          <option value="published">published</option>
        </select>
        <button type="submit" style={{ padding: "8px 14px" }}>
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
