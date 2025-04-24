import { createAsyncThunk } from "@reduxjs/toolkit";
import parseData from "../../utils/parseData";
// const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const API_KEY = 'AIzaSyAeH33tM24lLbrl5fzrWqpec0w0-E3jWJA';
const baseURL = 'https://youtube.googleapis.com/youtube/v3';

export const getHomePageVideos = createAsyncThunk(
    "youtube/App/homePageVideos",
    async(isNext,{getState}) => {
        const {
            youtubeApp : {nextPageToken : nextPageTokenFromState,videos},
        } = getState();

        // const url = `${baseURL}/search?part=snippet&maxResults=20&q="Vikram"&key=${API_KEY}&${isNext ? `pageToken=${nextPageTokenFromState}` : ""}`;
        const url = `${baseURL}/videos?part=snippet&chart=mostPopular&maxResults=20&regionCode=US&key=${API_KEY}&${
            isNext ? `pageToken=${nextPageTokenFromState}` : ""
        }`;
        const response = await fetch(url);
        const data = await response.json();
        const items=data.items;
        console.log(items);
        const newnextPageToken=data.nextPageToken;
        const parsedData=await parseData(items);
        // console.log(parsedData);
        
        return {parsedData:[...videos,...parsedData],nextPageToken:newnextPageToken}
    }
)