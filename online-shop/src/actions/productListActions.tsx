import { IProduct } from "../model/Interfaces";
export const LOAD_PRODUCTS = "LOAD-PRODUCTS";
export const GET_PRODUCT_LIST = "GET-PRODUCT-LIST";

export interface LoadTheProductList {
  type: typeof LOAD_PRODUCTS;
  data: IProduct[];
  isLoading: boolean;
}
export interface Fetch {
  type: typeof GET_PRODUCT_LIST;
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
export function fetchTheList(): Fetch {
  return {
    type: GET_PRODUCT_LIST
  };
}
export type ListActions = LoadTheProductList | Fetch;
