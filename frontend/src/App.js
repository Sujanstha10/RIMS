import React from 'react'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './components/dashboard/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard/home' element={<Home />} />
      </Routes>


    </div>
  )
}

export default App