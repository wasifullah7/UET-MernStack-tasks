import React from 'react'
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

const Home = ({ blogs, slugify }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl mx-auto p-4">
      <section className="mb-8">
        <h1 className="font-bold text-3xl text-blue-500 mb-2">Welcome to the Blog Site</h1>
        <p className="mb-2">
          This is a simple blog site built with React, Express, MongoDB, and Tailwind CSS.
        </p>
        <p>
          Here you can read the latest posts, share your thoughts, and connect with other readers!
        </p>
      </section>
      <section>
        <h2 className="font-semibold text-2xl mb-4 text-blue-700">Recent Posts</h2>
        {blogs.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <ul className="space-y-4">
            {blogs.slice().reverse().slice(0, 4).map(blog => ( // Display only the first 4 blogs
              <li key={blog._id}
                className="group border-2 p-4 rounded shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:border-blue-500"
                onClick={() => navigate(`/posts/${slugify(blog.title)}`)}>
                <h3 className="font-bold text-xl shadow-lg mb-2 transition-colors duration-300 group-hover:text-blue-600">{blog.title}</h3>
                {/* <p className="text-gray-700 text-justify">{blog.content.slice(0, 500)}...</p> */}
                <div className="text-gray-700 text-justify"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(blog.content).slice(0, 100) + '...'
                  }}
                ></div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

export default Home
