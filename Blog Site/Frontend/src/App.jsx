import { useState, useEffect } from 'react';
import axios from 'axios';
import Navigationbar from './components/Navigationbar';
import {Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import New from './pages/New';
import Posts from './pages/Posts';
import Post from './components/post';
import ScrolltoTop from './components/ScrolltoTop';


function App() {
  const [blogs, setBlogs] = useState([]);

  let getBlogs = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_Backend_BaseUrl}/blog/posts/`).then((response) => {
        setBlogs(response.data);
      })
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }
  useEffect(() => {
    getBlogs();
  }, []);

  const slugify = (title) => {
    return title
    .toLowerCase()
    .replace(/['’]/g, '') // Remove both straight and curly apostrophes
    .replace(/[^a-z0-9]+/g, '-')//
    .replace(/^-+|-+$/g, ''); //Removes all leading and trailing hyphens
  }

  return (
    <div className="">
        <Navigationbar />
        <ScrolltoTop />
        <div className='text-center border-blue-500 border-2 p-4 mx-60 my-5 rounded-lg'>
        <Routes>
          <Route path="/" element={<Home blogs={blogs} slugify={slugify} />} />
          <Route path="/posts" element={<Posts blogs={blogs} slugify={slugify}/>} />
          <Route path="/new" element={<New getBlogs={getBlogs}/>} />
          <Route path="/posts/:slug" element={<Post blogs={blogs} slugify={slugify}/>} />
          <Route path="/about" element={<About/>} />
        </Routes>
        </div>
    </div>
  )
}

export default App
