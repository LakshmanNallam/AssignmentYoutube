import React from 'react'

const context = React.createContext({
  videosList: [],
  isDarkTheme: false,
  toggleTheme: () => {},
  SaveCliked: () => {},
  removeVideoItem: () => {},
  currentSearchInput: '',
})

export default context
