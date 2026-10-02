import { Link, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

export default function PostDetails() {
  const { state } = useLocation();
  const post = state?.post;

  return <div className="min-h-screen bg-gray-50"><NavBar />
    <main className="mx-auto mt-8 max-w-3xl px-4 pb-10">
      {!post ? <section className="rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="text-gray-700">Post not found. Open it from the home page.</p>
        <Link to="/home" className="mt-4 inline-block text-blue-700 hover:underline">Back to Home</Link>
      </section> : <article className="overflow-hidden rounded-xl bg-white shadow-sm">
        {post.image || post.Image ? <img src={post.image || post.Image} alt={post.title} className="h-64 w-full object-cover sm:h-80" /> : null}
        <div className="p-6 sm:p-10">
          <p className="mb-3 text-sm font-medium text-blue-700">{post.category || "Story"} · {post.readTime || post.timeRead}</p>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-gray-500">By {post.author}</p>
          <div className="mt-8 whitespace-pre-wrap leading-8 text-gray-700">{post.content}</div>
          <Link to="/home" className="mt-8 inline-block text-blue-700 hover:underline">Back to Home</Link>
        </div>
      </article>}
    </main>
  </div>;
}