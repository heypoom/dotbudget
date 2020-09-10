import React from 'react'

import {BudgetGrid} from './BudgetGrid'
import {InputModeIndicator} from './InputModeIndicator'

import {Editor} from '../editor'
import {CommandPalette} from '../command-palette'

export const Dashboard = () => {
  return (
    <main className="bg-darker h-screen">
      <div>
        <div className="flex">
          <div className="w-1/2 relative">
            <BudgetGrid />
            <CommandPalette />

            <InputModeIndicator />
          </div>

          <div className="w-1/2">
            <Editor />
          </div>
        </div>
      </div>
    </main>
  )
}
