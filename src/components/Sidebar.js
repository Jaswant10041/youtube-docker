import React from 'react'
import { MdHomeFilled,MdSubscriptions,MdOutlineVideoLibrary,MdHistory,MdOutlineWatchLater, } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { LuThumbsUp } from "react-icons/lu";
const Sidebar = () => {
  const mainLinks=[
    {
      icon:<MdHomeFilled className='text-xl'/>,
      name:'Home'
    },
    {
      icon:<SiYoutubeshorts className='text-xl'/>,
      name:'Shorts'
    },
    {
      icon:<MdSubscriptions className='text-xl'/>,
      name:'Subscriptions'
    }
  ];
  const otherLinks=[
    {
      icon:<MdOutlineVideoLibrary />,
      name:'Library'
    },
    {
      icon:<MdHistory />,
      name:"History"
    },
    {
      icon:<MdOutlineWatchLater />,
      name:'Watch Later'
    },
    {
      icon:<LuThumbsUp />,
      name:"Liked Video"
    }
  ];

  return (
    <div className='w-1/4 bg-[#212121] pr-4 p-1 overflow-auto pb-8 h-screen'>
      <ul className='flex flex-col border-b-2 border-gray-700'>
        {
          mainLinks.map(({icon,name})=>{
              return <li key={name} className={`pl-6 py-3 rounded-xl hover:bg-zinc-700 ${name==="Home" ? "bg-zinc-700" : " "}`}>
              <a href='#' className='flex items-center gap-5'>
              {icon}
              <span className='text-sm tracking-wider'>{name}</span>
              </a>
              </li>
          })
        }
      </ul>
      <ul className='flex flex-col border-b-1 border-gray-800'>
        {
          otherLinks.map(({icon,name})=>{
              return <li key={name} className={`pl-6 py-3 rounded-xl hover:bg-zinc-700 ${name==="Home" ? "bg-zinc-700" : " "}`}>
              <a href='#' className='flex items-center gap-5'>
              {icon}
              <span className='text-sm tracking-wider'>{name}</span>
              </a>
              </li>
          })
        }
      </ul>
      
    </div>
  )
}

export default Sidebar
