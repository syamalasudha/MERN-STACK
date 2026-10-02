import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useAuth } from "./AuthContext";
import { api } from "./api";
import { Link } from "react-router-dom";

export default function MyPosts() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/api/posts").then(({ ok, data }) => {
      if (!ok) setError(data?.message || "Could not load posts");
      else setPosts(data.filter(post => post.author === user.fullName));
    }).catch(() => setError("Could not connect to backend"));
  }, [user.fullName]);

  return <div className="min-h-screen bg-gray-50"><NavBar /><main className="mx-auto mt-10 max-w-4xl px-4 pb-10">
    <header className="mb-7 border-b border-gray-200 pb-4">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Your writing</p>
      <h1 className="mt-1 text-3xl font-bold text-gray-900">My Posts</h1>
      <p className="mt-2 text-gray-600">Your published stories in one place.</p>
    </header>
    {error && <p className="rounded-md bg-red-50 p-4 text-red-700">{error}</p>}
    {!error && posts.length === 0 && <p className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">You haven't written any posts yet.</p>}
    <div className="grid gap-5 sm:grid-cols-2">{posts.map(post => <article key={post._id} className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      {post.image && <img src={post.image} alt={post.title} className="h-44 w-full object-cover" />}
      <div className="p-6"><p className="mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">{post.category}</p>
      <p className="mb-2 text-sm text-gray-500">{post.readTime} min read</p><h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
      <p className="mt-3 whitespace-pre-wrap leading-relaxed text-gray-600">{post.content}</p>
      <Link to={`/posts/${post._id}`} state={{ post }} className="mt-4 inline-block font-medium text-blue-700 hover:underline">Read more</Link></div>
    </article>)}</div>
  </main></div>;
}