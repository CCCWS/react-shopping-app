import {
  LOGIN_INFO,
  REGISTER_INFO,
  AUTH_INFO,
  ADD_CART,
} from "../_action/types";

export default function userData(state = {}, action) {
  //action > user_action에서 return해준 값
  //여러 데이터가 올 수 있기 때문에 switch문 사용
  switch (action.type) {
    case LOGIN_INFO:
      return { ...state, loginSuccess: action.payload };
      break;

    case REGISTER_INFO:
      return { ...state, register: action.payload };
      break;

    case AUTH_INFO:
      return { ...state, userData: action.payload }; //payload에 모든 유저 정보가 들어감
      break;

    case ADD_CART:
      console.log(action.payload);
      if (action.payload) {
        alert("장바구니에 있는 상품입니다.");
        return { ...state };
        break;
      } else {
        alert("장바구니에 추가되었습니다.");
        return {
          ...state,
          userData: {
            ...state.userData,
            cart: action.payload.cart,
          },
        };
        break;
      }

    //payload에 모든 유저 정보가 들어감

    default:
      return state;
  }
}
