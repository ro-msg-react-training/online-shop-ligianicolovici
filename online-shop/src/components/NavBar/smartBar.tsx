import React from "react";
import iconPage from "../../icon.png";
import "../../productModeling/navBar.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCamera,
  faShoppingCart,
  faPlus,
  faChartPie
} from "@fortawesome/free-solid-svg-icons";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { displayProduct } from "../../actions/editActions";
import { IProduct } from "../../model/Interfaces";
import { AppState } from "../../reducers/combine";
import { NavBarProps, NavBarMaker } from "./dumbNavBar";

library.add(faCamera, faShoppingCart, faPlus, faChartPie);

interface NavProps {
  displayProduct: (product: IProduct, msg: string) => void;
  defaultProduct: IProduct;
}

class NavBar extends React.Component<NavProps> {
  render() {
    let navBarpros: NavBarProps = {
      displayProduct: this.props.displayProduct.bind(this),
      iconPage: iconPage,
      defaultProduct: this.props.defaultProduct
    };
    return <NavBarMaker {...navBarpros}></NavBarMaker>;
  }
}
const mapStateToProps = (state: AppState) => ({
  defaultProduct: state.editProduct.defaultProduct
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  displayProduct: (product: IProduct, msg: string) =>
    dispatch(displayProduct(product, msg))
});

const NavInitializer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
export default NavInitializer;
