const { createProxyMiddleware } = require("http-proxy-middleware");

// src/setupProxy.js
module.exports = function (app) {
  const postUrl =
    process.env.NODE_ENV === "production"
      ? "https://cws-ec2server.shop"
      : "http://3.36.235.60:3000";

  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:3001",
      changeOrigin: true,
    })
  );

  app.use(
    createProxyMiddleware("/ec2Server", {
      target: "https://port-0-react-aichat-1maxx2algj8mzv5.sel3.cloudtype.app/",
      pathRewrite: {
        "^/ec2Server": "",
      },
      changeOrigin: true,
    })
  );
};
