import React from 'react'
import './index.css'
import Watch from './pages/Watch'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Search from './pages/Search'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/watch/:id' element={<Watch/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
