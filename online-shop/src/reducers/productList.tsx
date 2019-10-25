import { IProduct } from "../model/Interfaces";
import {
  LOAD_PRODUCTS,
  LoadTheProductList,
  FETCH_PRODUCTS,
  ListActions
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
  action: ListActions
): ProductListState {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        data: [...action.data],
        isLoading: action.isLoading,
      };
    case FETCH_PRODUCTS:
      return{
        ...state
      }
    default:
      return state;
  }
}

export default productListReducer;
