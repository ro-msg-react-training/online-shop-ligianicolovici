import React from "react";
import "./App.css";
import "./productModeling/product.css";
import "./productModeling/productList.css";
import PostData from "./products.json";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import "./App.sass";
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import ShoppingCart from "./components/ShoppingCart";
import { IPropsApp, IStateApp, IProduct } from "./model/Interfaces";

export default class App extends React.Component<IPropsApp, IStateApp> {
  componentDidMount() {
    fetch("http://localhost:4000/products")
      .then(response => response.json())
      .then(data => this.setState({ products: data }));
  }

  addProductsToCart(newCartProduct: IProduct) {
    this.setState({
      itemsCart: this.state.itemsCart.concat(newCartProduct)
    });
  }
  deleteProduct(productID: number) {
    return fetch("http://localhost:4000/products/" + productID, {
      method: "delete"
    })
      .then(response => response.text())
      .then(() => {
        fetch("http://localhost:4000/products")
          .then(response => response.json())
          .then(data => this.setState({ products: data }));
      })
      .then(() => <Redirect to="/products"></Redirect>);
  }

  constructor(props: IPropsApp) {
    super(props);
    this.state = {
      itemsCart: [],
      products: []
    };
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar></NavBar>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <ProductList data={this.state.products} />}
            />
            <Route
              path="/products"
              exact
              render={() => <ProductList data={this.state.products} />}
            />
            <Route
              path="/products/:id"
              exact
              render={props => (
                <ProductDetails
                  {...props}
                  onAddProduct={this.addProductsToCart.bind(this)}
                  onDeleteProduct={this.deleteProduct.bind(this)}
                />
              )}
            />
            <Route
              path="/cart"
              exact
              render={() => <ShoppingCart data={this.state.itemsCart} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
