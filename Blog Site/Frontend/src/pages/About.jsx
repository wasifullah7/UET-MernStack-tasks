import React from 'react'

const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">About This Blog</h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to our Blog Site! This platform is built with the MERN stack <i>(MongoDB, Express, React, and Node.js)</i> and styled with Tailwind CSS. Our goal is to provide a simple, clean, and interactive space for sharing ideas, stories, and knowledge.
      </p>
      <p className="text-gray-700 mb-4">
        Here, you can read the latest posts from our community, leave your thoughts in the comments, and connect with other readers. Whether you’re interested in technology, lifestyle, education, or just want to share your experiences, this blog is for you.
      </p>
      <p className="text-gray-700 mb-4">
        <strong>Features:</strong>
        <ul className="list-disc list-inside ml-4 mt-2 text-left">
          <li>Easy-to-use interface for reading and writing posts</li>
          <li>Comment system for engaging discussions</li>
          <li>Modern design with responsive layout</li>
          <li>Fast and secure backend powered by Node.js and MongoDB</li>
        </ul>
      </p>
      <p className="text-gray-700">
        Thank you for visiting! We hope you enjoy your time here. If you have any feedback or suggestions, feel free to reach out.
      </p>
    </div>
  )
}

export default About