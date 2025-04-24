import { createAsyncThunk } from "@reduxjs/toolkit";

// import parseRecommendedData from "../../utils/parseRecommendedData";
// const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const API_KEY = 'AIzaSyAeH33tM24lLbrl5fzrWqpec0w0-E3jWJA';
const baseURL = 'https://youtube.googleapis.com/youtube/v3';

export const getComments = createAsyncThunk(
    "youtube/App/videoComments",
    async(id) => {
        const url = `${baseURL}/commentThreads?part=snippet&videoId=${id}&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        // const items=data.items;
        if (!response.ok) {
            throw new Error(data.error.message || 'Failed to fetch comments');
        }
        // console.log(data.items);
        const items = data.items.map((item) => ({
            commentId: item.id,
            userProfileImage: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
            userName: item.snippet.topLevelComment.snippet.authorDisplayName,
            commentText: item.snippet.topLevelComment.snippet.textOriginal,
            commentLikes: item.snippet.topLevelComment.snippet.likeCount,
        }));
        console.log(items);
        return items;
    }
)
