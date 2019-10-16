import React from "react";
import "../productModeling/shoppingcart.css";
import {
  IPropsCart,
  IStateCart,
  IProduct,
  ICartProduct,
  IOrder
} from "../model/Interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faShoppingCart, faShower } from "@fortawesome/free-solid-svg-icons";
import { ModalPopUp } from "./ModalPopUp";

library.add(faShoppingCart);
export class ShoppingCart extends React.Component<IPropsCart, IStateCart> {
  json: string;
  orderItem: IOrder[];
  popUpMsg: string = "Error";
  popUpTitle: string = "Order Status";
  constructor(props: IPropsCart) {
    super(props);
    this.state = {
      cartProducts: this.props.data,
      hasProducts: false,
      responseFromBackend: 0,
      showModal: false
    };
    this.orderItem = this.createOrder();
    this.json = `{"customer": "doej","products": ${JSON.stringify(
      this.orderItem
    )}}`;
  }

  submitOrder() {
    fetch("http://localhost:4000/orders/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: this.json
    }).then(response => {
      this.setState({ responseFromBackend: response.status });
      this.orderResponse(this.state.responseFromBackend);
    });
  }

  orderResponse = (data: any) => {
    if (data === 201) {
      this.popUpMsg = "Order placed succefully";
      this.setState({
        showModal: true
      });
    } else if (data === 401) {
      this.popUpMsg = "Something went wrong, please try again :(";
      this.setState({
        showModal: true
      });
    }
  };
  closeModal = () => {
    if (this.state.showModal === true) {
      this.setState({
        showModal: false
      });
    }
  };

  createOrder = () => {
    let i: number;
    let productsToCheckout: IOrder[] = [];
    let itemReadyForCheckout: IOrder = {} as any;
    let crtProductId: number;
    let crtProductQuantity: number;
    for (i = 0; i < this.state.cartProducts.length; i++) {
      crtProductId = this.state.cartProducts[i].product.id;
      crtProductQuantity = this.state.cartProducts[i].quantity;
      itemReadyForCheckout.productId = crtProductId;
      itemReadyForCheckout.quantity = crtProductQuantity;
      productsToCheckout.push(itemReadyForCheckout);
    }
    return productsToCheckout;
  };
  getTotalSum = () => {
    let i: number;
    let crtQuantity: number;
    let crtPrice: number;
    let totalSum: number = 0;
    for (i = 0; i < this.state.cartProducts.length; i++) {
      crtQuantity = this.state.cartProducts[i].quantity;
      crtPrice = this.state.cartProducts[i].product.price;
      totalSum = totalSum + crtQuantity * crtPrice;
    }
    return totalSum;
  };
  calculateTotalSumAndCheckout = () => {
    if (this.state.hasProducts === true) {
      console.log("este");
      return (
        <div className="checkoutSum">
          <div className="total-Sum">
            <h1 className="subtitle is-5">Total: {this.getTotalSum()} $</h1>
          </div>
          <div className="checkoutButton">
            <a
              className="button is-danger"
              id="showModal"
              onClick={() => {
                if(this.getTotalSum()>0){
                  this.submitOrder();
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
  increaseQuantity = (productToIncreaseQ: IProduct) => {
    let i: number;
    let crtQuantity: number = 0;
    for (i = 0; i < this.state.cartProducts.length; i++) {
      if (this.state.cartProducts[i].product.id === productToIncreaseQ.id) {
        crtQuantity = this.state.cartProducts[i].quantity;
        crtQuantity++;
        this.state.cartProducts[i].quantity = crtQuantity;
        this.setState({
          cartProducts: this.state.cartProducts
        });
      }
    }
  };
  decreaseQuantity = (productToDecreaseQ: IProduct) => {
    let i: number;
    let crtQuantity: number = 0;
    for (i = 0; i < this.state.cartProducts.length; i++) {
      if (this.state.cartProducts[i].product.id === productToDecreaseQ.id) {
        crtQuantity = this.state.cartProducts[i].quantity;
        crtQuantity--;
        if (crtQuantity === 0) {
          this.deleteItemFromCart(productToDecreaseQ);
          break;
        }
        this.state.cartProducts[i].quantity = crtQuantity;
        this.setState({
          cartProducts: this.state.cartProducts
        });
      }
    }
  };
  deleteItemFromCart = (productToDelete: IProduct) => {
    let i: number;
    let cartAfterDelete: ICartProduct[] = [];
    for (i = 0; i < this.state.cartProducts.length; i++) {
      if (this.state.cartProducts[i].product.id != productToDelete.id) {
        cartAfterDelete.push(this.state.cartProducts[i]);
      }
    }
    this.setState({
      cartProducts: cartAfterDelete
    });
    this.props.onDeleteItemFromShopping(productToDelete);
  };
  render() {
    let productsFromCart: any;
    if (this.state.cartProducts.length > 0) {
      if (this.state.hasProducts === false) {
        console.log("ai produse");
        this.setState({
          hasProducts: true
        });
      }
      productsFromCart = this.state.cartProducts.map((productt, key) => (
        <div id="cartItem">
          <div className="column">
            <div id="cartItem-img">
              <img src={productt.product.image} id="product-img"></img>
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
                    onClick={() => this.decreaseQuantity(productt.product)}
                  >
                    -
                  </a>

                  <span className="button is-rounded">
                    {productt.quantity}{" "}
                  </span>

                  <a
                    className="button is-primary is-outlined"
                    onClick={() => this.increaseQuantity(productt.product)}
                  >
                    +
                  </a>
                </div>
              </div>
              <div id="deleteItem">
                <span
                  className="button is-danger"
                  onClick={() => this.deleteItemFromCart(productt.product)}
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
          {this.calculateTotalSumAndCheckout()}
        </div>
        <ModalPopUp
          data={this.popUpMsg}
          title={this.popUpTitle}
          active={this.state.showModal}
          onClosing={this.closeModal.bind(this)}
          productToDelete={{} as any}
        />
      </div>
    );
  }
}
export default ShoppingCart;
