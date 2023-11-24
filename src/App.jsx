import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Form from './Form'
import Home from './Home'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route index element={<Home />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App