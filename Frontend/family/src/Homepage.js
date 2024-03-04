// HomePage.jsclassclass

import React, { useState } from "react";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [posts, setPosts] = useState([
    { id: 1, username: "user1", content: "This is a post!" },
    { id: 2, username: "user2", content: "Another post here." },
    // Add more posts as needed
  ]);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4">Home Page</h2>

      <div>
        {posts.map((post) => (
          <div key={post.id} className="border rounded-md p-4 mb-4">
            <p className="text-xl font-semibold mb-2">{post.username}</p>
            <p className="text-gray-700">{post.content}</p>
          </div>
        ))}
      </div>
      <Link to="/login">
        {" "}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Login
        </button>
      </Link>
      <Link to="/register">
        {" "}
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Register
        </button>
      </Link>
    </div>
  );
};

export default HomePage;
