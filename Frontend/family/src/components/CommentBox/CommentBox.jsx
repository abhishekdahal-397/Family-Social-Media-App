import React from 'react';

const comments = [
  {
    id: 1,
    name: 'John Doe',
    time: '2 hours ago',
    text: 'This is an example comment. It can be as long or short as needed, and it will be properly formatted.',
    profilePic: 'https://via.placeholder.com/50'
  },
  {
    id: 2,
    name: 'Jane Smith',
    time: '1 hour ago',
    text: 'Another example of a comment with different content and a different time. Comments will scroll if there are many.',
    profilePic: 'https://via.placeholder.com/50'
  },
  {
    id: 3,
    name: 'Jane Smith',
    time: '1 hour ago',
    text: 'Another example of a comment with different content and a different time. Comments will scroll if there are many.',
    profilePic: 'https://via.placeholder.com/50'
  },{
    id: 4,
    name: 'Jane Smith',
    time: '1 hour ago',
    text: 'Another example of a comment with different content and a different time. Comments will scroll if there are many.',
    profilePic: 'https://via.placeholder.com/50'
  },
  // Add more comments as needed
];

const CommentBox = () => {
  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center bg-gray-100'>
      <div className='max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden'>
        {/* Header */}
        <div className='bg-blue-400 p-4'>
          <h1 className='text-white text-xl font-semibold'>Comments</h1>
        </div>

        {/* Comment Section */}
        <div className='p-4 max-h-[60vh] overflow-y-scroll'>
          {comments.map(comment => (
            <div key={comment.id} className='flex items-start space-x-4 mb-4'>
              <img
                src={comment.profilePic}
                alt='Profile'
                className='w-12 h-12 rounded-full border-2 border-blue-400'
              />
              <div className='flex-1'>
                <div className='flex items-center justify-between mb-1'>
                  <span className='text-lg font-semibold'>{comment.name}</span>
                  <span className='text-sm text-gray-500'>{comment.time}</span>
                </div>
                <p className='text-gray-700'>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
