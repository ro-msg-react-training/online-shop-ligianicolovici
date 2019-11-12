import { IProduct } from "../model/Interfaces";
export const ADD_TO_CART = "ADD-TO-CART";
export const DELETE_PRODUCT = "DELETE-PRODUCT";
export const SHOW_POPUP = "SHOW-POPUP";
export const HIDE_POPUP = "HIDE-POPUP";
export const LOAD_PRODUCT = "LOAD-PRODUCT";
export const GET_SELECTED_PRODUCT = "GET-SELECTED-PRODUCT";
export const DELETE_CURRENT_PRODUCT = "DELETE-CURRENT-PRODUCT";
export const CHANGE_LOADING_INDICATOR="LOADING-INDICATOR"

export interface ProductOperations {
  type: typeof DELETE_PRODUCT;
  product: IProduct;
}
export interface ProductDisplay {
  type: typeof LOAD_PRODUCT;
  product: IProduct;
}
export interface ModalOn {
  type: string;
  message: string;
  title: string;
}
export interface FetchSelectedProduct {
  type: string;
  productID: number;
}
export interface FetchDeletedProduct {
  type: string;
  productID: number;
  isLoading:boolean;
}
export interface ModalOff {
  type: string;
}
export interface ChangeLoadingInd{
  type:string,
  isLoading:boolean;
}
export function loadProduct(data: IProduct): DetailsActions {
  return {
    type: LOAD_PRODUCT,
    product: data
  };
}

export function addToCart(product: IProduct): DetailsActions {
  return {
    type: ADD_TO_CART,
    product: product
  };
}
export function deleteProduct(product: IProduct): DetailsActions {
  return {
    type: DELETE_PRODUCT,
    product: product
  };
}
export function showThePopUp(message: string, title: string): DetailsActions {
  return {
    type: SHOW_POPUP,
    message: message,
    title: title
  };
}
export function hideThePopUp(): DetailsActions {
  return {
    type: HIDE_POPUP
  };
}

export function fetchSelected(id: number): FetchSelectedProduct {
  return {
    type: GET_SELECTED_PRODUCT,
    productID: id
  };
}

export function fetchDelete(id: number,loadingInd:boolean): FetchDeletedProduct {
  return {
    type: DELETE_CURRENT_PRODUCT,
    productID: id,
    isLoading:loadingInd
  };
}
export function changeLoadingIndicator(isLoading:boolean): ChangeLoadingInd {
  return {
    type: CHANGE_LOADING_INDICATOR,
    isLoading: isLoading,
  };
}
export type DetailsActions =
  | ProductOperations
  | ModalOn
  | ProductDisplay
  | ModalOff
  | FetchSelectedProduct
  |FetchDeletedProduct
  |ChangeLoadingInd;
