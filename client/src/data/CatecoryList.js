export const categoryListBase = [
  {
    id: 1,
    name: "디지털기기",
    value: "디지털기기",
  },
  {
    id: 2,
    name: "생활가전",
    value: "생활가전",
  },
  {
    id: 3,
    name: "가구/인테리어",
    value: "가구/인테리어",
  },
  {
    id: 4,
    name: "도서",
    value: "도서",
  },
  {
    id: 5,
    name: "의류",
    value: "의류",
  },
  {
    id: 6,
    name: "게임/취미",
    value: "게임/취미",
  },
  {
    id: 7,
    name: "기타",
    value: "기타",
  },
];

export const uploadCategoryList = [
  { id: 0, name: "카테고리 선택", value: "" },
  ...categoryListBase,
];

export const categoryList = [
  { id: 0, name: "전체", value: "" },
  ...categoryListBase,
];

export const priceList = [
  {
    id: 0,
    name: "전체",
    // value:,
  },
  {
    id: 1,
    name: "1만원 이하",
    value: [0, 10000],
  },
  {
    id: 2,
    name: "1만원~3만원",
    value: [10000, 30000],
  },
  {
    id: 3,
    name: "3만원~5만원",
    value: [30000, 50000],
  },
  {
    id: 4,
    name: "5만원~7만원",
    value: [50000, 70000],
  },
  {
    id: 5,
    name: "5만원~10만원",
    value: [50000, 100000],
  },
  {
    id: 6,
    name: "10만원 이상",
    value: [100000, 100000000],
  },
];
