import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { useAuth } from "./AuthContext";
import { api } from "./api";

export default function WritePost() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", category: "", content: "", readTime: "", image: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { ok, data } = await api("/api/posts", {
      method: "POST",
      body: JSON.stringify({ ...form, author: user.fullName }),
    });
    if (!ok) return setError(data?.message || "Could not create post");
    navigate("/my-posts");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError("Choose an image smaller than 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, image: reader.result });
    reader.readAsDataURL(file);
    setError("");
  };

  return <div className="min-h-screen bg-gray-50"><NavBar /><main className="mx-auto mt-10 max-w-2xl px-4 pb-10">
    <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Share an idea</p>
    <h1 className="mb-2 mt-1 text-3xl font-bold text-gray-900">Write a Post</h1>
    <p className="mb-6 text-gray-600">Add a title, category, and your story.</p>
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <label className="flex flex-col gap-2 text-sm font-semibold text-gray-700">Title
        <input required placeholder="Give your post a title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="rounded-lg border border-gray-300 p-3 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold text-gray-700">Category
        <input required placeholder="For example: Technology" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="rounded-lg border border-gray-300 p-3 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold text-gray-700">Read time (minutes)
        <input required min="1" type="number" placeholder="5" value={form.readTime} onChange={e => setForm({ ...form, readTime: e.target.value })} className="rounded-lg border border-gray-300 p-3 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
      </label>
      <label className="flex flex-col gap-2 text-sm font-semibold text-gray-700">Post image
        <input type="file" accept="image/*" onChange={handleImageChange} className="rounded-lg border border-gray-300 p-3 font-normal" />
      </label>
      {form.image && <img src={form.image} alt="Post preview" className="h-52 w-full rounded-lg object-cover" />}
      <label className="flex flex-col gap-2 text-sm font-semibold text-gray-700">Your post
        <textarea required rows="8" placeholder="Start writing..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="resize-y rounded-lg border border-gray-300 p-3 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
      </label>
      {error && <p className="text-red-600">{error}</p>}
      <button className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800">Publish Post</button>
    </form>
    </section>
  </main></div>;
}