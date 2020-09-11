import {monaco} from '@monaco-editor/react'

import {DraculaTheme} from './dracula.theme'

export async function setupMonaco() {
  const instance = await monaco.init()

  instance.editor.defineTheme('dracula', DraculaTheme)
  instance.editor.setTheme('dracula')
}
