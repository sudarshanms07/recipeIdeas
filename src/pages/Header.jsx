import React from 'react'
import { Search, Clock, Users, ChefHat, Star, Heart, Filter } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      {/* <header className="mt-6 mb-6">
        <h1 className="text-3xl font-bold">Recipe Ideas 🍳</h1>
        <p className="text-gray-600 mt-1">Enter an ingredient and get suggestions.</p>
      </header> */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChefHat className="w-8 h-8 text-orange-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                RecipeHub
              </h1>
            </div>
            
          </div>
          
        </div>
      </header>
    </div>
  )
}

export default Header
