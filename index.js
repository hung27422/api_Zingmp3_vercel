const path = require("path");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

// Page Home
app.get("/", (req, res) => {
  res.send("SERVER ON");
});

// ZingMp3Router
const ZingMp3Router = require("./src/routes/ZingRouter");
app.use("/api", cors({ origin: "*" }), ZingMp3Router);
app.use(
  "/api",
  createProxyMiddleware({
    target: "https://api-zingmp3-vercel-sigma.vercel.app/", // Thay bằng URL API gốc của bạn
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // Xóa tiền tố '/api' khỏi URL
    },
  })
);
// Page Error
app.get("*", (req, res) => {
  res.send("Nhập Sai Đường Dẫn! Vui Lòng Nhập Lại >.<");
});

app.listen(port, () => {
  console.log(`Start server listen at http://localhost:${port}`);
});
