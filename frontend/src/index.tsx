import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import './base.css';

ReactDOM.render(
  <StrictMode>
    <Routes />
  </StrictMode>,
  document.getElementById('root'),
);
