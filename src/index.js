import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';

import {AppContext, theme} from './appContext'

import ErrorBoundary from './ErrorBoundary'

import logLifeCycle from './logLifeCycle'


const FilterableProductTable = lazy(
  () => import('./FilterableProductTable').then(module => {
    return {
      default: logLifeCycle(module.default)
    }
  })
)
const Calculator = lazy(() => import('./Calculator'))
const Game = lazy(() => import('./Game'))

// ========================================

const productData = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
]

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      theme: theme.light
    }
  }
  render () {
    return (
      <ErrorBoundary>
        <AppContext.Provider value={this.state.theme}>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/">
                  <FilterableProductTable products={productData}/>
                </Route>
                <Route path="/c" component={Calculator}/>
                <Route path="/Game" component={Game}/>
              </Switch>
            </Suspense>
          </Router>
        </AppContext.Provider>
      </ErrorBoundary>
    )
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
