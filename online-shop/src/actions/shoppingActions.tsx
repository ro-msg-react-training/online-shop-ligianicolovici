import { IProduct, ICartProduct } from "../model/Interfaces";
export const INCREASE_QUANTITY = "INCREASE-QUANTITY";
export const DELETE_PRODUCT_FROM_CART = "DELETE-PRODUCT-FROM-CART";
export const DECREASE_QUANTITY = "DECREASE-QUANTITY";
export const CHECK_OUT = "CHECK-OUT";
export const LOAD_CART = "LOAD-CART";
export const HIDE_POPUP = "HIDE-POPUP";
export const SEND_ORDER = "SEND-ORDER";

export interface EraseItem {
  type: typeof DELETE_PRODUCT_FROM_CART;
  product: IProduct;
}
export interface QuantityUP {
  type: typeof INCREASE_QUANTITY;
  product: IProduct;
}
export interface QuantityDown {
  type: typeof DECREASE_QUANTITY;
  product: IProduct;
}

export interface CheckOut {
  type: typeof CHECK_OUT;
  cartProducts: ICartProduct[];
  modalText: string;
  modalTitle: string;
}

export interface LoadCart {
  type: typeof LOAD_CART;
  product: IProduct;
}
export interface ModalOff {
  type: string;
}

export interface FetchOrder {
  type: typeof SEND_ORDER;
  modalTitle: string;
  modalText: string;
  cartProducts: ICartProduct[];
  json: string;
}

export function hideThePopUp(): CartActions {
  return {
    type: HIDE_POPUP
  };
}

export function eraseItem(data: IProduct): CartActions {
  return {
    type: DELETE_PRODUCT_FROM_CART,
    product: data
  };
}

export function checkOut(
  cartProducts: ICartProduct[],
  modalText: string,
  modalTitle: string
): CartActions {
  return {
    type: CHECK_OUT,
    cartProducts: cartProducts,
    modalText: modalText,
    modalTitle: modalTitle
  };
}
export function loadCart(product: IProduct): CartActions {
  return {
    type: LOAD_CART,
    product: product
  };
}
export function quantityUp(product: IProduct): CartActions {
  return {
    type: INCREASE_QUANTITY,
    product: product
  };
}
export function quantityDown(product: IProduct): CartActions {
  return {
    type: DECREASE_QUANTITY,
    product: product
  };
}
export function fetchOrder(
  cartItems: ICartProduct[],
  msg: string,
  title: string,
  json: string
): CartActions {
  return {
    type: SEND_ORDER,
    cartProducts: cartItems,
    modalText: msg,
    modalTitle: title,
    json: json
  };
}
export type CartActions =
  | EraseItem
  | QuantityUP
  | QuantityDown
  | CheckOut
  | LoadCart
  | ModalOff
  | FetchOrder;
