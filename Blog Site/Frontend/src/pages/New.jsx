import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const New = ({ getBlogs }) => {
  const [blog, setBlog] = useState({
    title: '',
    content: ''
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    const copyblog = { ...blog };
    copyblog[name] = value;
    setBlog(copyblog);
  }

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { title, content } = blog;
    if (!title || !content) {
      return toast.error('Please fill all the fields');
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_Backend_BaseUrl}/blog/posts/`, blog);
      if (response.status === 201) {
        toast.success('Blog post created successfully');
        setBlog({ title: '', content: '' }); // Reset the form
      }
      else {
        toast.error('Failed to create blog post');
      }
      getBlogs();
    }
    catch (error) {
      console.error("Error creating blog post:", error);
    }
  }

  return (
    <div>
      <section className="mt-8">
        <form action="" onSubmit={handlesubmit} className="max-w-3xl mx-auto p-4">
          <label htmlFor="">Title: </label>
          <input type="text" onChange={handlechange} name='title' value={blog.title} placeholder="Enter title" className="border p-2 rounded w-full mb-4" autoFocus />
          <label htmlFor="">Content: </label>
          <textarea onChange={handlechange} placeholder="Enter the contents"  name='content' value={blog.content} rows="8" className="border p-2 rounded w-full mb-4"></textarea>
          {/* <CKEditor
            editor={ClassicEditor}
            data={blog.content}
            onChange={(event, editor) => {
              const data = editor.getData();
              // setContent(data);
              handlechange({ target: { name: 'content', value: data } });
            }}
          /> */}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
        </form>
      </section>
      <ToastContainer />
    </div>
  )
}

export default New
