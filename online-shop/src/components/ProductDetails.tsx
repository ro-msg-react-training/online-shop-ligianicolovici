import React from "react";
import "../productModeling/product.css";
import { IProduct, IPropsDetails, IStateDetails } from "../model/Interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Redirect } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingBasket, faEraser } from "@fortawesome/free-solid-svg-icons";
import { ModalPopUp } from "./ModalPopUp";

library.add(faShoppingBasket, faEraser);

export default class ProductDetails extends React.Component<IPropsDetails> {
  productID: number;

  componentDidMount() {
    fetch("http://localhost:4000/products/" + this.productID)
      .then(response => response.json())
      .then(data => this.setState({ selectedProduct: data }));
  }

  deleteProduct(productID: number) {
    this.props.onDeleteProduct(productID)
    if (this.state.showModel === false) {
      this.openModel({} as any, "delete");
    } else {
      
      this.closeModel();
    }
  }

  state: IStateDetails;
  constructor(props: IPropsDetails) {
    super(props);
    this.productID = this.props.match.params.id;
    this.state = {
      selectedProduct: {} as any,
      dataToExport: {} as any,
      showModel: false,
      messagePopUp: "",
      titlePopUp: "",
      productToDelete:{} as any
    };
  }
  closeModel = () => {
    if (this.state.showModel === true) {
      this.setState({
        showModel: false
      });
    }
  };
  openModel = (product: IProduct, action: string) => {
    if (this.state.showModel === false) {
      this.setState({
        showModel: true
      });
    }
    if (action === "add") {
      this.setState({
        messagePopUp:
          "Product " + product.name + " was succesfully added to the cart!",
        titlePopUp: "Cart insertion confirmation"
        
      });
    } else if (action === "delete") {
      this.setState({
        messagePopUp: "Are you sure you want to delete this product?",
        titlePopUp: "Delete product",
        productToDelete: product
      });
    }
  };
  addToCart(product: IProduct) {
    this.state.dataToExport = product;
    this.setState(() => {
      return {
        dataToExport: this.state.dataToExport
      };
    });
    this.props.onAddProduct(this.state.dataToExport);
    this.openModel(product, "add");
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

          <a
            className="button is-primary is-outlined"
            onClick={() => this.openModel(this.state.selectedProduct,"delete")}
          >
            <span>Delete</span>
            <span className="icon is-small">
              <FontAwesomeIcon icon="eraser" />
            </span>
          </a>

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
        <ModalPopUp
          data={this.state.messagePopUp}
          title={this.state.titlePopUp}
          active={this.state.showModel}
          onClosing={this.closeModel.bind(this)}
          onDeleteProduct={this.deleteProduct.bind(this)}
          productToDelete={this.state.productToDelete}
        ></ModalPopUp>
      </div>
    );
  }
}
