import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";
import { fetchRecipesByIngredient, fetchRecipeDetails } from "../services/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selected, setSelected] = useState(null);
  const [details, setDetails] = useState(null);

  const search = async (ingredient) => {
    if (!ingredient?.trim()) {
      setError("Please enter an ingredient");
      return;
    }
    setQuery(ingredient);
    setLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const data = await fetchRecipesByIngredient(ingredient);
      if (data.length === 0) {
        setError(`No recipes found for "${ingredient}"`);
      } else {
        setRecipes(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openDetails = async (id) => {
    setSelected(id);
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRecipeDetails(id);
      if (!data) {
        setError("Details not found");
      } else {
        setDetails(data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className=" text-center max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Amazing 
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Recipes </span>
        </h2>
       
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find the perfect recipe for any occasion. From quick weeknight dinners to impressive weekend treats.
        </p>

        <div className="mb-6">
          <SearchBar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"  onSearch={search} />
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
          {recipes.map((r) => (
            <RecipeCard key={r.idMeal} recipe={r} onOpen={() => openDetails(r.idMeal)} />
          ))}
        </div>
      )}

      {!loading && !error && recipes.length === 0 && query && (
        <div className="text-center text-gray-500 p-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-16 w-16 mb-4 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg font-medium">Sorry, no recipes match your search.</p>
          <p className="mt-2 text-sm">Try searching for a different ingredient.</p>
        </div>
      )}

      {selected && (
        <RecipeModal
          details={details}
          loading={loading}
          onClose={() => {
            setSelected(null);
            setDetails(null);
          }}
        />
      )}
    </main>
  );
}
