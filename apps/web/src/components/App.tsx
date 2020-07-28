import React from 'react'

const categories = ['🍣', '🏠', '🚆', '🍫']

export const App = () => (
  <main>
    <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      {categories.map(category => (
        <div className="mx-auto flex flex-col bg-white rounded-lg shadow-xl w-full">
          <div className="bg-green-500 rounded-tl-lg rounded-tr-lg px-3 py-1 text-white">
            Under Budget!
          </div>

          <div className="p-4">
            <div className="text-3xl">{category}</div>

            <div className="text-4xl">500</div>
          </div>
        </div>
      ))}
    </div>
  </main>
)
