import React from "react";
import "./App.css";
import "./productModeling/product.css";
import "./productModeling/productList.css";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import "./App.sass";
import { Switch, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import ShoppingCart from "./components/ShoppingCart";
import ProductInsertion from "./components/ProductInsertion";
import DetailsManagement from "./components/DetailsManagement";
import { IPropsApp, IStateApp } from "./model/Interfaces";

export default class App extends React.Component<IPropsApp, IStateApp> {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar></NavBar>
          <Switch>
            <Route
              path="/"
              exact
              render={props => <ProductList {...props} />}
            />
            <Route
              path="/products"
              exact
              render={props => <ProductList {...props} />}
            />
            <Route
              path="/products/:id"
              exact
              render={props => <ProductDetails {...props} />}
            />
            <Route
              path="/cart"
              exact
              render={() => (
                <ShoppingCart onDeleteItemFromShopping={""}></ShoppingCart>
              )}
            />
            <Route
              path="/edit"
              exact
              render={props => (
                <DetailsManagement {...props}></DetailsManagement>
              )}
            />
            <Route
              path="/add"
              exact
              render={props => <ProductInsertion {...props}></ProductInsertion>}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
