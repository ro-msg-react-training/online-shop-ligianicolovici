import React, { useState } from "react";
import "../../productModeling/product.css";
import {
  IProduct,
  ICartProduct,
} from "../../model/Interfaces";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingBasket, faEraser } from "@fortawesome/free-solid-svg-icons";
import { AppState } from "../../reducers/combine";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
  loadProduct,
  deleteProduct,
  showThePopUp,
  hideThePopUp,
  fetchSelected,
  fetchDelete,
  changeLoadingIndicator
} from "../../actions/productActions";
import { loadCart, eraseItem, switchLoading } from "../../actions/shoppingActions";
import { loadProducts } from "../../actions/productListActions";
import { displayProduct } from "../../actions/editActions";
import defaultImg from "../../default.jpg";
import { IDumbDetails, ProductDetailsView } from "./dumbDetails";
import { number } from "prop-types";
import { lifecycle, compose } from "recompose";
import { withLoading } from "../HOCS/LoaderHOC";

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
  fetchDelete: (id: number,loadingInd:boolean)=> void;
  isLoading:boolean;
  switchLoading:()=>void;
}
const onComponentDidMount = lifecycle<ProductDetailsProps, {}, {}>({
  componentDidMount() {
    this.props.fetchSelected(this.props.match.params.id);
  }
});
class ProductDetails extends React.Component<ProductDetailsProps, LocalState> {
  constructor(props: ProductDetailsProps) {
    super(props);
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
    this.props.fetchDelete(productToErase.id,!this.props.isLoading);
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
      this.props.addToCart(product);
      this.props.switchLoading.bind(this);
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

  render() {
    let dumbData: IDumbDetails = {
      data: this.props.data,
      handleAdd: this.openModel.bind(this),
      handleDelete: this.openModel.bind(this),
      handleEdit: this.props.transferProductToEdit.bind(this),
      closeModal: () => this.closeModel.bind(this),
      deleteItem: () => this.deleteItem.bind(this),
      defaultImg: defaultImg,
      messagePopUp: this.props.messagePopUp,
      titlePopUp: this.props.titlePopUp,
      showModal: this.props.showModel
    };
    return <ProductDetailsView {...dumbData} />;
  }
}
const mapStateToProps = (state: AppState, myOwnState: LocalState) => ({
  prodReducer: state.product.selectedProduct,
  onAddProduct: myOwnState.onAddProduct,
  onDeleteProduct: myOwnState.onDeleteProduct,
  match: myOwnState.match,
  data: state.product.selectedProduct,
  showModel: state.product.showModel,
  messagePopUp: state.product.messagePopUp,
  titlePopUp: state.product.titlePopUp,
  productToDelete: state.product.productToDelete,
  crtCart: state.shoppingCart.cartProducts,
  isLoading:state.product.isLoading
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
  fetchDelete: (id: number,loadingInd:boolean) => dispatch(fetchDelete(id,loadingInd)),
  switchLoading:()=>dispatch(switchLoading()),
});

const ProductDetailsInitializer = compose<ProductDetailsProps, {}> (
  connect(
  mapStateToProps,
  mapDispatchToProps
),
onComponentDidMount,
withLoading
)
(ProductDetails);
export default ProductDetailsInitializer;
