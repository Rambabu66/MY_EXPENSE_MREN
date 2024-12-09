import React from "react";

const ExpenseDetails = ({ incomeAmt, expenseAmt ,ontaggle}) => {
  return (
    <>
      <div className="detailsall">
        <div className="balance">
          Your Balance is ₹
          <b style={{ color: "green" }}>{incomeAmt - expenseAmt}</b>
        </div>
        {/* Show Income & Expense amount */}
        <div className="amounts-container">
          Income :
          <span className="income-amount" style={{ textAlign: "start" }}>
            ₹{incomeAmt}
          </span>
          <span className="expense-amount">
            Expense :<b style={{ color: "red" }}>₹{expenseAmt}</b>
          </span>
        </div>
        <button className="button1" onClick={ontaggle}>Add Expenses</button>
      </div>
    </>
  );
};

export default ExpenseDetails;
