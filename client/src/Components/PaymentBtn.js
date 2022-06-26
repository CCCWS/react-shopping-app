import React from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";

function PaymentBtn({ price }) {
  const onSuccess = (payment) => {
    console.log("The payment was succeeded!", payment);
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
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={currency}
      total={total}
      onError={onError}
      onSuccess={onSuccess}
      onCancel={onCancel}
      style={{
        size: "responsive",
        color: "white",
        shape: "rect",
      }}
    />
  );
}

export default PaymentBtn;
