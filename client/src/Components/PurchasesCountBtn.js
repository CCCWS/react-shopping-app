import React from "react";
import "./PurchasesCountBtn.css";

function PurchasesCountBtn({
  productSold,
  purchasesCount,
  setPurchasesCount,
  productCount,
  soldOut,
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
            setPurchasesCount(purchasesCount - 1);
          }}
        >
          -
        </button>
        <input
          type="number"
          className="PurchasesCountBtn-count"
          value={purchasesCount}
          id="count"
        />
        <button
          className="PurchasesCountBtn-count-btn"
          onClick={() => {
            if (soldOut === true) {
              return;
            }

            if (purchasesCount === productCount - productSold) {
              return;
            }
            setPurchasesCount(purchasesCount + 1);
          }}
        >
          +
        </button>
      </div>
    </section>
  );
}

export default PurchasesCountBtn;
