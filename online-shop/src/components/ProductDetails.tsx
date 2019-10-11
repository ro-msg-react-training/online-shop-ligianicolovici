import React from "react";
import "../productModeling/product.css";
import { IProduct, IPropsDetails, IStateDetails } from "../model/Interfaces";
import PostData from "../products.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingBasket, faEraser } from "@fortawesome/free-solid-svg-icons";

library.add(faShoppingBasket, faEraser);

export default class ProductDetails extends React.Component<IPropsDetails> {
  productID: number;

  componentDidMount() {
    fetch("http://localhost:4000/products/" + this.productID)
      .then(response => response.json())
      .then(data => this.setState({ selectedProduct: data }));
  }

  deleteProduct(productID: number) {
    this.props.onDeleteProduct(productID);
  }

  state: IStateDetails;
  constructor(props: IPropsDetails) {
    super(props);
    this.productID = this.props.match.params.id;
    this.state = {
      selectedProduct: {} as any,
      dataToExport: {} as any
    };
  }

  addToCart(product: IProduct) {
    this.state.dataToExport = product;
    this.setState(() => {
      return {
        dataToExport: this.state.dataToExport
      };
    });
    this.props.onAddProduct(this.state.dataToExport);
  }

  render() {
    return (
      <div className="contentDetails">
        <div className="productDetails">
          <br />
          <a
            className="button is-danger is-outlined"
            onClick={() => this.addToCart(this.state.selectedProduct)}
          >
            <span>Add</span>
            <span className="icon is-small">
              <FontAwesomeIcon icon="shopping-basket" />
            </span>
          </a>
          <Link to="/products">
            <a
              className="button is-primary is-outlined"
              onClick={() => this.deleteProduct(this.state.selectedProduct.id)}
            >
              <span>Delete</span>
              <span className="icon is-small">
                <FontAwesomeIcon icon="eraser" />
              </span>
            </a>
          </Link>
          <br />
          <h1 className="subtitle is-2">{this.state.selectedProduct.name}</h1>
          <p className="subtitle is-3">
            {"~" + this.state.selectedProduct.category + "~"}
          </p>
          <img
            src={this.state.selectedProduct.image}
            alt="product"
            className="productPic"
          />
          <h2>{"Product ID:" + this.state.selectedProduct.id}</h2>
          <div>
            <text>{this.state.selectedProduct.description}</text>
          </div>
          <br />
          <span>{"Price: " + this.state.selectedProduct.price + "$"}</span>
        </div>
      </div>
    );
  }
}
