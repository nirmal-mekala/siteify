import { render } from 'preact'
import './index.css'
import { App } from './app.tsx'

const container = document.body.querySelector('#container')

// add a div to the body as the first child
container.insertBefore(
  document.createElement('header'),
  container.firstChild
)

render(<App />, container.firstChild)
