import React from 'react'
import  parseVideoDuration  from './parseVideoDuration';
import convertRawtoString from './convertRawtoString';
import timeSince from './timeSince';
const API_KEY = 'AIzaSyAeH33tM24lLbrl5fzrWqpec0w0-E3jWJA';
const baseURL = 'https://youtube.googleapis.com/youtube/v3';
const parseData =async(items) => {
    try{
        const videoIds=[];
        const channelIds=[];
        items.forEach((item)=>{
            channelIds.push(item.snippet.channelId);
            videoIds.push(item.id);
        });
        // console.log("items is");
        // console.log(items);

        const response1=await fetch(`${baseURL}/channels?part=snippet,contentDetails&id=${channelIds.join(",")}&key=${API_KEY}`);
        const {items:channelsData}=await response1.json();
        // console.log("channelsData is");
        // console.log(channelsData);

        const parsedChannelsData=[];
        
        channelsData.forEach((channel)=>parsedChannelsData.push({
            id:channel.id,
            image:channel.snippet.thumbnails.default.url,
        }));
        // console.log("parsedChannelsData is");
        // console.log(parsedChannelsData);
        const response2=await fetch(`${baseURL}/videos?part=contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`);
        const {items:videosData}=await response2.json();
        // console.log("videosData is");
        // console.log(videosData);
        const parseData=[];
        items.forEach((item,index)=>{
            const {image:channelImage}=parsedChannelsData.find((data)=>data.id===item.snippet.channelId);
            if(channelImage){
                parseData.push({
                    videoId:item.id,
                    videoTitle:item.snippet.title,
                    videoDescription:item.snippet.description,
                    videoThumbnail:item.snippet.thumbnails.medium.url,
                    videoLink:`https://www.youtube.com/watch?v=${item.id.videoId}`,
                    channelInfo:{
                        id:item.snippet.channelId,
                        image:channelImage,
                        name:item.snippet.channelTitle
                    },
                    videoDuration:parseVideoDuration(
                        videosData[index].contentDetails.duration
                    ),
                    videoViews:convertRawtoString(
                        videosData[index].statistics.viewCount
                    ),
                    videoAge:timeSince(new Date(item.snippet.publishedAt))
                });
                // console.log(parseData);
            }
        });
        return parseData;
    }
    catch(err){
        console.log(err); 
    }
  return (
    <div>
      
    </div>
  )
}

export default parseData;
