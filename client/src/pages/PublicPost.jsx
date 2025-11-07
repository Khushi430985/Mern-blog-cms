import { useEffect, useState } from "react";
import { request } from "../api";
import { useParams, Link } from "react-router-dom";

export default function PublicPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await request(`/api/posts/${id}`);
        setPost(res.post);
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, [id]);

  if (err) return <div className="container py-4"><div className="alert alert-danger">{err}</div></div>;
  if (!post) return <div className="container py-4">Loading…</div>;

  return (
    <div className="container py-4">
      <Link to="/" className="btn btn-link">&larr; Back</Link>
      <h1 className="mt-3">{post.title}</h1>
      <div className="text-muted mb-3">{new Date(post.createdAt).toLocaleString()}</div>
      <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{post.content}</div>
    </div>
  );
}
