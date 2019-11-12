import React from "react";
import "../../productModeling/productList.css";
import { IProduct } from "../../model/Interfaces";
import { AppState } from "../../reducers/combine";
import { Dispatch } from "redux";
import { loadProducts, fetchTheList } from "../../actions/productListActions";
import { connect } from "react-redux";
import { ProductListView, IDumbProdList } from "./dumbProductList";
import defaultImg from "../../default.jpg";
import { lifecycle, compose } from "recompose";
import { withLoading } from "../HOCS/LoaderHOC";

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
const onComponentDidMountList = lifecycle<ProductListProps, {}, {}>({
  componentDidMount() {
    this.props.fetchList();
  }
});

export class ProductList extends React.Component<ProductListProps> {
  // callLoadProducts() {
  //   this.props.fetchList();
  // }
  // componentDidMount() {
  //   this.callLoadProducts();
  // }
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
  productList: state.products.data,
  isLoading: state.products.isLoading,
  match: myOwnState.match
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadProducts: (data: IProduct[], isLoading: boolean) =>
    dispatch(loadProducts(data, isLoading)),
  fetchList: () => dispatch(fetchTheList())
});

const ProductListInitializer =  compose<ProductListProps, {}> (
  connect(
  mapStateToProps,
  mapDispatchToProps,
),
onComponentDidMountList,
withLoading
)
(ProductList)

export default ProductListInitializer;
