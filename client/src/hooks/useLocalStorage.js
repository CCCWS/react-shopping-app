import { useEffect } from "react";

const useLocalStorage = (product, loading) => {
  useEffect(() => {
    if (loading) return;

    const get = JSON.parse(localStorage.getItem("productHistory"));

    //LocalStorage에 해당 상품 저장
    const setLocalData = () => {
      //접속한 페이지의 상품을 제외한 나머지 데이터를 가져옴
      const filterGet = get.filter((data) => data.id !== product._id);

      //접속한 페이지의 상품을 LocalStorage에 저장
      //없는 상품이라면 새롭게 추가, 이미 있던 상품이라면 제거후 최상단으로 새롭게 추가
      localStorage.setItem(
        "productHistory",
        JSON.stringify([
          { id: product._id, image: product.image[0] },
          ...filterGet,
        ])
      );
    };

    //LocalStorage가 비어있을 경우
    if (get === null) {
      localStorage.setItem(
        "productHistory",
        JSON.stringify([{ id: product._id, image: product.image[0] }])
      );

      //LocalStorage에 데이터가 있을 경우
    } else {
      //LocalStorage의 최대 저장길이는 6으로 지정
      if (get.length === 6) {
        //중복 데이터가 이미 있는 경우
        if (get.filter((data) => data.id === product._id).length === 1) {
          setLocalData();

          //중복데이터가 없을경우 하나를 pop하고 추가
        } else {
          get.pop();
          setLocalData();
        }

        //LocalStorage에 저장된 상품이 6미만일 경우
      } else {
        setLocalData();
      }
    }
  }, [loading, product]);

  return [];
};

export default useLocalStorage;
