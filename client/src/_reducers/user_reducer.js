import {
  LOGIN_INFO,
  REGISTER_INFO,
  AUTH_INFO,
  ADD_CART,
  REMOVE_CART,
} from "../_action/types";

export default function userData(state = {}, action) {
  // reducer 함수, 항상 같은 값을 받아서 같은 값을 출력하는 순수함수여야함
  //현재 상태인 state와 action을 받음

  //action > user_action에서 return해준 값
  //여러 데이터가 올 수 있기 때문에 switch문 사용

  //기존의 상태인 state를 참조하고 state값에 액세스하여
  //새로 리턴된 상태를 반환해줌
  //state = {} > 기본값을 주어야됨

  switch (action.type) {
    case LOGIN_INFO:
      return { ...state, loginSuccess: action.payload };

    case REGISTER_INFO:
      return { ...state, register: action.payload };

    case AUTH_INFO:
      return { ...action.payload };

    case ADD_CART:
      if (action.payload) {
        alert("장바구니에 있는 상품입니다.");
        return { ...state };
      } else {
        alert("장바구니에 추가되었습니다.");
        return {
          ...state,
          userData: {
            ...state.userData,
            cart: action.payload.cart,
          },
        };
      }

    case REMOVE_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload,
        },
      };

    //payload에 모든 유저 정보가 들어감

    default:
      return state;
  }
}
