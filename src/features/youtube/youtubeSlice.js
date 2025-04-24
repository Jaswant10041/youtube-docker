import { createSlice } from "@reduxjs/toolkit";
import { getHomePageVideos } from "../../store/reducers/getHomePageVideos";
import { getSearchPageVideos } from "../../store/reducers/getSearchPageVideos";
import { getRecommendedVideos } from "../../store/reducers/getRecommendedVideos";
import { getVideoDetails } from "../../store/reducers/getVideoDetails";
import { getComments } from "../../store/reducers/getComments";
const initialState = {
    videos: [],
    currentPlaying: null,
    searchTerm:"",
    searchResults:[],
    nextPageToken:null,
    recommendedVideo:[],
    comments:[]
};


const youtubeSlice = createSlice({
    name:"youtubeApp",
    initialState,
    reducers:{
        clearVideos:(state)=>{
            state.videos=[];
            state.nextPageToken=null;
        },
        changeSearchTerm:(state,action)=>{
            state.searchTerm=action.payload;
            // console.log(state.searchTerm);
        },
        clearSearchTerm:(state)=>{
            state.searchTerm="";
        }
        
    },
    extraReducers:(builder) => {
        builder.addCase(getHomePageVideos.fulfilled,(state,action)=> {
            if(action.payload && action.payload.parsedData){
                state.videos=action.payload.parsedData;
                // console.log(state.videos);
                state.nextPageToken=action.payload.nextPageToken;
            }
        })
        builder.addCase(getSearchPageVideos.fulfilled,(state,action)=> {
            if(action.payload && action.payload.parsedData){
                state.videos=action.payload.parsedData;
                // console.log(state.videos);
                state.nextPageToken=action.payload.nextPageToken;
            }
        })
        builder.addCase(getRecommendedVideos.fulfilled,(state,action)=> {
            if(action.payload && action.payload.parsedData){
                state.recommendedVideo=action.payload.parsedData;
                // console.log(state.videos);
                // state.nextPageToken=action.payload.nextPageToken;
            }
        })
        builder.addCase(getVideoDetails.fulfilled,(state,action)=> {
            if(action.payload && action.payload.currentPlaying){
                state.currentPlaying=action.payload.currentPlaying;
            }
        })
        builder.addCase(getComments.fulfilled,(state,action)=> {
            if(action.payload){
                state.comments=action.payload;
            }
        })
    }
})

export const {clearVideos,changeSearchTerm,clearSearchTerm}=youtubeSlice.actions;
export default youtubeSlice.reducer;