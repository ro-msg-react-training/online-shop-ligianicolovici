import React from "react";
import "./App.css";
import "./productModeling/product.css";
import "./productModeling/productList.css";
import ProductList from "./components/ProductList/smartProductList";
import ProductDetails from "./components/Details/smartDetails";
import "./App.sass";
import { Switch, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar/smartBar";
import ShoppingCart from "./components/ShoppingCart/smartCart";
import AddProduct from "./components/ProductManagement/smartProductManagement";
import DetailsManagement from "./components/ProductManagement/smartProductManagement";
import { IPropsApp, IStateApp } from "./model/Interfaces";
import HighCharts from "./components/Highcharts/smartHighcharts";

export default class App extends React.Component<IPropsApp, IStateApp> {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar></NavBar>
          <Switch>
            <Route path="/" exact render={() => <ProductList />} />
            <Route path="/products" exact render={() => <ProductList />} />
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
              render={props => <AddProduct {...props}></AddProduct>}
            />
            <Route path="/chart" render={() => <HighCharts></HighCharts>} />
          </Switch>
        </div>
      </Router>
    );
  }
}
