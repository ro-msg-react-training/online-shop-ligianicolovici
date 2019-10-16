import React from "react";
import "./App.css";
import "./productModeling/product.css";
import "./productModeling/productList.css";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import "./App.sass";
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import ShoppingCart from "./components/ShoppingCart";
import { IPropsApp, IStateApp, IProduct,ICartProduct } from "./model/Interfaces";

export default class App extends React.Component<IPropsApp, IStateApp> {
  componentDidMount() {
    fetch("http://localhost:4000/products")
      .then(response => response.json())
      .then(data => this.setState({ products: data }));
  }
  deleteItemFromCart=(productToDelete:IProduct)=>{
    let i:number;
    let cartAfterDelete:ICartProduct[]=[];
    for(i=0;i<this.state.itemsCart.length;i++){
      if(this.state.itemsCart[i].product.id!==productToDelete.id){
        cartAfterDelete.push(this.state.itemsCart[i]);
      }
    }
    this.setState({
      itemsCart:cartAfterDelete
    })
  }

  addProductsToCart(newCartProduct: IProduct) {
    let contor:number=0;
    let i:number;
    let productInCart:boolean=false;
    let cartItemToInsert:ICartProduct={}as any;
    for(i=0;i<this.state.itemsCart.length;i++){
      if(this.state.itemsCart[i].product.id===newCartProduct.id){
        contor=this.state.itemsCart[i].quantity;
        contor++;
        this.state.itemsCart[i].quantity=contor;
        productInCart=true;
        break;
      }
    }
    if(productInCart===false){
      contor=contor+1;
      cartItemToInsert.product=newCartProduct;
      cartItemToInsert.quantity=contor;
      this.setState({
        itemsCart: this.state.itemsCart.concat(cartItemToInsert)
      });
    }
  }
  removeProductFromList = (product: IProduct, productList:ICartProduct[]): ICartProduct[] => {
    let productsAfterDelete:ICartProduct[]=[];
     productList.map(item => {
      if(item.product.id!==product.id){
        productsAfterDelete.push(item);
      }
    }); 
    return productsAfterDelete;
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
      .then(() => {
        let crtCartProducts:ICartProduct[]= this.state.itemsCart;
        let i:number;
        if(crtCartProducts!=null){
          for(i=0;i<crtCartProducts.length;i++){
            if(crtCartProducts[i].product.id===productID){
              crtCartProducts=this.removeProductFromList(crtCartProducts[i].product,crtCartProducts);
            }
          }
          this.setState({
            itemsCart:crtCartProducts
          })
        }
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
              render={props => <ShoppingCart  {...props}data={this.state.itemsCart} onDeleteItemFromShopping={this.deleteItemFromCart.bind(this)} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
