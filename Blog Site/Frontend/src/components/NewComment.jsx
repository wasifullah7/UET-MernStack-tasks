import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const NewComment = ({blogId, getComments}) => {
    const [comment, setComment] = React.useState({
        username: '',
        content: ''
    });

    const handlechange = (e) => {
        const {name, value} = e.target;
        const copycomment = {...comment};
        copycomment[name] = value;
        setComment(copycomment);
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        const { username, content } = comment;
        if (!username || !content) {
            return toast.error('Please fill all the fields');
        }
        try{
            const response = await axios.post(`${import.meta.env.VITE_Backend_BaseUrl}/blog/posts/${blogId}/comments/`, comment);
            if(response.status === 201) {
                toast.success('Comment created successfully');
                setComment({ username: '', content: '' }); // Reset the form
            }
            else {
                toast.error('Failed to create comment');
            }
            getComments(); // Refresh comments after submission
        }
        catch (error) {
            console.error('Failed to create comment', error);
        }
    }
    return (
    <form
        onSubmit={handlesubmit}
        className="bg-gray-50 rounded-lg shadow p-6 mb-6 flex flex-col gap-4 max-w-2xl mx-auto"
    >
        <h3 className="text-xl font-semibold text-blue-700 mb-2">Add a Comment</h3>
        <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Name
        </label>
        <input
            type="text"
            id="username"
            name="username"
            value={comment.username}
            onChange={handlechange}
            placeholder="Your name"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="off"
        />
        </div>
        <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Comment
        </label>
        <textarea
            id="content"
            name="content"
            rows={4}
            value={comment.content}
            onChange={handlechange}
            placeholder="Write your comment here..."
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />
        </div>
        <button
        type="submit"
        className="self-end bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
        >
        Post Comment
        </button>
        <ToastContainer />
    </form>
    )
}

export default NewComment
