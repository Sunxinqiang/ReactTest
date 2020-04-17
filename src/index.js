import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calculator from './Calculator'

// ========================================


function App () {
  return (
    <div>
      <Calculator/>
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
