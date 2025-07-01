import axios from 'axios';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';

dayjs.extend(relativeTime);

const CommentBox = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { userId, username, profileUrl } = useSelector((state) => state.user);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/api/comments/getcomments/${postId}`);
        setComments(res.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await axios.post(`http://localhost:3002/api/comments/postcomments`, {
        content: newComment,
        postId,
        userId
      });

      setComments((prev) => [
        ...prev,
        {
          ...res.data,
          content: newComment,
          createdAt: new Date().toISOString(), // ✅ fix for timestamp
          userId: {
            username: username,
            profileUrl: profileUrl || "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg"
          }
        }
      ]);

      setNewComment(""); // Clear input
      inputRef.current?.focus(); // Refocus input
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className='h-[15vh] w-[17vw] ml-3 mt-2'>
      <div className='max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden'>
        <div className='p-4 max-h-[8vh] overflow-y-scroll'>
          {comments.map((comment) => (
            <div key={comment._id} className='flex items-start space-x-2 mb-4'>
              <img
                src={comment.userId?.profileUrl || "https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg"}
                alt='Profile'
                className='w-8 h-8 rounded-full border-2 border-blue-400'
              />
              <div className='flex-1'>
                <div className='flex items-center justify-between mb-1'>
                  <span className='text-sm font-semibold'>{comment.userId?.username}</span>
                  <span className='text-xs text-gray-500'>
                    {comment.createdAt ? dayjs(comment.createdAt).fromNow() : "just now"}
                  </span>
                </div>
                <p className='text-gray-700'>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input and Submit */}
      <div className="flex space-x-2 mt-2">
        <input
          type="text"
          placeholder="Type your comment..."
          value={newComment}
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition duration-200"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CommentBox;
