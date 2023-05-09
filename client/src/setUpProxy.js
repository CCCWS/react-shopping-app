const { createProxyMiddleware } = require("http-proxy-middleware");

// src/setupProxy.js
module.exports = function (app) {
  const postUrl =
    process.env.NODE_ENV === "production"
      ? "http://3.36.235.60:3000"
      : "http://3.36.235.60:3000";

  app.use(
    createProxyMiddleware("/api", {
      target: "https://cws-ec2server.shop",
      changeOrigin: true,
    })
  );
};

