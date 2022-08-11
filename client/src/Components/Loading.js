import React from "react";
import { Spin } from "antd";

import { LoadingOutlined } from "@ant-design/icons";

function Loading() {
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  );
}

export default Loading;
