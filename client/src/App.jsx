import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import AuthProvider, { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import PostForm from "./pages/PostForm";
import PublicList from "./pages/PublicList";
import PublicPost from "./pages/PublicPost";

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="container py-4">Loading…</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
}

function Nav() {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">Blog</Link>
        <div className="ms-auto">
          <Link className="btn btn-outline-secondary me-2" to="/">Home</Link>
          {user ? (
            <>
              <Link className="btn btn-outline-primary me-2" to="/admin/posts">Admin</Link>
              <button className="btn btn-danger" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link className="btn btn-primary" to="/admin/login">Admin Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          {/* Public */}
          <Route path="/" element={<PublicList />} />
          <Route path="/post/:id" element={<PublicPost />} />

          {/* Admin */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/posts" element={<Protected><Posts /></Protected>} />
          <Route path="/admin/posts/new" element={<Protected><PostForm /></Protected>} />
          <Route path="/admin/posts/edit/:id" element={<Protected><PostForm /></Protected>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
