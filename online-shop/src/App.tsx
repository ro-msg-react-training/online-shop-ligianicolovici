import React from 'react';
import './App.css';
import './productModeling/product.css';
import './productModeling/productList.css';
import PostData from './products.json';
import ProductList from './productModeling/ProductList';
import ProductDetails from './productModeling/Product';

export interface IProduct{
  id:number;
  name:string;
  category:string;
  image:string;
  price:number;
  description:string;
}

const App: React.FC = () => {

  const products: IProduct[] = Object.values(PostData);
  console.log(products);
  //const product: IProduct = products[0];
  return (
    <div className="App"> 
     <ProductList data={products}/>
      <ProductDetails data={products[0]} />
     
    </div>
  );
}

export default App;
