import React from "react";
import { Link } from "react-router-dom";
const Card = ({ data }) => {
  // console.log(data);
  return (
    <div className="w-540 h-360 flex gap-3 flex-col">
      <div className="relative">
        <span
          className="absolute bottom-3 right-3 text-sm px-1 py-0.5 z-10 
          bg-gray-800 rounded-md"
        >
          {data.videoDuration}
        </span>
        <Link to={`/watch/${data.videoId}`}>
        <img src={data.videoThumbnail} alt="ThumbNail" className="w-full h-full rounded-xl hover:rounded-none" />
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="min-w-fit">
          <a href="#">
            <img
              src={data.channelInfo.image}
              alt="channel image"
              className="h-9 w-9 rounded-full"
            />
          </a>
        </div>
        <div>
          <h3>
            <a href="#" className="line-clamp-2">
              {data.videoTitle}
            </a>
          </h3>
          <div className="text-sm text-gray-400">
            <div>
              <a href="#" className="hover:text-white">
                {data.channelInfo.name}
              </a>
            </div>
            <div>
              <span className="after:content-['•'] after:mx-1">
                {data.videoViews} views
              </span>
              <span>{data.videoAge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
