import React from "react";
import "../../productModeling/productList.css";
import { IProduct } from "../../model/Interfaces";
import { AppState } from "../../reducers/combine";
import { Dispatch } from "redux";
import { loadProducts, fetchTheList } from "../../actions/productListActions";
import { connect } from "react-redux";
import { ProductListView, IDumbProdList } from "./dumbProductList";
import defaultImg from "../../default.jpg";

export interface LocalState {
  match?: any;
}
interface ProductListProps {
  match?: any;
  productList: IProduct[];
  isLoading: boolean;
  loadProducts: (data: IProduct[], isLoading: boolean) => void;
  fetchList: () => void;
}

export class ProductList extends React.Component<ProductListProps> {
  callLoadProducts() {
    this.props.fetchList();
  }
  componentDidMount() {
    this.callLoadProducts();
  }
  render() {
    let sentData: IDumbProdList = {
      productList: [...this.props.productList],
      isLoading: this.props.isLoading,
      defaultImg: defaultImg
    };
    return <ProductListView {...sentData} />;
  }
}
const mapStateToProps = (state: AppState, myOwnState: LocalState) => ({
  productList: state.productListReducer.data,
  isLoading: state.productListReducer.isLoading,
  match: myOwnState.match
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadProducts: (data: IProduct[], isLoading: boolean) =>
    dispatch(loadProducts(data, isLoading)),
  fetchList: () => dispatch(fetchTheList())
});

const ProductListInitializer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);

export default ProductListInitializer;
