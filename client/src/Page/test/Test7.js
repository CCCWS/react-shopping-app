import React, { useState, useEffect } from "react";

const Test7 = () => {
  const createConnection = () => {
    return {
      connect() {
        console.log("✅ Connecting...");
      },
      disconnect() {
        console.log("❌ Disconnected.");
      },
    };
  };

  useEffect(() => {
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, []);

  return <></>;
};

export default Test7;
