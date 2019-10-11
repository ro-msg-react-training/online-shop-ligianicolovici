import React from "react";
import "../productModeling/shoppingcart.css";
import { IPropsCart, IStateCart } from "../model/Interfaces";

export class ShoppingCart extends React.Component<IPropsCart, IStateCart> {
  constructor(props: IPropsCart) {
    super(props);
    this.state = {
      cartProducts: this.props.data
    };
  }
  render() {
    let productsFromCart;
    if (this.state.cartProducts != null) {
      productsFromCart = this.state.cartProducts.map((productt, key) => (
        <tr>
          <td>{productt.name}</td>
          <td>{productt.category}</td>
          <td>{productt.price}</td>
        </tr>
      ));
    } else
      productsFromCart = (
        <tr>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );

    return (
      <div className="content">
        <h1 className="subtitle is-2">My shopping cart</h1>
        <div className="cart-list">
          <table className="table ">
            <thead>
              <tr>
                <th>Name </th>
                <th>Category </th>
                <th>Price </th>
              </tr>
            </thead>
            <tbody>{productsFromCart}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default ShoppingCart;
