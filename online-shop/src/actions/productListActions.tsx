import { IProduct } from "../model/Interfaces";
export const LOAD_PRODUCTS = "LOAD-PRODUCTS";
export const FETCH_PRODUCTS= "FETCH-PRODUCTS";

export interface LoadTheProductList {
  type: typeof LOAD_PRODUCTS;
  data: IProduct[];
  isLoading: boolean;
}
export interface Fetch {
  type: typeof FETCH_PRODUCTS;
}


export function loadProducts(data: IProduct[],isLoading: boolean): LoadTheProductList {
  return {
    type: LOAD_PRODUCTS,
    data: data,
    isLoading: isLoading,
  };
}
export function fetchTheList():Fetch{
    return{
      type:FETCH_PRODUCTS
    }
}
export type ListActions =
  | LoadTheProductList
  | Fetch;



