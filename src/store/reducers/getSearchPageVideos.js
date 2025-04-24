import { createAsyncThunk } from "@reduxjs/toolkit";

import parseSearchPageVideos from "../../utils/parseSearchPageVideos"
// const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const API_KEY = 'AIzaSyAeH33tM24lLbrl5fzrWqpec0w0-E3jWJA';
const baseURL = 'https://youtube.googleapis.com/youtube/v3';

export const getSearchPageVideos = createAsyncThunk(
    "youtube/App/searchPageVideos",
    async(isNext,{getState}) => {
        const {
            youtubeApp : {nextPageToken : nextPageTokenFromState,videos,searchTerm},
        } = getState();
        console.log(searchTerm);
        const url = `${baseURL}/search?q=${searchTerm}&part=snippet,id&key=${API_KEY}&${isNext ? `pageToken=${nextPageTokenFromState}` : ""}`;
        const response = await fetch(url);
        const data = await response.json();
        const items=data.items;
        console.log(items);
        const newnextPageToken=data.nextPageToken;
        const parsedData=await parseSearchPageVideos(items);
        console.log(parsedData);
        
        return {parsedData:[...videos,...parsedData],nextPageToken:newnextPageToken}
    }
)