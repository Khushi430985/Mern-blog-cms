import { useEffect, useState } from "react";
import { request } from "../api";
import { Link } from "react-router-dom";

export default function PublicList() {
  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await request("/api/posts");
        setPosts(res.posts || []);
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="mb-3">Blog</h1>
      {err && <div className="alert alert-danger">{err}</div>}
      <div className="list-group">
        {posts.map((p) => (
          <Link key={p._id} to={`/post/${p._id}`} className="list-group-item list-group-item-action">
            <div className="d-flex justify-content-between">
              <h5 className="mb-1">{p.title}</h5>
              <small className="text-muted">{new Date(p.createdAt).toLocaleDateString()}</small>
            </div>
            <small className="badge text-bg-success">{p.status}</small>
          </Link>
        ))}
        {posts.length === 0 && <div className="text-muted">No posts yet.</div>}
      </div>
    </div>
  );
}
