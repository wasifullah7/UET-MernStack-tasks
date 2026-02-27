import { Link, useParams } from 'react-router-dom';
import Comments from './Comments';
import DOMPurify from 'dompurify';

const Post = ({ blogs, slugify }) => {
  const { slug } = useParams();
  const blog = blogs.find(blog => slugify(blog.title) === slug);

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md mt-8">
        <h3 className="font-bold text-2xl text-blue-600 mb-4">Loading...</h3>
        <p className="text-gray-700">Please wait while the post loads or it may not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md mt-8">
      <h1 className="font-bold text-3xl text-blue-700 mb-4">{blog.title}</h1>
      <div className="mb-6 border-b pb-4">
        {/* <p className="text-gray-800 text-lg leading-relaxed text-justify">{blog.content}</p> */}
        <div className="text-gray-800 text-lg leading-relaxed text-justify"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blog.content)
          }}
        ></div>
      </div>
      <div className="mb-6">
        <Link
          to="/posts"
          className="inline-block px-5 py-2 rounded-full bg-cyan-500 text-white font-semibold shadow hover:bg-cyan-600 transition"
        >
          ← Back To All Posts
        </Link>
      </div>
      <div className="mt-8">
        <Comments blogId={blog._id} />
      </div>
    </div>
  );
};

export default Post