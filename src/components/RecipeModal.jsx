import React from 'react'

function IngredientList({ details }) {
  if (!details) return null
  const items = []
  for (let i = 1; i <= 20; i++) {
    const ing = details[`strIngredient${i}`]
    const measure = details[`strMeasure${i}`]
    if (ing && ing.trim()) items.push(`${ing} — ${measure ?? ''}`)
  }
  return (
    <ul className="list-disc list-inside space-y-1">
      {items.map((it, idx) => <li key={idx}>{it}</li>)}
    </ul>
  )
}

export default function RecipeModal({ details, loading, onClose, isFav, onToggleFav }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      <div className="relative max-w-3xl w-full bg-white rounded-lg shadow-lg overflow-auto max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold">{details?.strMeal ?? 'Loading...'}</h3>
          <div className="flex items-center gap-2">
            <button onClick={onToggleFav} className={`px-3 py-1 rounded ${isFav ? 'bg-yellow-300' : 'bg-gray-100'}`}>
              {isFav ? '★ Favorited' : '☆ Favorite'}
            </button>
            <button onClick={onClose} className="text-gray-600 px-3 py-1">Close</button>
          </div>
        </div>

        <div className="p-4">
          {loading && <div className="py-8 text-center">Loading details...</div>}

          {!loading && details && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <img src={details.strMealThumb} alt={details.strMeal} className="w-full rounded-md" />
                <div className="mt-3 text-sm text-gray-600">
                  <div><strong>Category:</strong> {details.strCategory}</div>
                  <div><strong>Area:</strong> {details.strArea}</div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h4 className="font-semibold mb-2">Ingredients</h4>
                <IngredientList details={details} />

                <h4 className="font-semibold mt-4 mb-2">Instructions</h4>
                <p className="whitespace-pre-line text-sm text-gray-700">{details.strInstructions}</p>

                {details.strSource && (
                  <div className="mt-4">
                    <a href={details.strSource} target="_blank" rel="noreferrer" className="text-rose-600 underline">Original source</a>
                  </div>
                )}

                {details.strYoutube && (
                  <div className="mt-4">
                    <a href={details.strYoutube} target="_blank" rel="noreferrer" className="text-rose-600 underline">Watch on YouTube</a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
