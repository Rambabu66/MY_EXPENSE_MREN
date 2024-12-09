import React, { useState } from "react";
import { handleError } from "../../../utils";

const ExpensesForm = ({addTransition,show,ontaggle }) => {
  const [expenseInfo, setExpenseInfo] = useState({
    amount: "",
    text: "",
  });
  const { amount, text } = expenseInfo;
  const handleChnage = (e) => {
    const { name, value } = e.target;
    const copyexpeseInfo = { ...expenseInfo };
    copyexpeseInfo[name] = value;
    setExpenseInfo(copyexpeseInfo);
  };
  const addExpenses = (e) => {
    e.preventDefault();
    const { amount, text } = expenseInfo;
    if (!amount || !text) {
      handleError("Please add Expense Details");
      return;
    }
    addTransition(expenseInfo );
    setExpenseInfo({
      amount: "",
      text: "",
    });
  };

  return (
    <>
    {show && 
      <div className="expensform">
        <div className="expense-container">
          <button className="close" onClick={ontaggle}>X</button>
          <form onSubmit={addExpenses}>
            <input
              type="text"
              placeholder="enter your text"
              name="text"
              value={text}
              onChange={handleChnage}
            />
            <input
              type="number"
              placeholder="enter your amount"
              name="amount"
              value={amount}
              onChange={handleChnage}
            />
            <button className="button2" >Add Expenses</button>
          </form>
        </div>
      </div>
}
    </>
  );
};

export default ExpensesForm;
