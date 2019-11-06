import React from "react";
import { IProduct, ProductImagesUrls } from "../../model/Interfaces";
import { Link } from "react-router-dom";
export interface IDumbProdList {
  productList: IProduct[];
  isLoading: boolean;
  defaultImg: string;
}
export const ProductListView = (props: IDumbProdList) => {
  if (props.isLoading) {
    return <p>Loading ....</p>;
  }
  let products = [...props.productList].map((productt, key) => (
    <Link to={`/products/${productt.id}`}>
      <div className="product">
        <h1 className="subtitle is-2">{productt.name}</h1>
        <p className="subtitle is-3">{"~" + productt.category + "~"}</p>
        <img
          src={
            ProductImagesUrls[productt.id]
              ? ProductImagesUrls[productt.id].image
              : props.defaultImg
          }
          alt="product"
        />
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
};
