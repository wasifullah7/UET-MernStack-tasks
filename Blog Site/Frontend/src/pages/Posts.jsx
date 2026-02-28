import React from 'react'
import { useNavigate } from 'react-router-dom';

const Posts = ({blogs, slugify}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = React.useState(1);
  const postsPerPage = 5; // Number of posts to display per page
  const totalPosts = blogs.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const startindex = (currentPage - 1) * postsPerPage;
  const endindex = startindex + postsPerPage;

  const handlepage = (page) => {
    setCurrentPage(page); // Update the current page state
  }
  const handlenext = () => {
      setCurrentPage((value)=> value + 1);
  }
  const handleprevious = () => {
      setCurrentPage((value)=> value - 1);
  }


  return (
      <div className="max-w-3xl mx-auto p-4">
      <section>
        <h2 className="font-semibold text-2xl mb-4 text-blue-700">All Posts</h2>
        {blogs.length === 0 ? (
          <p>No posts yet.</p>
        ) : (
          <div className=''>
            <ul className="space-y-4">
              {blogs.slice(startindex, endindex).map(blog => ( // Display only the first 4 blogs
                <li key={blog._id} 
                    className="group border-2 p-4 rounded shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:border-blue-500"
                    onClick={() => navigate(`/posts/${slugify(blog.title)}`)}>
                  <h3 className="font-bold text-xl shadow-lg mb-2 transition-colors duration-300 group-hover:text-blue-600">{blog.title}</h3>
                  <p className="text-gray-700 text-justify">{blog.content.slice(0, 500)}...</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-center items-center gap-2">
              <button
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:border-blue-600'
                }`}
                onClick={handleprevious}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => handlepage(idx + 1)}
                  className={`px-3 py-1 rounded-lg border transition-colors duration-200 ${
                    currentPage === idx + 1
                      ? 'bg-blue-700 text-white border-blue-700 font-bold'
                      : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-100'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:border-blue-600'
                }`}
                onClick={handlenext}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default Posts