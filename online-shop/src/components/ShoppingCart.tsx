import React from "react";
import "../productModeling/shoppingcart.css";
import {
  IProduct,
  ICartProduct,
  IOrder,
  ProductImagesUrls
} from "../model/Interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { ModalPopUp } from "./ModalPopUp";
import { AppState } from "../reducers/combine";
import { Dispatch } from "redux";
import {
  eraseItem,
  checkOut,
  quantityUp,
  quantityDown,
  hideThePopUp,
  fetchOrder
} from "../actions/shoppingActions";
import { connect } from "react-redux";
import defaultImg from "../default.jpg";

library.add(faShoppingCart);

export interface LocalStateshop {
  onDeleteItemFromShopping?: any;
}
export interface CartProps {
  data: ICartProduct[];
  onDeleteItemFromShopping?: any;
  hasProducts: boolean;
  showModal: boolean;
  response: number;
  modalText: string;
  modalTitle: string;
  checkOut: (
    productsInCart: ICartProduct[],
    meesage: string,
    title: string
  ) => void;
  eraseItem: (product: IProduct) => void;
  quantityUp: (product: IProduct) => void;
  quantityDown: (product: IProduct) => void;
  hideThePopUp: () => void;
  fetchOrder: (
    productsInCart: ICartProduct[],
    message: string,
    title: string,
    json: string
  ) => void;
}

class ShoppingCart extends React.Component<CartProps> {
  popUpMsg: string = "Error";
  popUpTitle: string = "Order Status";

  createOrder = (crtCartItems: ICartProduct[]) => {
    let i: number;
    let productsToCheckout: IOrder[] = [];
    let itemReadyForCheckout: IOrder = {} as any;
    let crtProductId: number;
    let crtProductQuantity: number;

    for (i = 0; i < crtCartItems.length; i++) {
      crtProductId = crtCartItems[i].product.id;
      crtProductQuantity = crtCartItems[i].quantity;
      itemReadyForCheckout.productId = crtProductId;
      itemReadyForCheckout.quantity = crtProductQuantity;
      productsToCheckout.push(itemReadyForCheckout);
    }
    return productsToCheckout;
  };

  orderItem: IOrder[] = this.createOrder([...this.props.data]);
  json: string = `{"customer": "doej","products": ${JSON.stringify(
    this.orderItem
  )}}`;

  submitOrder = () => {
    this.props.fetchOrder(
      this.props.data,
      this.popUpMsg,
      this.popUpTitle,
      this.json
    );
  };
  closeModel = () => {
    this.props.hideThePopUp();
  };
  getTotalSum = () => {
    let i: number;
    let crtQuantity: number;
    let crtPrice: number;
    let totalSum: number = 0;
    for (i = 0; i < this.props.data.length; i++) {
      crtQuantity = this.props.data[i].quantity;
      crtPrice = this.props.data[i].product.price;
      totalSum = totalSum + crtQuantity * crtPrice;
    }
    return totalSum;
  };
  calculateTotalSumAndCheckout = () => {
    if (this.props.hasProducts === true) {
      return (
        <div className="checkoutSum">
          <div className="total-Sum">
            <h1 className="subtitle is-5">Total: {this.getTotalSum()} $</h1>
          </div>
          <div className="checkoutButton">
            <a
              className="button is-danger"
              id="showModal"
              onClick={() => {
                if (this.getTotalSum() > 0) {
                  this.submitOrder();
                }
              }}
            >
              Checkout
            </a>
          </div>
        </div>
      );
    }
  };

  render() {
    let productsFromCart: any;
    if (this.props.data.length > 0) {
      productsFromCart = this.props.data.map((productt, key) => (
        <div id="cartItem">
          <div className="column">
            <div id="cartItem-img">
              <img
                src={
                  ProductImagesUrls[productt.product.id]
                    ? ProductImagesUrls[productt.product.id].image
                    : defaultImg
                }
                id="product-img"
              ></img>
            </div>
          </div>
          <div className="column">
            <div id="cartItem-details">
              <div>
                <h1 className="title">Product: {productt.product.name}</h1>
              </div>
              <div>
                <p className="subtitle is-5">
                  Category: {productt.product.category}
                </p>
              </div>
              <br></br>
              <div>
                <p>Price: {productt.product.price} $</p>
              </div>
            </div>
          </div>
          <div className="column">
            <div id="cart-item-modifier">
              <div id="quantity">
                <div className="column">
                  <a
                    className="button is-primary is-outlined"
                    onClick={() => this.props.quantityDown(productt.product)}
                  >
                    -
                  </a>

                  <span className="button is-rounded">
                    {productt.quantity}{" "}
                  </span>

                  <a
                    className="button is-primary is-outlined"
                    onClick={() => this.props.quantityUp(productt.product)}
                  >
                    +
                  </a>
                </div>
              </div>
              <div id="deleteItem">
                <span
                  className="button is-danger"
                  onClick={() => this.props.eraseItem(productt.product)}
                >
                  Delete item
                </span>
              </div>
            </div>
          </div>
        </div>
      ));
    }
    return (
      <div className="content">
        <h1 className="subtitle is-3">
          Shopping cart
          <FontAwesomeIcon icon="shopping-cart" color="white" />
        </h1>
        <div className="cart-list">
          <div className="shoppingCart-Items">{productsFromCart}</div>
          {this.calculateTotalSumAndCheckout()}
        </div>
        <ModalPopUp
          data={this.props.modalText}
          title={this.props.modalTitle}
          active={this.props.showModal}
          onClosing={this.closeModel.bind(this)}
          productToDelete={{} as any}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, myOwnState: LocalStateshop) => ({
  onDeleteItemFromShopping: myOwnState.onDeleteItemFromShopping,
  hasProducts: state.shoppingReducer.hasProducts,
  data: state.shoppingReducer.cartProducts,
  showModal: state.shoppingReducer.showModal,
  response: state.shoppingReducer.responseFromBackend,
  modalText: state.shoppingReducer.modalText,
  modalTitle: state.shoppingReducer.modalTitle
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkOut: (productsInCart: ICartProduct[], message: string, title: string) =>
    dispatch(checkOut(productsInCart, message, title)),
  eraseItem: (product: IProduct) => dispatch(eraseItem(product)),
  quantityUp: (product: IProduct) => dispatch(quantityUp(product)),
  quantityDown: (product: IProduct) => dispatch(quantityDown(product)),
  hideThePopUp: () => dispatch(hideThePopUp()),
  fetchOrder: (
    productsInCart: ICartProduct[],
    message: string,
    title: string,
    json: string
  ) => dispatch(fetchOrder(productsInCart, message, title, json))
});

const ShoppingCartInitializer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);

export default ShoppingCartInitializer;
