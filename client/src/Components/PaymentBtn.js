import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

function PaymentBtn({ price, paymentSeccess, productsold }) {
  const onSuccess = async (payment) => {
    console.log("The payment was succeeded!", payment);

    paymentSeccess(payment);
    productsold();
  };

  const onCancel = (data) => {
    console.log("The payment was cancelled!", data);
  };

  const onError = (err) => {
    console.log("Error!", err);
  };

  let env = "sandbox";
  let currency = "USD";
  let total = price;

  const client = {
    sandbox:
      "AaZRLPXefnQWxNQ4hIXSgEm4sj1q6kGNgNghuOHrs41defpTZMLwJhUU4Z6Hm7ju00f7w1GS2_jF038B",
    production: "YOUR-PRODUCTION-APP-ID",
  };
  return (
    <div style={{ position: "relative", zIndex: "1" }}>
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
        style={{
          color: "white",
          shape: "rect",
          size: "medium",
        }}
      />
    </div>
  );
}

export default PaymentBtn;
