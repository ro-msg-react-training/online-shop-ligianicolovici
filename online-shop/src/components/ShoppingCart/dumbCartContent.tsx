import React from "react";
import defaultImg from "../../default.jpg";
import {
  ICartProduct,
  ProductImagesUrls,
  IProduct
} from "../../model/Interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalPopUp } from "../ModalPopUp";
export interface IDumbCart {
  data: ICartProduct[];
  quantityDown: (product: IProduct) => void;
  quantityUp: (product: IProduct) => void;
  eraseItem: (product: IProduct) => void;
  closeModel: () => void;
  submitOrder: () => void;
  hasProducts: boolean;
  modalText: string;
  modalTitle: string;
  showModal: boolean;
}
let getTotalSum = (cartProducts: ICartProduct[]) => {
  let i: number;
  let crtQuantity: number;
  let crtPrice: number;
  let totalSum: number = 0;
  for (i = 0; i < cartProducts.length; i++) {
    crtQuantity = cartProducts[i].quantity;
    crtPrice = cartProducts[i].product.price;
    totalSum = totalSum + crtQuantity * crtPrice;
  }
  return totalSum;
};
let calculateTotalSumAndCheckout = (props: IDumbCart) => {
  if (props.hasProducts === true) {
    return (
      <div className="checkoutSum">
        <div className="total-Sum">
          <h1 className="subtitle is-5">Total: {getTotalSum(props.data)} $</h1>
        </div>
        <div className="checkoutButton">
          <a
            className="button is-danger"
            id="showModal"
            onClick={() => {
              if (getTotalSum(props.data) > 0) {
                props.submitOrder();
              }
            }}
          >
            Checkout
          </a>
        </div>
      </div>
    );
  }
};

export const CartContent = (props: IDumbCart) => {
  let productsFromCart: any;
  if (props.data.length > 0) {
    productsFromCart = props.data.map((productt, key) => (
      <div id="cartItem">
        <div className="column">
          <div id="cartItem-img">
            <img
              src={
                ProductImagesUrls[productt.product.id]
                  ? ProductImagesUrls[productt.product.id].image
                  : defaultImg
              }
              id="product-img"
            ></img>
          </div>
        </div>
        <div className="column">
          <div id="cartItem-details">
            <div>
              <h1 className="title">Product: {productt.product.name}</h1>
            </div>
            <div>
              <p className="subtitle is-5">
                Category: {productt.product.category}
              </p>
            </div>
            <br></br>
            <div>
              <p>Price: {productt.product.price} $</p>
            </div>
          </div>
        </div>
        <div className="column">
          <div id="cart-item-modifier">
            <div id="quantity">
              <div className="column">
                <a
                  className="button is-primary is-outlined"
                  onClick={() => props.quantityDown(productt.product)}
                >
                  -
                </a>

                <span className="button is-rounded">{productt.quantity} </span>

                <a
                  className="button is-primary is-outlined"
                  onClick={() => props.quantityUp(productt.product)}
                >
                  +
                </a>
              </div>
            </div>
            <div id="deleteItem">
              <span
                className="button is-danger"
                onClick={() => props.eraseItem(productt.product)}
              >
                Delete item
              </span>
            </div>
          </div>
        </div>
      </div>
    ));
  }
  return (
    <div className="content">
      <h1 className="subtitle is-3">
        Shopping cart
        <FontAwesomeIcon icon="shopping-cart" color="white" />
      </h1>
      <div className="cart-list">
        <div className="shoppingCart-Items">{productsFromCart}</div>
        {calculateTotalSumAndCheckout(props)}
      </div>
      <ModalPopUp
        data={props.modalText}
        title={props.modalTitle}
        active={props.showModal}
        onClosing={props.closeModel()}
        productToDelete={{} as any}
      />
    </div>
  );
};
