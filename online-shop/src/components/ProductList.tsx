import React from "react";
import "../productModeling/productList.css";
import { IPropsProductList } from "../model/Interfaces";
import { Link } from "react-router-dom";
import { ProductImagesUrls } from "../model/Interfaces";

export class ProductList extends React.Component<IPropsProductList> {
  render() {
    let products = this.props.data.map((productt, key) => (
      <Link to={`/products/${productt.id}`}>
        <div className="product">
          <h1 className="subtitle is-2">{productt.name}</h1>
          <p className="subtitle is-3">{"~" + productt.category + "~"}</p>
          <img src={ProductImagesUrls[productt.id].image} alt="product" />
          <br></br>
          <span className="price-tag">{"Price: " + productt.price + "$"}</span>
        </div>
      </Link>
    ));
    return (
      <React.Fragment>
        <div id="content">
          <div className="products">{products}</div>
        </div>
      </React.Fragment>
    );
  }
}
export default ProductList;
