import React from "react";
import "./post.css";
import image from "../images/anuska.jpg";
const Post = () => {
  return (
    <div className=" post ">
      <div>
        <div>
          <div class="flex h-3 items-center  p-4 bg-white rounded-lg">
            <div class="usericon h-7 w-7 bg-gray-300 rounded-full"></div>
            <p class="text-lg font-semibold relative top-1">Anuska Karki</p>
          </div>
        </div>
        <h1 class="relative left-[60px] top-[5px] ">#caption</h1>
        <div class="post-photo my-3  bg-red-200 h-[60vh] w-[50vh] ml-4">
          <img src={image} class="post" alt="post" />
        </div>
        <div class="ml-auto space-x-4 text-gray-600">
          <div class="button-like">like</div>
          <div class="button-like">Comment</div>
          <div class="button-like">Share</div>
        </div>
        <div class="mt-4 w-full border-t pt-4">
          <div class="comments"></div>
        </div>
      </div>
    </div>
  );
};

export default Post;
