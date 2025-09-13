import React, { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [val, setVal] = useState('')

  const submit = (e) => {
    e?.preventDefault()
    onSearch(val)
  }

  return (
    <form onSubmit={submit} className="w-full flex gap-2">
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Type an ingredient (e.g., chicken, tomato)"
        className="flex-1 border border-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-200"
        aria-label="ingredient"
      />
      <button
        type="submit"
        className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md"
      >
        Search
      </button>
    </form>
  )
}
