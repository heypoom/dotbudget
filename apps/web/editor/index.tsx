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
    className="p-2 w-full text-white text-center cursor-pointer border-none rounded-none z-10 bg-darkgrey"
    onClick={onClick}
  >
    {children}
  </button>
)

export function Editor() {
  const [editor, setEditor] = useState<EditorPanels>('plan')

  const View = EditorComponents[editor]
  if (!View) return null

  const style = {
    background: '#202124',
    boxShadow: '1px 1px 10px rgba(0, 0, 0, 0.7)',
  }

  return (
    <div style={style}>
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
