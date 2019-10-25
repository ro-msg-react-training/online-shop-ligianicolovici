export interface IProduct {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
}
export interface ICartProduct {
  product: IProduct;
  quantity: number;
}

// ----- App ----- //
export interface IPropsApp {
  data?: any;
}
export interface IStateApp {
  itemsCart: ICartProduct[];
  products: IProduct[];
}
export interface ArrayOfProductImages {
  productID: number;
  image: string;
}
export const ProductImagesUrls: ArrayOfProductImages[] = [
  {
    productID: 0,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1000.jpg"
  },
  {
    productID: 1,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg"
  },
  {
    productID: 2,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1002.jpg"
  },
  {
    productID: 3,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1003.jpg"
  },
  {
    productID: 4,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1007.jpg"
  },
  {
    productID: 5,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1010.jpg"
  },
  {
    productID: 6,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1011.jpg"
  },
  {
    productID: 7,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1020.jpg"
  },
  {
    productID: 8,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1021.jpg"
  },
  {
    productID: 9,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1022.jpg"
  },
  {
    productID: 10,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1023.jpg"
  },
  {
    productID: 11,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1030.jpg"
  },
  {
    productID: 12,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1031.jpg"
  },
  {
    productID: 13,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1032.jpg"
  },
  {
    productID: 14,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1035.jpg"
  },
  {
    productID: 15,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1036.jpg"
  },
  {
    productID: 16,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1037.jpg"
  },
  {
    productID: 17,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1040.jpg"
  },
  {
    productID: 18,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1041.jpg"
  },
  {
    productID: 19,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1042.jpg"
  },
  {
    productID: 20,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1050.jpg"
  },
  {
    productID: 21,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1051.jpg"
  },
  {
    productID: 22,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1052.jpg"
  },
  {
    productID: 23,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1055.jpg"
  },
  {
    productID: 24,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1056.jpg"
  },
  {
    productID: 25,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1060.jpg"
  },
  {
    productID: 26,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1061.jpg"
  },
  {
    productID: 27,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1062.jpg"
  },
  {
    productID: 28,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1063.jpg"
  },
  {
    productID: 29,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1064.jpg"
  },
  {
    productID: 30,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1065.jpg"
  },
  {
    productID: 31,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1066.jpg"
  },
  {
    productID: 32,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1067.jpg"
  },
  {
    productID: 33,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1068.jpg"
  },
  {
    productID: 34,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1069.jpg"
  },
  {
    productID: 35,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1070.jpg"
  },
  {
    productID: 36,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1071.jpg"
  },
  {
    productID: 37,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1072.jpg"
  },
  {
    productID: 38,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1073.jpg"
  },
  {
    productID: 39,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1080.jpg"
  },
  {
    productID: 40,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1081.jpg"
  },
  {
    productID: 41,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1082.jpg"
  },
  {
    productID: 42,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1083.jpg"
  },
  {
    productID: 43,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1085.jpg"
  },
  {
    productID: 44,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1090.jpg"
  },
  {
    productID: 45,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1091.jpg"
  },
  {
    productID: 46,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1092.jpg"
  },
  {
    productID: 47,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1100.jpg"
  },
  {
    productID: 48,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1101.jpg"
  },
  {
    productID: 49,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1102.jpg"
  },
  {
    productID: 50,
    image:
      "https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1103.jpg"
  }
];

// ----- ProductList ----- //
export interface IPropsProductList {
  data: IProduct[];
}

export interface IStateProducts {
  products: IProduct[];
}
// ----- ShoppingCart ----- //
export interface IPropsCart {
  data: ICartProduct[];
  onDeleteItemFromShopping: any;
}
export interface IStateCart {
  cartProducts: ICartProduct[];
  hasProducts: boolean;
  responseFromBackend: number;
  showModal: boolean;
  orderItem: IOrder[];
  modalTitle: string;
  modalText: string;
}
export interface IOrder {
  productId: number;
  quantity: number;
}
// ----- ProductDetails ----- //
export interface IPropsDetails {
  data?: IProduct;
  match?: any;
  onAddProduct?: any;
  onDeleteProduct?: any;
}
export interface IStateDetails {
  dataToExport: IProduct;
  selectedProduct: IProduct;
  showModel: boolean;
  messagePopUp: string;
  titlePopUp: string;
  cartItems: ICartProduct[];
  productToDelete: IProduct;
}
// --------- PopUp --------- //
export interface IPropsModal {
  title: String;
  data?: String;
  active: boolean;
  onClosing: any;
  onDeleteProduct?: any;
  productToDelete: IProduct;
}
export interface IStateModal {
  message?: String;
  titlePopUp?: String;
  actived: boolean;
}
export interface IStateEdit {
  givenProduct: IProduct;
  listOfProducts: IProduct[];
  categories: string[];
  displayType: string;
}
