import { all, takeLatest, put, call } from "redux-saga/effects";
import {
  FetchSelectedProduct,
  GET_SELECTED_PRODUCT,
  DELETE_CURRENT_PRODUCT,
  changeLoadingIndicator,
  loadProduct
} from "../actions/productActions";
import { ICartProduct } from "../model/Interfaces";
import {
  FetchOrder,
  SEND_ORDER,
  switchLoading,
  checkOut
} from "../actions/shoppingActions";
import {
  FetchUpdateProduct,
  FetchAddNewProduct,
  UPDATE_CURRENT_PRODUCT,
  CREATE_NEW_PRODUCT
} from "../actions/editActions";
import {
  GET_PRODUCT_LIST,
  changeLoadingStatus,
  deleteProductFromUI,
  loadListIncognito,
  loadProducts,
  fetchTheList
} from "../actions/productListActions";
import {
  GET_SALES,
  swithLoadingStatus,
  loadCurrentSales
} from "../actions/highChartActions";

function* fetchProductList() {
  const data = yield fetch("http://localhost:4000/products", { method: "GET" })
    .then(response => response.json())
    .then(result => {
      return result;
    });
  yield put(loadProducts(data, true));
  yield put(changeLoadingStatus());
}

function* fetchDeleteDetailsProduct(action: FetchSelectedProduct) {
  yield fetch("http://localhost:4000/products/" + action.productID, {
    method: "delete"
  }).then(response => {
    console.log(response.status);
  });

  yield put(deleteProductFromUI(action.productID));
}

function* fetchProductDetails(action: FetchSelectedProduct) {
  const product = yield fetch(
    "http://localhost:4000/products/" + action.productID
  )
    .then(response => response.json())
    .then(result => {
      return result;
    });
  yield put(loadProduct(product));
  yield put(changeLoadingIndicator(false));
}

function* fetchTheOrder(action: FetchOrder) {
  let result: number = 0;
  let modalText: string = action.modalText;
  let modalTitle: string = action.modalTitle;
  let cartProducts: ICartProduct[] = action.cartProducts;
  yield fetch("http://localhost:4000/orders/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: action.json
  })
    .then(response => {
      result = response.status;
    })
    .then(() => {
      if (result === 201) {
        modalText = "Order succesfully placed";
      }
    });
  yield put(checkOut(cartProducts, modalText, modalTitle));
  yield put(switchLoading());
}

function* fetchUpdatedProduct(action: FetchUpdateProduct) {
  let result: number = 0;
  yield fetch("http://localhost:4000/products/" + action.productID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; chartset=UTF-8",
      Accept: "application/json"
    },
    body: JSON.stringify(action.productUpdated)
  })
    .then(response => {
      result = response.status;
    })
    .then(() => {
      console.log(result);
    });
  yield put(fetchTheList());
}
function* fetchAddNewProduct(action: FetchAddNewProduct) {
  let result: number = 0;
  yield fetch("http://localhost:4000/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; chartset=UTF-8",
      Accept: "application/json"
    },
    body: JSON.stringify(action.productUpdated)
  })
    .then(response => {
      result = response.status;
    })
    .then(() => {
      console.log(result);
    });
  yield put(fetchTheList());
}

function* fetchSales() {
  const data = yield fetch("http://localhost:4000/sales", { method: "GET" })
    .then(response => response.json())
    .then(result => {
      return result;
    });

  yield put(loadCurrentSales(data, true));
  yield put(swithLoadingStatus());
}

function* actionWatcher() {
  yield takeLatest(GET_PRODUCT_LIST, fetchProductList);
  yield takeLatest(GET_SELECTED_PRODUCT, fetchProductDetails);
  yield takeLatest(DELETE_CURRENT_PRODUCT, fetchDeleteDetailsProduct);
  yield takeLatest(SEND_ORDER, fetchTheOrder);
  yield takeLatest(UPDATE_CURRENT_PRODUCT, fetchUpdatedProduct);
  yield takeLatest(CREATE_NEW_PRODUCT, fetchAddNewProduct);
  yield takeLatest(GET_SALES, fetchSales);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
