// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAppSelector } from "../hooks/useApp";
// import { getVideoDetails } from "../store/reducers/getVideoDetails";
// import { getRecommendedVideos } from "../store/reducers/getRecommendedVideos";
// import Navbar from "../components/Navbar";
// const Watch = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const currentPlaying = useAppSelector(
//     (state) => state.youtubeApp.currentPlaying
//   );
//   const recommendedVideo = useAppSelector(
//     (state) => state.youtubeApp.recommendedVideo
//   );
//   console.log(currentPlaying);
//   useEffect(() => {
//     if (id) {
//       dispatch(getVideoDetails(id));
//     } else {
//       navigate("/");
//     }
//   }, [id, navigate, dispatch]);

//   useEffect(() => {
//     if (currentPlaying && id) dispatch(getRecommendedVideos(id));
//   }, [currentPlaying, dispatch, id]);

//   return (
//     <>
//       {currentPlaying && currentPlaying.videoId === id && (
//         <div className="max-h-screen">
//           <div>
//             <div style={{ height: "7.5vh" }}>
//               <Navbar />
//             </div>
//           <div className="flex">
//             <div>
//                 <div>
//                     <div>
//                       <iframe
//                         src={`https://www.youtube.com/embed/${id}?autoplay=1`}
//                         frameBorder="0"
//                         width="800"
//                         height="502"
//                         allowfullscreen
//                         title="Youtube Player"
//                       ></iframe>
//                     </div>
//                     <div>
//                         <h1 className="line-clamp-1 overflow-hidden">{currentPlaying.videoDescription}</h1>
//                         <div>
//                           <img
//                             src={currentPlaying.channelInfo.image}
//                             alt={currentPlaying.channelInfo.name}
//                           />
//                           <div>
//                             <h2>{currentPlaying.channelInfo.name}</h2>
//                             <button>Subscribe</button>
//                           </div>
//                         </div>
//                         <div>
//                           <span>{currentPlaying.videoViews} views</span>
//                           <span>•</span>
//                           <span>{currentPlaying.videoAge}</span>
//                         </div>
//                         <div>
//                           <button>Like</button>
//                           <button>Share</button>
//                           <span>{currentPlaying.videoLikes} likes</span>
//                         </div>
//                         <div>
//                           <h3>{currentPlaying.videoComments} Comments</h3>
//                         </div>
//                     </div>
//               </div>
//           </div>

//           <div>
//             <h2>Recommended Videos</h2>
//             {recommendedVideo.map((video) => (
//               <div key={video.videoId}>
//                 <img src={video.channelInfo.image} alt="videoImage" />
//                 <h3>{video.videoTitle}</h3>
//                 <p>{video.channelInfo.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//       )}
//     </>
//   );
// };

// export default Watch;
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getComments } from "../store/reducers/getComments";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/useApp";
import { getVideoDetails } from "../store/reducers/getVideoDetails";
import { getRecommendedVideos } from "../store/reducers/getRecommendedVideos";
import Navbar from "../components/Navbar";
import { FiThumbsUp } from "react-icons/fi";
const Watch = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPlaying = useAppSelector(
    (state) => state.youtubeApp.currentPlaying
  );
  const recommendedVideo = useAppSelector(
    (state) => state.youtubeApp.recommendedVideo
  );
  console.log(recommendedVideo);
  const comments=useAppSelector((state)=>state.youtubeApp.comments)
  useEffect(() => {
    if (id) {
      dispatch(getVideoDetails(id));
      dispatch(getComments(id));
    } else {
      navigate("/");
    }
  }, [id, navigate, dispatch]);

  useEffect(() => {
    if (currentPlaying && id) dispatch(getRecommendedVideos(id));
  }, [currentPlaying, dispatch, id]);

  return (
    <>
      {currentPlaying && currentPlaying.videoId === id && (
        <div className="max-h-screen flex flex-col">
          <div className="h-7.5vh opacity-95 sticky top-0">
            <Navbar />
          </div>
          <div className="grid grid-cols-[60%_40%] gap-4">
            <div className="overflow-y-auto ml-10">
              <div>
                <iframe
                  src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                  frameBorder="0"
                  width="854px"
                  height="480px"
                  allowFullScreen
                  title="Youtube Player"
                ></iframe>
              </div>
              <div className="p-4 flex flex-col">
                <div>
                  <h1 className="line-clamp-1 overflow-hidden">
                    {currentPlaying.videoDescription}
                  </h1>
                </div>
                  <div className="flex mt-4">
                    <div>
                      <img
                        src={currentPlaying.channelInfo.image}
                        alt={currentPlaying.channelInfo.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </div>
                    <div flex flex-col>
                      <div className="font-bold px-2">
                        {currentPlaying.channelInfo.name}
                      </div>
                      <div className="text-sm pl-2">{currentPlaying.channelInfo.subscribers} subscribers</div>
                    </div>
                    <div>
                      <button className="bg-white text-black px-4 h-8 w-50 py-2 pb-8 rounded-full text-center hover:bg-slate-200">
                        Subscribe
                      </button>
                    </div>
                    <div className="flex ml-80">
                    <div>
                      <button className="bg-zinc-800 flex text-white px-4 py-2 rounded-3xl ml-2 hover:bg-zinc-600">
                      <div>{currentPlaying.videoLikes}</div>
                      <div className="pl-2 pt-1">{<FiThumbsUp />}</div>
                      </button>
                    </div>
                    <div className="ml-6">
                        <button className="bg-zinc-800 text-white px-4 py-2 rounded-3xl hover:bg-zinc-600">
                          Share
                        </button>
                    </div>
                  </div>
                    
                </div>

              <div>
                    
                <div className="mt-4">
                  {/* <span>{currentPlaying.videoLikes} likes</span> */}
                  <span className="">{currentPlaying.videoViews} views </span>
                  <span className="pl-6">{currentPlaying.videoAge} ago</span>
                </div>

                
              </div>
              <div className="mt-4">
                <div className="mt-4">
                  <h3>{currentPlaying.videoComments} Comments</h3>
                </div>
                {comments.map((comment) => (
                  <div key={comment.commentId} className="flex mt-2">
                    <img
                      src={comment.userProfileImage}
                      alt={comment.userName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="ml-4">
                      <h4 className="font-bold">{comment.userName}</h4>
                      <p>{comment.commentText}</p>
                      <span>{comment.commentLikes} likes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
            <div className="overflow-y-auto p-2 mr-10">
              <h2 className="font-bold mb-4">Recommended Videos</h2>
              {recommendedVideo.map((video) => (
                <Link to={`/watch/${video.videoId}`} key={video.videoId}>
                <div className="grid grid-cols-[1fr_2fr] gap-1 mb-4">
                  <div className="relative">
                    <span className="absolute bottom-3 right-1 text-sm px-1 py-0.5 z-10 bg-gray-800 rounded-md">
                      {video.videoDuration}
                    </span>
                    <img
                      src={video.channelInfo.image}
                      alt={video.videoTitle}
                      className="rounded-xl w-full h-full overflow-clip"
                    />
                  </div>
                  <div className="ml-4 flex flex-col">
                  <h3 className="font-bold line-clamp-2">{video.videoTitle}</h3>
                    <div className="flex py-2">
                      <img src={video.channelInfo.image}
                        alt="channelImage"
                        className="h-9 w-9 rounded-full"/>
                        
                        <p className="text-sm text-gray-500 pt-2 pl-2">{video.channelInfo.name}</p>
                    </div>
                    
                    
                    <div className="text-sm text-gray-500">
                      <span className="after:content-['•'] after:mx-1">{video.videoViews} views</span>
                      <span>{video.videoAge}</span>
                    </div>
                  </div>
                </div>
                </Link>
                
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Watch;
