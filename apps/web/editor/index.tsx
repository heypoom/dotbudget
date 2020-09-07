import React, {useState} from 'react'

import {PlanEditor} from './PlanEditor'
import {SpendingEditor} from './SpendingEditor'

const panels = ['plan', 'spend'] as const
type EditorPanels = typeof panels[number]

const EditorComponents: Record<EditorPanels, React.FC> = {
  plan: PlanEditor,
  spend: SpendingEditor,
}

interface TabProps {
  onClick: () => void
}

const Tab: React.FC<TabProps> = ({children, onClick}) => (
  <button
    className="p-2 w-full bg-black text-white text-center cursor-pointer border-none rounded-none shadow-lg z-10"
    onClick={onClick}
  >
    {children}
  </button>
)

export function Editor() {
  const [editor, setEditor] = useState<EditorPanels>('plan')

  const View = EditorComponents[editor]
  if (!View) return null

  return (
    <div>
      <div className="flex">
        {panels.map(p => (
          <Tab onClick={() => setEditor(p)} key={p}>
            {p}
          </Tab>
        ))}
      </div>

      <View />
    </div>
  )
}
