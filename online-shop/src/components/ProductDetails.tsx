import React from "react";
import "../productModeling/product.css";
import { IProduct, ICartProduct, ProductImagesUrls } from "../model/Interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingBasket, faEraser } from "@fortawesome/free-solid-svg-icons";
import { ModalPopUp } from "./ModalPopUp";
import { AppState } from "../reducers/combine";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
  loadProduct,
  deleteProduct,
  showThePopUp,
  hideThePopUp,
  fetchSelected,
  fetchDelete
} from "../actions/productActions";
import { loadCart, eraseItem } from "../actions/shoppingActions";
import { loadProducts } from "../actions/productListActions";
import { displayProduct } from "../actions/editActions";
import { Link } from "react-router-dom";
import defaultImg from "../default.jpg";

library.add(faShoppingBasket, faEraser);

export interface LocalState {
  match?: any;
  onAddProduct?: any;
  onDeleteProduct?: any;
}

interface ProductDetailsProps {
  data: IProduct;
  match?: any;
  onAddProduct?: any;
  onDeleteProduct?: any;
  loadProduct: (data: IProduct) => void;
  showModel: boolean;
  messagePopUp: string;
  titlePopUp: string;
  productToDelete: IProduct;
  addToCart: (product: IProduct) => void;
  deleteProduct: (product: IProduct) => void;
  fetchSelected: (id: number) => void;
  showThePopUp: (message: string, title: string) => void;
  hideThePopUp: () => void;
  reloadProductList: (newList: IProduct[]) => void;
  deleteProductFromCart: (product: IProduct) => void;
  transferProductToEdit: (product: IProduct, msg: string) => void;
  crtCart: ICartProduct[];
  fetchDelete: (id: number) => void;
}

class ProductDetails extends React.Component<ProductDetailsProps> {
  productID: number;
  constructor(props: ProductDetailsProps) {
    super(props);
    this.productID = this.props.match.params.id;
  }

  callLoadProduct() {
    this.props.fetchSelected(this.productID);
  }
  componentDidMount() {
    this.callLoadProduct();
  }

  deleteProduct(productID: number) {
    this.props.onDeleteProduct(productID);
    if (this.props.showModel === true) {
      this.openModel({} as any, "delete");
    } else {
      this.closeModel();
    }
  }

  deleteItem(productToErase: IProduct) {
    this.props.fetchDelete(productToErase.id);
    this.props.hideThePopUp();
    this.props.deleteProductFromCart(productToErase);
  }

  closeModel = () => {
    this.props.hideThePopUp();
  };
  openModel = (product: IProduct, action: string) => {
    let messagePopUp;
    let titlePopUp;
    if (action === "add") {
      messagePopUp =
        "Product " + product.name + " was succesfully added to the cart!";
      titlePopUp = "Cart insertion confirmation";
      this.props.showThePopUp(messagePopUp, titlePopUp);
    } else if (action === "delete") {
      messagePopUp = "Are you sure you want to delete this product?";
      titlePopUp = "Delete product";
      this.props.showThePopUp(messagePopUp, titlePopUp);
    }
  };
  addToCart(product: IProduct) {
    this.props.addToCart(product);
    this.openModel(product, "add");
  }

  render() {
    return (
      <div className="contentDetails">
        <div className="productDetails">
          <br />
          <h1 className="subtitle is-2">{this.props.data.name}</h1>
          <p className="subtitle is-3">
            {"~" + this.props.data.category + "~"}
          </p>
          <img
            src={
              ProductImagesUrls[this.props.data.id]
                ? ProductImagesUrls[this.props.data.id].image
                : defaultImg
            }
            alt="product"
            className="productPic"
          />
          <h2>{"Product ID:" + this.props.data.id}</h2>
          <div>
            <text>{this.props.data.description}</text>
          </div>
          <span>{"Price: " + this.props.data.price + "$"}</span>
          <br />
          <br></br>
          <a
            className="button is-danger is-outlined"
            onClick={() => this.addToCart(this.props.data)}
          >
            <span>Add</span>
            <span className="icon is-small">
              <FontAwesomeIcon icon="shopping-basket" />
            </span>
          </a>

          <a
            className="button is-primary is-outlined"
            onClick={() => this.openModel(this.props.data, "delete")}
          >
            <span>Delete</span>
            <span className="icon is-small">
              <FontAwesomeIcon icon="eraser" />
            </span>
          </a>

          <Link to="/edit">
            <a
              className="button is-warning is-outlined"
              onClick={() =>
                this.props.transferProductToEdit(this.props.data, "edit")
              }
            >
              <span>Edit</span>
              <span className="icon is-small">
                <FontAwesomeIcon icon="eraser" />
              </span>
            </a>
          </Link>

          <br />
        </div>
        <ModalPopUp
          data={this.props.messagePopUp}
          title={this.props.titlePopUp}
          active={this.props.showModel}
          onClosing={this.closeModel.bind(this)}
          onDeleteProduct={this.deleteItem.bind(this)}
          productToDelete={this.props.data}
        ></ModalPopUp>
      </div>
    );
  }
}
const mapStateToProps = (state: AppState, myOwnState: LocalState) => ({
  prodReducer: state.prodReducer.selectedProduct,
  onAddProduct: myOwnState.onAddProduct,
  onDeleteProduct: myOwnState.onDeleteProduct,
  match: myOwnState.match,
  data: state.prodReducer.selectedProduct,
  showModel: state.prodReducer.showModel,
  messagePopUp: state.prodReducer.messagePopUp,
  titlePopUp: state.prodReducer.titlePopUp,
  productToDelete: state.prodReducer.productToDelete,
  crtCart: state.shoppingReducer.cartProducts
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteProductFromCart: (itemToDelete: IProduct) =>
    dispatch(eraseItem(itemToDelete)),
  reloadProductList: (newList: IProduct[]) =>
    dispatch(loadProducts(newList, false)),
  loadProduct: (data: IProduct) => dispatch(loadProduct(data)),
  addToCart: (product: IProduct) => dispatch(loadCart(product)),
  deleteProduct: (product: IProduct) => dispatch(deleteProduct(product)),
  showThePopUp: (message: string, title: string) =>
    dispatch(showThePopUp(message, title)),
  hideThePopUp: () => dispatch(hideThePopUp()),
  transferProductToEdit: (product: IProduct, msg: string) =>
    dispatch(displayProduct(product, msg)),
  fetchSelected: (id: number) => dispatch(fetchSelected(id)),
  fetchDelete: (id: number) => dispatch(fetchDelete(id))
});

const ProductDetailsInitializer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetails);
export default ProductDetailsInitializer;
