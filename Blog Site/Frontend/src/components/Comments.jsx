import { useEffect, useState } from 'react';
import axios from 'axios';
import NewComment from './NewComment';

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([]);

  let getComments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_Backend_BaseUrl}/blog/posts/${blogId}/comments/`);
      if (response.status === 200) {
        setComments(response.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    getComments();
    // eslint-disable-next-line
  }, [blogId]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <section>
            <NewComment blogId={blogId} getComments={getComments}/>
        </section>
        <section>
            {comments.length === 0 ? (
            <p className="text-gray-500 text-left">No comments yet. Be the first to comment!</p>
            ) : (
            <ul className="space-y-4">
                {comments.map((comment) => (
                <li
                    key={comment._id}
                    className="flex items-start gap-4 bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                    {/* Avatar with initials */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-lg">
                    {comment.username ? comment.username[0].toUpperCase() : "?"}
                    </div>
                    <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-blue-700">{comment.username}</span>
                        {/* Optionally, add a timestamp here */}
                    </div>
                    <p className="text-gray-700 text-left">{comment.content}</p>
                    </div>
                </li>
                ))}
            </ul>
            )}
        </section>
    </div>
  );
};

export default Comments;