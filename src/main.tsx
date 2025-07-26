import { render } from 'preact';
import './index.css';
import { App } from './app.tsx';

const container = document.body.querySelector('#page');
if (container) {
  container.insertBefore(document.createElement('header'), container.firstChild);
  if (container.firstChild) {
    render(<App />, container.firstChild);
  }
}

