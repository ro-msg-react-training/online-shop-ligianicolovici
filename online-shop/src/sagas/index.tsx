import { all, takeLatest, put, call } from "redux-saga/effects";
import { FetchSelectedProduct } from "../actions/productActions";
import { ICartProduct } from "../model/Interfaces";
import { FetchOrder } from "../actions/shoppingActions";
import { FetchUpdateProduct, FetchAddNewProduct } from "../actions/editActions";

function* fetchProductList() {
  const data = yield fetch("http://localhost:4000/products", { method: "GET" })
    .then(response => response.json())
    .then(result => {
      return result;
    });
  yield put({ type: "LOAD-PRODUCTS", data });
}

function* fetchDeleteDetailsProduct(action: FetchSelectedProduct) {
  yield fetch("http://localhost:4000/products/" + action.productID, {
    method: "delete"
  }).then(response => console.log(response.status));
  const data = yield fetch("http://localhost:4000/products")
    .then(response => response.json())
    .then(data => {
      return data;
    });
  yield put({ type: "LOAD-PRODUCTS", data });
  yield put({ type: "HIDE-MODAL" });
}

function* fetchProductDetails(action: FetchSelectedProduct) {
  const product = yield fetch(
    "http://localhost:4000/products/" + action.productID
  )
    .then(response => response.json())
    .then(result => {
      return result;
    });
  yield put({ type: "LOAD-PRODUCT", product });
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
  yield put({ type: "CHECK-OUT", cartProducts, modalText, modalTitle });
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
  const data = yield fetch("http://localhost:4000/products")
    .then(response => response.json())
    .then(data => {
      return data;
    });
  yield put({ type: "LOAD-PRODUCTS", data });
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
  const data = yield fetch("http://localhost:4000/products")
    .then(response => response.json())
    .then(data => {
      return data;
    });
  yield put({ type: "LOAD-PRODUCTS", data });
}

function* actionWatcher() {
  yield takeLatest("FETCH-PRODUCTS", fetchProductList);
  yield takeLatest("FETCH-SELECTED", fetchProductDetails);
  yield takeLatest("FETCH-DELETE", fetchDeleteDetailsProduct);
  yield takeLatest("FETCH-ORDER", fetchTheOrder);
  yield takeLatest("FETCH-UPDATE", fetchUpdatedProduct);
  yield takeLatest("FETCH-ADD", fetchAddNewProduct);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
