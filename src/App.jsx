import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import RecipeCard from './components/RecipeCard.jsx'
import RecipeModal from './components/RecipeModal.jsx'

const API_FILTER = 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
const API_LOOKUP = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='

export default function App() {
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [selected, setSelected] = useState(null) // selected recipe id
  const [details, setDetails] = useState(null)

  // Fetch recipe details when a recipe is selected
  useEffect(() => {
    if (!selected) {
      setDetails(null)
      return
    }

    const fetchDetails = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(API_LOOKUP + selected)
        const data = await res.json()
        if (data.meals && data.meals.length) {
          setDetails(data.meals[0])
        } else {
          setError('Details not found')
        }
      } catch (err) {
        setError('Failed to fetch recipe details')
      } finally {
        setLoading(false)
      }
    }
    fetchDetails()
  }, [selected])

  const search = async (ingredient) => {
    if (!ingredient?.trim()) {
      setError('Please enter an ingredient')
      return
    }
    setQuery(ingredient)
    setLoading(true)
    setError(null)
    setRecipes([])

    try {
      const res = await fetch(API_FILTER + encodeURIComponent(ingredient.trim()))
      const data = await res.json()
      if (!data.meals) {
        setRecipes([])
        setError(`No recipes found for "${ingredient}"`)
      } else {
        setRecipes(data.meals)
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6 font-sans antialiased">
      <div className="container mx-auto max-w-4xl pt-8">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight mb-2 leading-none">
            Find Your Next Meal
          </h1>
          <p className="text-lg text-gray-600">
            Discover delicious recipes by searching for an ingredient.
          </p>
        </header>

        <main>
          <div className="mb-10">
            <SearchBar onSearch={search} />
          </div>

          {loading && (
            <div className="py-12 flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-orange-500 border-dotted rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 font-medium">Cooking up some ideas...</p>
            </div>
          )}

          {error && !loading && (
            <div className="bg-rose-100 border-2 border-rose-300 text-rose-700 p-6 rounded-xl shadow-inner text-center font-medium">
              {error}
            </div>
          )}

          {!loading && recipes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map(r => (
                <RecipeCard
                  key={r.idMeal}
                  recipe={r}
                  onOpen={() => setSelected(r.idMeal)}
                />
              ))}
            </div>
          )}

          {!loading && !error && recipes.length === 0 && query && (
            <div className="text-center text-gray-500 p-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg font-medium">Sorry, no recipes match your search.</p>
              <p className="mt-2 text-sm">Try searching for a different ingredient.</p>
            </div>
          )}
        </main>

        {selected && (
          <RecipeModal
            details={details}
            loading={loading}
            onClose={() => { setSelected(null); setDetails(null); }}
          />
        )}
      </div>
    </div>
  )
}
