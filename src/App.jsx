import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'

function App() {
  const handleSearch = (val) =>{
    alert('search for: ' + val)
  }
  return (
     <div className="min-h-screen p-6">
      <header className="max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">Recipe Ideas 🍳</h1>
        <p className="text-gray-600 mt-1">Search recipes by ingredient.</p>
      </header>

      <main className="max-w-4xl mx-auto">
        <SearchBar onSearch={handleSearch} />
      </main>
    </div>
  )
}

export default App
