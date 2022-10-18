export const postUrl =
  process.env.NODE_ENV === "production"
    ? "https://blooming-castle-32175.herokuapp.com/uploads/"
    : "http://localhost:3001/uploads/";
