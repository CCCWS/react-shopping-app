const { createProxyMiddleware } = require("http-proxy-middleware");

// src/setupProxy.js
module.exports = function (app) {
  const postUrl =
    process.env.NODE_ENV === "production"
      ? "https://cws-ec2server.shop"
      : "http://localhost:3001";

  app.use(
    createProxyMiddleware("/api", {
      target: postUrl,
      changeOrigin: true,
    })
  );
};
