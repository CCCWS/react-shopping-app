import { createSlice } from "@reduxjs/toolkit";

const cartState = {
  cartList: [],
  totalCount: 0,
  totalPrice: 0,
  checkProduct: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartState,
  reducers: {
    cartInit(state) {
      state.totalCount = 0;
      state.totalPrice = 0;
      state.checkProduct = [];
    },

    onAddCart(state, action) {
      state.cartList = action.payload;
    },

    onAddCheckProductAll(state, action) {
      if (state.cartList.length === state.checkProduct.length) {
        state.totalCount = 0;
        state.totalPrice = 0;
        state.checkProduct = [];
        return;
      }

      if (state.cartList.length !== state.checkProduct.length) {
        state.checkProduct = action.payload;

        // eslint-disable-next-line array-callback-return
        action.payload.map((e) => {
          state.totalCount += e.purchasesCount;
          state.totalPrice += e.purchasesCount * e.price;
        });
        return;
      }
    },

    onAddCheckProduct(state, action) {
      if (state.checkProduct.find((data) => data._id === action.payload._id)) {
        console.log("이미 있음");
        state.checkProduct = state.checkProduct.filter(
          (data) => data._id !== action.payload._id
        );

        state.totalCount -= action.payload.purchasesCount;
        state.totalPrice -=
          action.payload.purchasesCount * action.payload.price;
        return;
      }

      if (
        state.checkProduct.find((data) => data._id === action.payload) ===
        undefined
      ) {
        console.log("새로 추가");
        state.totalCount += action.payload.purchasesCount;
        state.totalPrice +=
          action.payload.purchasesCount * action.payload.price;

        state.checkProduct.push(action.payload);
        return;
      }
    },

    onRemoveCart(state, action) {
      if (action.payload.checkProduct.length === state.cartList.length) {
        console.log("전체 삭제");
        state.totalCount = 0;
        state.totalPrice = 0;
        state.checkProduct = [];
        state.cartList = [];
        return;
      }

      if (action.payload.checkProduct.length !== state.cartList.length) {
        console.log("부분 삭제");

        state.cartList = state.cartList.filter(
          (data) => !action.payload.id.includes(data._id)
        );

        state.checkProduct = state.checkProduct.filter(
          (data) => !action.payload.id.includes(data._id)
        );

        let tempCount = 0;
        let tempPrice = 0;

        // eslint-disable-next-line array-callback-return
        action.payload.checkProduct.map((e) => {
          tempCount += e.purchasesCount;
          tempPrice += e.purchasesCount * e.price;
        });

        state.totalCount -= tempCount;
        state.totalPrice -= tempPrice;

        return;
      }
    },

    onIncreaseCartCount(state, action) {
      if (
        state.checkProduct.find(
          (data) => data._id === action.payload.product._id
        )
      ) {
        console.log("이미 있음");
        state.totalCount += 1;
        state.totalPrice += action.payload.product.price;
      }

      // eslint-disable-next-line array-callback-return
      state.cartList.find((e) => {
        if (e._id === action.payload.product._id) {
          console.log("개수 증가");
          e.purchasesCount += 1;
        }
      });
    },

    onDecreaseCartCount(state, action) {
      if (
        state.checkProduct.find(
          (data) => data._id === action.payload.product._id
        )
      ) {
        console.log("이미 있음");
        state.totalCount -= 1;
        state.totalPrice -= action.payload.product.price;
      }

      // eslint-disable-next-line array-callback-return
      state.cartList.find((e) => {
        if (e._id === action.payload.product._id) {
          console.log("개수 감소");
          e.purchasesCount -= 1;
        }
      });
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
