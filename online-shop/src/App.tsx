import React from 'react';
import './App.css';
import ProductList, { ProductDetails } from './Product'

const App: React.FC = () => {
  return (
    <div className="App">
        {/* <ProductDetails/> */}
        <ProductList/>     
    </div>
  );
}

export default App;
