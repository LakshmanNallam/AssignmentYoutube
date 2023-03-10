import React from 'react'

const context = React.createContext({
  videosList: [],
  toggleTheme: () => {},
  SaveCliked: () => {},
  removeVideoItem: () => {},
  currentSearchInput: '',
})

export default context
