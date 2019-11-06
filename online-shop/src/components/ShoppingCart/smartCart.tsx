import React from "react";
import "../../productModeling/shoppingcart.css";
import { IProduct, ICartProduct, IOrder } from "../../model/Interfaces";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { AppState } from "../../reducers/combine";
import { Dispatch } from "redux";
import {
  eraseItem,
  checkOut,
  quantityUp,
  quantityDown,
  hideThePopUp,
  fetchOrder
} from "../../actions/shoppingActions";
import { connect } from "react-redux";
import { CartContent, IDumbCart } from "./dumbCartContent";

library.add(faShoppingCart);

export interface LocalStateshop {
  onDeleteItemFromShopping?: any;
}
export interface IStateCart {
  json: string;
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
  state: IStateCart;
  constructor(props: CartProps) {
    super(props);
    let order: IOrder[] = this.createOrder([...this.props.data]);
    this.state = {
      json: `{"customer": "doej","products": ${JSON.stringify(order)}}`
    };
  }
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

  submitOrder = () => {
    this.props.fetchOrder(
      this.props.data,
      this.props.modalText,
      this.props.modalTitle,
      this.state.json
    );
  };
  closeModel = () => {
    this.props.hideThePopUp();
  };
  render() {
    let passToCart: IDumbCart = {
      data: this.props.data,
      quantityDown: this.props.quantityDown.bind(this),
      quantityUp: this.props.quantityUp.bind(this),
      eraseItem: this.props.eraseItem.bind(this),
      submitOrder: this.submitOrder.bind(this),
      hasProducts: this.props.hasProducts,
      closeModel: () => this.closeModel.bind(this),
      modalText: this.props.modalText,
      modalTitle: this.props.modalTitle,
      showModal: this.props.showModal
    };
    return <CartContent {...passToCart}></CartContent>;
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
