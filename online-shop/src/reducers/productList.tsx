import { IProduct } from "../model/Interfaces";
import {
  LOAD_PRODUCTS,
  GET_PRODUCT_LIST,
  ListActions,
  CHANGE_LOADING_STATUS,
  DELETE_PRODUCT_FROM_UI,
  LOAD_LIST_INCOGNITO
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
        isLoading: true,
      };
    case GET_PRODUCT_LIST:
      return {
        ...state,
        isLoading:true
       
      };
    case CHANGE_LOADING_STATUS:
      return{
        ...state,
        isLoading:false
      };
      case DELETE_PRODUCT_FROM_UI:
          return{
            ...state,
            data:state.data.filter((product:IProduct)=>product.id!=action.productId)
          };
          case LOAD_LIST_INCOGNITO:
              return{
                ...state,
                data:state.data
              };
    default:
      return state;
  }
}

export default productListReducer;
