import React from 'react'
import c from 'classnames'

const categories = ['food', 'transportation', 'snacks']

const categoryEmoji = {
  food: '🍣',
  transportation: '🚆',
  snacks: '🍫',
}

interface BudgetCardProps {
  category: string
  amount: number

  isOverBudget?: boolean
}

function BudgetCardTitle(props: BudgetCardProps) {
  const baseClass =
    'rounded-tl-lg rounded-tr-lg px-5 py-1 text-white text-center md:text-left shadow-md z-10'

  if (props.isOverBudget) {
    return (
      <div className={c(baseClass, 'bg-gradient-red shadow-md-pink')}>
        Over Budget!
      </div>
    )
  }

  return (
    <div className={c(baseClass, 'bg-green shadow-md-green')}>
      {props.category}
    </div>
  )
}

const BudgetCard = (props: BudgetCardProps) => (
  <div className="mx-auto flex flex-col rounded-lg shadow-xl w-full">
    <BudgetCardTitle {...props} />

    <div className="p-4 px-6 bg-white rounded-bl-lg rounded-br-lg">
      <div className="text-3xl">{categoryEmoji[props.category]}</div>

      <div className="text-4xl">{props.amount || 0}</div>
    </div>
  </div>
)

export const App = () => (
  <main className="bg-gray-100 h-screen">
    <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 p-6">
      {categories.map(category => (
        <BudgetCard category={category} amount={50} key={category} />
      ))}
    </div>
  </main>
)
