const { createProxyMiddleware } = require("http-proxy-middleware");

// src/setupProxy.js
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://blooming-castle-32175.herokuapp.com",
      changeOrigin: true,
    })
  );
};
