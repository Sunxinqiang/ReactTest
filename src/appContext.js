import React from 'react'

export const theme = {
  light: {
    color: '#ddd'
  },
  dark: {
    color: '#000'
  }
}
export const AppContext = React.createContext(theme.dark);
