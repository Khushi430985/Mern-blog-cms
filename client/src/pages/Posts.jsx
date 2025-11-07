import { useEffect, useState } from "react";
import { request } from "../api";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState("");
  const { user, logout } = useAuth();

  const load = async () => {
    try {
      const res = await request("/api/posts/admin/all"); // ADMIN endpoint
      setPosts(res.posts || []);
    } catch (e) {
      setErr(e.message);
    }
  };

  const delPost = async (id) => {
    if (!confirm("Delete this post?")) return;
    await request(`/api/posts/${id}`, { method: "DELETE" });
    setPosts((p) => p.filter((x) => x._id !== id));
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Admin · Posts</h2>
        <div>
          {user && <span className="me-2">Hi, {user.name}</span>}
          <button className="btn btn-outline-secondary" onClick={() => logout()}>Logout</button>
        </div>
      </div>

      <div className="mb-3">
        <Link className="btn btn-primary" to="/admin/posts/new">+ New Post</Link>
      </div>

      {err && <div className="alert alert-danger">{err}</div>}

      {posts.map((p) => (
        <div key={p._id} className="card card-body mb-2">
          <div className="d-flex justify-content-between">
            <div>
              <h5 className="mb-1">{p.title}</h5>
              <small className="text-muted">
                {p.status} • {new Date(p.createdAt).toLocaleString()}
              </small>
            </div>
            <div className="d-flex align-items-center gap-2">
  <Link
    to={`/admin/posts/edit/${p._id}`}
    className="btn btn-sm btn-outline-primary fw-semibold"
    style={{ minWidth: "80px" }}
  >
     Edit
  </Link>
  <button
    onClick={() => delPost(p._id)}
    className="btn btn-sm btn-outline-danger fw-semibold"
    style={{ minWidth: "80px" }}
  >
     Delete
  </button>
</div>

          </div>
        </div>
      ))}

      {posts.length === 0 && <div className="text-muted">No posts yet.</div>}
    </div>
  );
}
