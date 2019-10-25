import {
  IProduct,
  ICartProduct,
  IStateCart
} from "../model/Interfaces";

import {
  CartActions,
  LoadCart,
  QuantityUP,
  QuantityDown,
  EraseItem,
  CheckOut,
  FetchOrder
} from "../actions/shoppingActions";

const initialShoppingState: IStateCart = {
  orderItem: [],
  cartProducts: [],
  hasProducts: false,
  responseFromBackend: 0,
  showModal: false,
  modalTitle: "default",
  modalText: "default",
  json:""
};

export function shoppingCartManipulation(
  state: IStateCart = initialShoppingState,
  action: CartActions
): IStateCart {
  switch (action.type) {
    case "HIDE-POPUP":
      return {
        cartProducts: state.cartProducts,
        hasProducts: true,
        responseFromBackend: state.responseFromBackend,
        showModal: false,
        orderItem: state.orderItem,
        modalText: state.modalText,
        modalTitle: state.modalTitle,
        json:state.json
      };
    case "LOAD-CART":
      const loadAction: LoadCart = action as LoadCart;
      return {
        cartProducts: insertInCart(loadAction.product, [...state.cartProducts]),
        hasProducts: true,
        responseFromBackend: 0,
        showModal: false,
        orderItem: state.orderItem,
        modalText: state.modalText,
        modalTitle: state.modalTitle,
        json:state.json
      };
    case "INCREASE-QUANTITY":
      const addAction: QuantityUP = action as QuantityUP;
      return {
        cartProducts: increaseQuantity(addAction.product, state.cartProducts),
        hasProducts: true,
        responseFromBackend: 0,
        showModal: false,
        orderItem: state.orderItem,
        modalText: state.modalText,
        modalTitle: state.modalTitle,
        json:state.json
      };
    case "DECREASE-QUANTITY":
      const eraseAction: QuantityDown = action as QuantityDown;
      return {
        cartProducts: decreaseQuantity(eraseAction.product, state.cartProducts),
        hasProducts: true,
        responseFromBackend: 0,
        showModal: false,
        orderItem: state.orderItem,
        modalText: state.modalText,
        modalTitle: state.modalTitle,
        json:state.json
      };
    case "DELETE-PRODUCT-FROM-CART":
      const deleteAction: EraseItem = action as EraseItem;
      return {
        cartProducts: deleteItemFromCart(deleteAction.product, [
          ...state.cartProducts
        ]),
        hasProducts: true,
        responseFromBackend: 0,
        showModal: false,
        orderItem: state.orderItem,
        modalText: state.modalText,
        modalTitle: state.modalTitle,
        json:state.json
      };

    case "CHECK-OUT":
      const checkOutAction: CheckOut = action as CheckOut;
      return {
        cartProducts: clearCart([...checkOutAction.cartProducts]),
        hasProducts: true,
        responseFromBackend: state.responseFromBackend,
        showModal: true,
        orderItem: state.orderItem,
        modalText: checkOutAction.modalText,
        modalTitle: checkOutAction.modalTitle,
        json:state.json
      };
      case "FETCH-ORDER":
          const fetchAction: FetchOrder = action as FetchOrder;
          return {
            ...state,
            cartProducts:fetchAction.cartProducts,
            modalText:fetchAction.modalText,
            modalTitle:fetchAction.modalTitle,
            json:fetchAction.json
          };

    default:
      return state;
  }
}

let insertInCart = function addProductsToCart(
  newCartProduct: IProduct,
  crtCartItems: ICartProduct[]
): ICartProduct[] {
  let contor: number = 0;
  let i: number;
  let productInCart: boolean = false;
  let cartItemToInsert: ICartProduct = {} as any;
  let newCartItemsArray: ICartProduct[] = [];

  for (i = 0; i < crtCartItems.length; i++) {
    if (crtCartItems[i].product.id === newCartProduct.id) {
      contor = crtCartItems[i].quantity;
      contor++;
      crtCartItems[i].quantity = contor;
      productInCart = true;
      break;
    }
  }
  if (productInCart === false) {
    contor = contor + 1;
    cartItemToInsert.product = newCartProduct;
    cartItemToInsert.quantity = contor;
    newCartItemsArray = crtCartItems.concat(cartItemToInsert);
  } else {
    newCartItemsArray = crtCartItems;
  }
  return newCartItemsArray;
};

let clearCart = (cartItems: ICartProduct[]) => {
  cartItems = [];
  return cartItems;
};
let deleteItemFromCart = (
  productToDelete: IProduct,
  crtCart: ICartProduct[]
) => {
  let i: number;
  let cartAfterDelete: ICartProduct[] = [];
  for (i = 0; i < crtCart.length; i++) {
    if (crtCart[i].product.id !== productToDelete.id) {
      cartAfterDelete.push(crtCart[i]);
    }
  }
  return cartAfterDelete;
};
let increaseQuantity = (
  productToIncreaseQ: IProduct,
  cartProducts: ICartProduct[]
) => {
  let i: number;
  let crtQuantity: number = 0;
  for (i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].product.id === productToIncreaseQ.id) {
      crtQuantity = cartProducts[i].quantity;
      crtQuantity++;
      cartProducts[i].quantity = crtQuantity;
      cartProducts = [...cartProducts];
    }
  }
  return cartProducts;
};
let decreaseQuantity = (
  productToDecreaseQ: IProduct,
  cartProducts: ICartProduct[]
) => {
  let i: number;
  let crtQuantity: number = 0;
  for (i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].product.id === productToDecreaseQ.id) {
      crtQuantity = cartProducts[i].quantity;
      crtQuantity--;
      if (crtQuantity === 0) {
        cartProducts = deleteItemFromCart(productToDecreaseQ, cartProducts);
        break;
      }
      cartProducts[i].quantity = crtQuantity;
      cartProducts = [...cartProducts];
    }
  }
  return cartProducts;
};
