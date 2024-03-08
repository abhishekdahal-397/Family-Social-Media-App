import React from "react";
import "./post.css";
import { useState } from "react";

import road from "../images/postimages/road.jpeg";

const Post = () => {
  const [likeColor, setLikeColor] = useState("white");
  const handleLikeColor = () => {
    if (likeColor === "white") {
      setLikeColor("#3b82f6");
    } else {
      setLikeColor("white");
    }
  };
  return (
    <div className=" post relative left-[20vw]">
      <div>
        <div>
          <div className="flex h-3 items-center  p-4 bg-white rounded-lg">
            <div className="usericon h-7 w-7 bg-gray-300 rounded-full"></div>
            <p className="text-lg font-semibold relative top-1">
              Abhishek Dahal
            </p>
          </div>
        </div>
        <h1 className="relative left-[60px] top-[5px] ">#caption</h1>
        <div className="post-photo my-3  bg-red-200 h-[80vh] w-[70vh] ml-4">
          <img src={road} className="post " alt="post" />
        </div>
        <div
          className="ml-auto 
        text-sm"
        >
          <div
            className="button-like"
            style={{ backgroundColor: `${likeColor}` }}
            onClick={handleLikeColor}
          >
            like
          </div>
          <div className="button-like">Comment</div>
          <div className="button-like">Share</div>
        </div>
        <div className="mt-4 w-full border-t pt-4">
          <div className="comments"></div>
        </div>
      </div>
    </div>
  );
};

export default Post;
