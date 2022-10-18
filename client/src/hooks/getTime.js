const getTime = (data) => {
  const second = Math.floor(
    (new Date().getTime() - new Date(data).getTime()) / 1000
  ); // 초

  if (second <= 1200) {
    return `${Math.floor(second / 60)}분 전`;
  }

  if (1200 < second && second <= 86400) {
    return `${Math.floor(second / 60 / 60)}시간 전`;
  }

  if (86400 < second) {
    return `${Math.floor(second / 60 / 60 / 24)}일 전`;
  }
};

export default getTime;
