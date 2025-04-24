import React from 'react'

const timeSince = (date) => {
    // console.log();
    let seconds=Math.floor((new Date().valueOf()-date.valueOf())/1000);
    // console.log(seconds+" before years");
    let years=seconds/31536000;
    // console.log(`${years} and ${second}`);
    if(years>0){
        years=Math.floor(years);
        return years+" years";
    }
    seconds=seconds-years*31536000;
    // console.log(seconds+" before months");
    let months=seconds/2592000;
    if(months>0){
        months=Math.floor(months);
        return months+" months";
    }
    seconds=seconds-months*2592000;
    // console.log(seconds+" before days");
    let days=seconds/86400;
    if(days>0){
        days=Math.floor(days);
        return days+" days";
    }
    seconds=seconds-days*86400;
    // console.log(seconds+" before hours");
    let hours=seconds/3600;
    if(hours>0){
        hours=Math.floor(hours);
        return hours+" hours";
    }
    seconds=seconds-hours*3600;
    // console.log(seconds+" before minutes");
    let minutes=seconds/60;
    if(minutes>0){
        minutes=Math.floor(minutes);
        return minutes+" minutes";
    }
    seconds=seconds-minutes*60;
    // console.log(seconds+" final seconds");
    return seconds+" seconds";
}

export default timeSince
