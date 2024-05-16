import React from 'react'
import profile from './beautifulgirl.jpg';
import "./CommentBox.css";
import { IoSend } from "react-icons/io5";
const CommentBox = () => {
  return (
    <div className='container'>
     <div className='commentBox'>
        <div>

            <img className='image' src={profile}/>
            <p className='name'>Abhishek Dahal</p>
<p className='comment'>This is my comment.</p>     
   </div>
        <input className='inputcomment' type='text' />
        <div className='send'><IoSend style={{color:'green',height:'40px',width:'40px'}}/></div>
        </div>   
    </div>
  )
}

export default CommentBox