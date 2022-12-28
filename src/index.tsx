import React from 'react'
import ReactDOM from 'react-dom/client'
import Example from './Example'
export * from './exports'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Example />
  </React.StrictMode>,
)
