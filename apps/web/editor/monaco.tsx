import {monaco} from '@monaco-editor/react'

import {DraculaTheme} from './themes'

export async function setupMonaco() {
  const instance = await monaco.init()
  console.log('Monaco Instance:', {instance})

  instance.editor.defineTheme('dracula', DraculaTheme)
  instance.editor.setTheme('dracula')

  console.log('Monaco set up!')
}
