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
   </div>   <div>

<img className='image' src={profile}/>
<p className='name'>Abhishek Dahal</p>
<p className='comment'>This is my comment.</p>     
</div>   <div>

<img className='image' src={profile}/>
<p className='name'>Abhishek Dahal</p>
<p className='comment'>This is my comment.</p>     
</div>   <div>

<img className='image' src={profile}/>
<p className='name'>Abhishek Dahal</p>
<p className='comment'>This is my comment.</p>     
</div>   <div>

<img className='image' src={profile}/>
<p className='name'>Abhishek Dahal</p>
<p className='comment'>This is my comment.</p>  <div style={{height:'10vh'}}></div></div>
<footer className='flex '> <input className='inputcomment ml-3 mb-3' type='text' />
        <div className='tohide'></div>
        <div className='send ml-3 mb-3'><IoSend style={{color:'aqua',height:'40px',width:'40px'}}/></div></footer>
       
        </div>  

 
    </div>
  )
}

export default CommentBox