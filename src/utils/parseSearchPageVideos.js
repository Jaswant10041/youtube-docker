import React from 'react'
import  parseVideoDuration  from './parseVideoDuration';
import convertRawtoString from './convertRawtoString';
import timeSince from './timeSince';
const API_KEY = 'AIzaSyAeH33tM24lLbrl5fzrWqpec0w0-E3jWJA';
const baseURL = 'https://youtube.googleapis.com/youtube/v3';
const parseSearchPageVideos =async(items) => {
    try{
        // console.log(items);
        const videoIds=[];
        const channelIds=[];
        items.forEach((item)=>{
            channelIds.push(item.snippet.channelId);
            videoIds.push(item.id.videoId);
        });
        // console.log("items is");
        // console.log(items);

        const response1=await fetch(`${baseURL}/channels?part=snippet,contentDetails&id=${channelIds.join(",")}&key=${API_KEY}`);
        const {items:channelsData}=await response1.json();
        // console.log("channelsData is");
        

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
        let parseData=[];
        items.forEach((item,index)=>{
            const {image:channelImage}=parsedChannelsData.find((data)=>data.id===item.snippet.channelId);
            const videoData = videosData.find(video => video.id === item.id.videoId);
            if(channelImage && videoData){
                parseData.push({
                    videoId:item.id.videoId,
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
                        videoData.contentDetails.duration
                    ),
                    videoViews:convertRawtoString(
                        videoData.statistics.viewCount
                    ),
                    videoAge:timeSince(new Date(item.snippet.publishedAt))
                });
            }
            // console.log(parseData);
        });
        console.log(parseData);
        return parseData;
    }
    catch(err){
        console.log(err); 
    }
}

export default parseSearchPageVideos;
