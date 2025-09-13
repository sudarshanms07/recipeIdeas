import React from 'react'
import Home from './pages/Home'
import Header from './pages/Header'

const App = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50'>
      <Header />
      <Home />
    </div>
  )
}

export default App
