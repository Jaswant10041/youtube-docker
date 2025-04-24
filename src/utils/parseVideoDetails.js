import React from 'react'
import convertRawtoString from './convertRawtoString';
import timeSince from './timeSince';
const API_KEY = 'AIzaSyAeH33tM24lLbrl5fzrWqpec0w0-E3jWJA';
const baseURL = 'https://youtube.googleapis.com/youtube/v3';
const parseVideoDetails=async(item)=>{
    const url2=`${baseURL}/channels?part=snippet,statistics&id=${item.snippet.channelId}&key=${API_KEY}`;
    // console.log("Hello");
    const response2 = await fetch(url2);
    const data2 = await response2.json();
    const items2=data2.items;
    const snippet=item.snippet;
    const id=item.id;
    const statistics=item.statistics;
    // console.log("hi");
    // console.log(items2)
    const stat=items2[0].statistics
    const subscriber=stat.subscriberCount;
    // console.log(subscriber);
    const channelImage=snippet.thumbnails.default.url;
    const data={
                    videoId:id,
                    videoTitle:snippet.channelTitle,
                    videoDescription:snippet.title,
                    channelInfo:{
                        id:snippet.channelId,
                        image:channelImage,
                        name:snippet.channelTitle,
                        subscribers:convertRawtoString(subscriber,true)
                    },
                    videoComments:convertRawtoString(
                        statistics.commentCount
                    ),
                    videoViews:convertRawtoString(
                        statistics.viewCount
                    ),
                    videoLikes:convertRawtoString(
                        statistics.likeCount
                    ),
                    videoAge:timeSince(new Date(snippet.publishedAt))
    }
    
    return data;
}
export default parseVideoDetails;
