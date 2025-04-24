import React from "react";
import { Link } from "react-router-dom";
const Card = ({ data }) => {
  // console.log(data);
  return (
    <div className="flex gap-3">
        <div className="relative">
          <span className='absolute bottom-3 right-3 text-sm px-2 py-0.5 z-10 
          bg-gray-900 rounded-sm'>
            {data.videoDuration}
          </span>
          
        <Link to={`/watch/${data.videoId}`}>
        <img src={data.videoThumbnail} alt="ThumbNail" className="h-90 w-190 rounded-md hover:rounded-none" />
        </Link>        
        </div>
      <div className="flex gap-1 flex-col">
      <Link to={`/watch/${data.videoId}`}>
          <h3 className="max-w-2xl">
          
            <a href='#' className="line-clamp-2">
              {data.videoTitle}
            </a>
          </h3>
          <div className="text-xs text-gray-400">
            <div>
           
              <div>
                  <span className="after:content-['•'] after:mx-1">
                  {data.videoViews}
                  </span>
                  <span>
                  {data.videoAge}
                  </span>
              </div>
            </div>
          </div>
          </Link>
         <div className="min-w-fit my-2">
          <a href='#' className="flex items-center gap-2 text-xs text-gray-400">
            <img src={data.channelInfo.image}
            alt="channelImage"
            className="h-9 w-9 rounded-full"/>
            <span>{data.channelInfo.name}</span>
          </a>
         </div> 
        <div>
          <div className="max-w-2xl line-clamp-2 text-sm text-gray-400">
            <p>{data.videoDescription}</p>
          </div>
        </div>
    </div></div>
  );
};

export default Card;
