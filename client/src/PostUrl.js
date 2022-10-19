export const postUrl =
  process.env.NODE_ENV === "production"
    ? "https://protected-reef-94609.herokuapp.com/uploads/"
    : "http://localhost:3001/uploads/";
