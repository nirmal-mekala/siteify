import { render } from 'preact';
import './index.css';
import { App } from './app.tsx';

const container = document.body.querySelector('#page');

container.insertBefore(document.createElement('hr'), container.firstChild);
container.insertBefore(document.createElement('header'), container.firstChild);

render(<App />, container.firstChild);
