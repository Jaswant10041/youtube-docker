// utils/parseRecommendedData.js

import convertRawtoString from './convertRawtoString';
import timeSince from './timeSince';
import parseVideoDuration from './parseVideoDuration';
const parseRecommendedData = (items, currentVideoId) => {
    console.log("parseRecommended");
    console.log(items);
    return items.map(item => {
        const snippet = item.snippet;
        const id = item.id; // Extract videoId properly

        return {
            videoId: id,
            videoTitle: snippet.title,
            videoDescription: snippet.description,
            channelInfo: {
                id: snippet.channelId,
                name: snippet.channelTitle,
                image: snippet.thumbnails.default.url,
            },
            videoDuration:parseVideoDuration(item.contentDetails.duration),
            videoComments: convertRawtoString(item.statistics?.commentCount || 0),
            videoViews: convertRawtoString(item.statistics?.viewCount || 0),
            videoLikes: convertRawtoString(item.statistics?.likeCount || 0),
            videoAge: timeSince(new Date(snippet.publishedAt))
        };
    });
};

export default parseRecommendedData;
