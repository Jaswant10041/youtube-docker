import { createAsyncThunk } from "@reduxjs/toolkit";
import parseRecommendedData from "../../utils/parseRecommendedData";
// const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const API_KEY = 'AIzaSyAeH33tM24lLbrl5fzrWqpec0w0-E3jWJA';
const baseURL = 'https://youtube.googleapis.com/youtube/v3';

export const getRecommendedVideos = createAsyncThunk(
    "youtube/App/RecommendedVideos",
    async(videoId,{getState}) => {
        const {
            youtubeApp : {currentPlaying:{channelInfo:{id:channelId}}},
        } = getState();

        // const url = `${baseURL}/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=20&key=${API_KEY}`;
        
        try {
            const url = `${baseURL}/activities?part=snippet,contentDetails&channelId=${channelId}&maxResults=20&type=video&videoId=${videoId}&key=${API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            const items = data.items;
            console.log("items1: ");
            console.log(items);
            const videoIds = items.filter(item=> item.contentDetails && item.contentDetails.playlistItem && item.contentDetails.playlistItem.resourceId && item.contentDetails.playlistItem.resourceId.videoId)
            .map(item => item.contentDetails.playlistItem.resourceId.videoId).join(',');
            // console.log(videoIds);
            // Fetch video details
            const detailsUrl = `${baseURL}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${API_KEY}`;
            const detailsResponse = await fetch(detailsUrl);
            const detailsData = await detailsResponse.json();
            const items2 = detailsData.items;
            console.log("items2: ");
            console.log(items2)
            const parsedData = await parseRecommendedData(items2, videoId);

            return { parsedData };
            // return "";
        } catch (error) {
            console.error('Error fetching recommended videos:', error);
            throw error; // Let the thunk handle the error
        }
    }
)