import { createAsyncThunk } from "@reduxjs/toolkit";

// import parseRecommendedData from "../../utils/parseRecommendedData";
// const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
import parseVideoDetails from "../../utils/parseVideoDetails";
const API_KEY = 'AIzaSyAeH33tM24lLbrl5fzrWqpec0w0-E3jWJA';
const baseURL = 'https://youtube.googleapis.com/youtube/v3';

export const getVideoDetails = createAsyncThunk(
    "youtube/App/VideoDetails",
    async(id) => {
        const url = `${baseURL}/videos?part=snippet,statistics&key=${API_KEY}&id=${id}`;
        const response = await fetch(url);
        const data = await response.json();
        const items=data.items;
        // const {
        //     data:{items},
        // }=await axios.get(`${baseURL}/videos?key=${API_KEY}&part=snippet,statistics&type=video&id=${id}`);
        // const items=data.items;
        // console.log(nextPageTokenFromState);
        
        console.log(items);
        return {currentPlaying:await parseVideoDetails(items[0])};
    }
)
