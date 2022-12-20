const { createProxyMiddleware } = require("http-proxy-middleware");

// src/setupProxy.js
module.exports = function (app) {
  // const postUrl =
  //   process.env.NODE_ENV === "production"
  //     ? "https://blooming-castle-32175.herokuapp.com"
  //     : "http://localhost:3001";

  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:3001",
      changeOrigin: true,
    })
  );
};
