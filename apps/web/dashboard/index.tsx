import React from 'react'

import {BudgetGrid} from './BudgetGrid'
import {InputModeIndicator} from './InputModeIndicator'

import {Editor} from '../editor'
import {CommandPalette} from '../command-palette'

const DesktopUI = () => (
  <div className="flex">
    <div className="w-8/12 relative">
      <BudgetGrid />
      <CommandPalette />

      <InputModeIndicator />
    </div>

    <div className="w-4/12">
      <Editor />
    </div>
  </div>
)

export const Dashboard = () => {
  return (
    <main className="bg-darker h-screen">
      <div>
        <DesktopUI />
      </div>
    </main>
  )
}
