import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <App role={window.role} team={window.teamnumber}/>,
  document.getElementById('app')
)