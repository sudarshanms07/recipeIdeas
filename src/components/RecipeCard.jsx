import React from 'react'

export default function RecipeCard({ recipe, onOpen }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-full h-44 object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg">{recipe.strMeal}</h3>
        <p className="text-sm text-gray-500 mt-1">Meal ID: {recipe.idMeal}</p>
        <div className="mt-3">
          <button
            onClick={() => onOpen?.(recipe.idMeal)}
            className="text-sm px-3 py-1 bg-rose-50 text-rose-700 rounded-md hover:bg-rose-100"
          >
            View
          </button>
        </div>
      </div>
    </div>
  )
}
