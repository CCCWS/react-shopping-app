import React from "react";
import "./PurchasesCountBtn.css";

function PurchasesCountBtn({
  purchasesCount,
  setPurchasesCount,
  productCount,
}) {
  return (
    <section className="PurchasesCountBtn-section">
      <div>
        <button
          className="PurchasesCountBtn-count-btn"
          onClick={() => {
            if (purchasesCount === 1) {
              return;
            }

            setPurchasesCount(parseInt(purchasesCount, 10) - 1);
          }}
        >
          -
        </button>
        <input
          readOnly
          type="number"
          className="PurchasesCountBtn-count"
          value={purchasesCount}
          id="count"
        />
        <button
          className="PurchasesCountBtn-count-btn"
          onClick={() => {
            if (productCount === 0) {
              return;
            }

            if (purchasesCount === productCount) {
              return;
            }

            setPurchasesCount(parseInt(purchasesCount, 10) + 1);
          }}
        >
          +
        </button>
      </div>
    </section>
  );
}

export default React.memo(PurchasesCountBtn);
