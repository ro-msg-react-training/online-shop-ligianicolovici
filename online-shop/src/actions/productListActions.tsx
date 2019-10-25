import { IProduct } from "../model/Interfaces";
export const LOAD_PRODUCTS = "LOAD-PRODUCTS";
export const SEND_PRODUCTS= "SEND-PRODUCTS";

export interface LoadTheProductList {
  type: typeof LOAD_PRODUCTS;
  data: IProduct[];
  isLoading: boolean;
}


export function loadProducts(data: IProduct[],isLoading: boolean): LoadTheProductList {
  return {
    type: LOAD_PRODUCTS,
    data: data,
    isLoading: isLoading,
  };
}


