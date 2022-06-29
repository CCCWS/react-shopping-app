import React from "react";
import axios from "axios";
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
      "ATNb7MRGXfHYXNpiOfnrzEcyj0hJRekxGJqEekXgWLHuNJidcx8RoEmra4GmcpkOB7QWcWBYop_J8wXG",
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
          size: "large",
        }}
      />
    </div>
  );
}

export default PaymentBtn;
