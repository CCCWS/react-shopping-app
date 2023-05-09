const { createProxyMiddleware } = require("http-proxy-middleware");

// src/setupProxy.js
module.exports = function (app) {
  const postUrl =
    process.env.NODE_ENV === "production"
      ? "https://cws-ec2server.shop"
      : "http://3.36.235.60:3000";

  app.use(
    createProxyMiddleware("/corstest", {
      target: "https://cws-ec2server.shop",
      changeOrigin: true,
    })
  );
};
