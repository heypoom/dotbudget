import {monaco} from '@monaco-editor/react'

import {initVimMode} from './vim'
import {DraculaTheme} from './dracula.theme'

type StatusbarRef = React.MutableRefObject<HTMLDivElement | null>

export async function setupMonaco(statusbarRef: StatusbarRef) {
  const instance = await monaco.init()
  console.log('Monaco Instance:', {instance})

  // Setup the Dracula Theme
  instance.editor.defineTheme('dracula', DraculaTheme)
  instance.editor.setTheme('dracula')

  // Setup vim mode
  initVimMode(instance.editor, statusbarRef)

  console.log('Monaco set up!')
}
