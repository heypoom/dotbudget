import React from 'react'

export const App = () => (
  <main>
    <h1>Budgeting Planner</h1>
    <div className="max-w-sm mx-auto flex p-6 bg-white rounded-lg shadow-xl">
      <div className="flex-shrink-0 flex items-center justify-center text-2xl">
        <i className="fas fa-comments-alt"></i>
      </div>
      <div className="ml-6 pt-1">
        <h4 className="text-xl text-gray-900 leading-tight">ChitChat</h4>
        <p className="text-base text-gray-600 leading-normal">
          You have a new message.
        </p>
      </div>
    </div>
  </main>
)
