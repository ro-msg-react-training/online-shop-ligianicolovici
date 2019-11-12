import { IProduct } from "../model/Interfaces";
export const LOAD_PRODUCTS = "LOAD-PRODUCTS";
export const GET_PRODUCT_LIST = "GET-PRODUCT-LIST";
export const CHANGE_LOADING_STATUS="CHANGE_LOADING_STATUS";
export const DELETE_PRODUCT_FROM_UI="DELETE_PRODUCT_FROM_UI";
export const LOAD_LIST_INCOGNITO = "LOAD_LIST_INCOGNITO";

export interface LoadTheProductList {
  type: typeof LOAD_PRODUCTS;
  data: IProduct[];
  isLoading: boolean;
}
export interface LoadListIncognitor {
  type: typeof  LOAD_LIST_INCOGNITO;
  data: IProduct[];
}
export interface Fetch {
  type: typeof GET_PRODUCT_LIST;
}
export interface ChangeLoadintSts {
  type: typeof CHANGE_LOADING_STATUS;
  isLoading:boolean;
}
export interface DeleteProductFromUI {
  type: typeof DELETE_PRODUCT_FROM_UI;
  productId:number;
}
export function loadProducts(
  data: IProduct[],
  isLoading: boolean
): LoadTheProductList {
  return {
    type: LOAD_PRODUCTS,
    data: data,
    isLoading: isLoading
  };
}
export function loadListIncognito( data: IProduct[]): LoadListIncognitor {
  return {
    type: LOAD_LIST_INCOGNITO,
    data: data,
  };
}
export function fetchTheList(): Fetch {
  return {
    type: GET_PRODUCT_LIST
  };
}
export function changeLoadingStatus(): ListActions {
  return {
    type: CHANGE_LOADING_STATUS,
    isLoading: false
  };
}
export function deleteProductFromUI(productID:number): DeleteProductFromUI {
  return {
    type: DELETE_PRODUCT_FROM_UI,
    productId: productID
  };
}
export type ListActions = LoadTheProductList | Fetch|ChangeLoadintSts|DeleteProductFromUI|LoadListIncognitor;
