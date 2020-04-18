import React from 'react';
import './FilterableProductTable.css'
import {AppContext} from './appContext'
class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    let lastCategory = null;
    
    this.props.products.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    if (Math.random() > 0.5) {
      throw new Error('抛出个错误')
    }
    return (
      <AppContext.Consumer>
        {theme => (
          <form>
            <input
              type="text"
              placeholder="Search..."
              value={this.props.filterText}
              onChange={this.props.onInputChange}
            />
            <p>
              <input
                type="checkbox"
                onChange={this.props.onCheckboxChange}
                checked={this.props.isStockOnly}
              />
              {' '}
              <span style={theme}>Only show products in stock</span>
            </p>
          </form>
        )}
      </AppContext.Consumer>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filterText: '123',
      isStockOnly: false
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onCheckboxChange = this.onCheckboxChange.bind(this)
  }
  onInputChange (e) {
    this.setState({
      filterText: e.target.value
    })
  }
  onCheckboxChange (e) {
    this.setState({
      isStockOnly: e.target.checked
    })
  }
  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          isStockOnly={this.state.isStockOnly}
          onInputChange={this.onInputChange}
          onCheckboxChange={this.onCheckboxChange}
        />
        <ProductTable products={this.props.products} />
      </div>
    );
  }
}

export default FilterableProductTable