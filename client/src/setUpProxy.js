const { createProxyMiddleware } = require("http-proxy-middleware");

// src/setupProxy.js
module.exports = function (app) {
  const postUrl =
    process.env.NODE_ENV === "production"
      ? "http://3.36.235.60:3000"
      : "http://localhost:3001";

  app.use(
    createProxyMiddleware("/api", {
      target: postUrl,
      changeOrigin: true,
    })
  );
};
