import React from 'react';
import ball from './ball.png';
import "./CommentBox.css";
import { IoSend } from "react-icons/io5";

const CommentBox = () => {
  return (                  
   <div className='h-[100vh] w-[100vw] bg-black flex justify-center items-center  relative'>
    <div className="centerContainer">                                        
      <div className='commentBox'>
         <div className='comments'>
        <div className=''>
          <img className='image' src={ball} alt="user" />
          <p className='name'>Abhishek Dahal</p>
          <p className='comment'>This is my comment.</p>
        </div>
        <div>
          <img className='image' src={ball} alt="user" />
          <p className='name'>Abhishek Dahal</p>
          <p className='comment'>This is my comment.</p>
        </div>
        <div>
          <img className='image' src={ball} alt="user" />
          <p className='name'>Abhishek Dahal</p>
          <p className='comment'>This is my comment.</p>
        </div>
        <div>
          <img className='image' src={ball} alt="user" />
          <p className='name'>Abhishek Dahal</p>
          <p className='comment'>This is my comment.</p>
        </div>
        <div>
          <img className='image' src={ball} alt="user" />
          <p className='name'>Abhishek Dahal</p>
          <p className='comment'>This is my comment.</p>
          <div style={{ height: '10vh' }}></div>
        </div></div>
        <footer className='flex'>
          <input
            className='inputcomment ml-3 mb-3 h-[10vw] w-[5vw] bg-red-500'
            type='text'
          />
          <div className='tohide'></div>
          <div className='send ml-3 mb-3'>
            <IoSend style={{ color: 'aqua', height: '40px', width: '40px' }} />
          </div>
        </footer>
      </div>
    </div></div>
  );
};

export default CommentBox;
