export const postUrl =
  process.env.NODE_ENV === "production"
    ? "http://3.39.126.49:3001/uploads/"
    : "http://localhost:3001/uploads/";

console.log(process.env.NODE_ENV);
