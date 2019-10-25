import { IProduct } from "../model/Interfaces";
import {
  LOAD_PRODUCTS,
  LoadTheProductList
} from "../actions/productListActions";
export interface ProductListState {
  data: IProduct[];
  isLoading: boolean;
}
const initialState: ProductListState = {
  data: [],
  isLoading: true
};

export function productListReducer(
  state: ProductListState = initialState,
  action: LoadTheProductList
): ProductListState {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        data: [...action.data],
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
}

export default productListReducer;
