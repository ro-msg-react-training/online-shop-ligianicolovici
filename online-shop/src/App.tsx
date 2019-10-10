import React from 'react';
import './App.css';
import './productModeling/product.css';
import './productModeling/productList.css';
import PostData from './products.json';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import './App.sass';
import {  Switch, Route } from 'react-router';
import {BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import ShoppingCart from './components/ShoppingCart';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
library.add(faStroopwafel)

export interface IProduct{
  id:number;
  name:string;
  category:string;
  image:string;
  price:number;
  description:string;
}

interface IProps {
  data?: any
}
interface IState{
  itemsCart:IProduct[];
}
export default class App extends React.Component<IProps,IState>{
   products: IProduct[] = Object.values(PostData);
  constructor(props:IProps){
    super(props);
    this.state={
      itemsCart:[]
    }
  }
  changeStateArray(cartProducts:IProduct[]){
    this.setState({
        itemsCart:this.state.itemsCart.concat(cartProducts)
    });
  }
 
  render(){
  return (
    <Router>
          <div className="App"> 
          <NavBar></NavBar>
              <Switch>
                  <Route path="/" exact render= {()=> <ProductList data={this.products}/>}/>
                  <Route path="/products" exact render= {()=> <ProductList data={this.products}/>}/>
                  {/* <Route path="/products/:id" exact render={() =><ProductDetails/> }/> */}
                  <Route path="/products/:id" exact render={(props) =><ProductDetails {...props} appSetArray={this.changeStateArray.bind(this)}/> }/>
                  <Route path="/cart" exact render={()=> <ShoppingCart data= {this.state.itemsCart}/>}/>
              </Switch>
            </div>
   </Router>

    
    );
  }
}


