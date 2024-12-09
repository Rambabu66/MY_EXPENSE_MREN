import React, { useCallback, useEffect, useState } from "react";
import ExpenseDetails from "./ExpenseDetails";
import ExpensesForm from "./ExpensesForm";
import ExpenseTable from "./ExpenseTable";
import "./MainExpense.css";
import { APICALL_URL, handleError, handleSucess } from "./../../../utils";
import { useNavigate } from "react-router-dom";
const MainExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomeAmt, setIncomeAmt] = useState(0);
  const [expenseAmt, setExpenseAmt] = useState(0);

  const navigate = useNavigate();

  const [show,setShow]=useState(false)

  const ontaggle=useCallback(()=>{setShow(preshow => !preshow)},[])


  useEffect(() => {
    
    const amounts = expenses.map(item => item.amount);
    const income = amounts.filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0);
        console.log(income);
        
    const exp = amounts.filter(item => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1;
        
    setIncomeAmt(income);
    setExpenseAmt(exp);
  }, [expenses]);

  const deleteExpens = async (id) => {
    try {
      const url = `${APICALL_URL}/expenses/${id}`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        method: "DELETE",
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const result = await response.json();
      handleSucess(result?.message);
      console.log("--result", result.data);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const url = `${APICALL_URL}/expenses/`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const result = await response.json();
      console.log("--result", result.data);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  const addTransaction = async (data) => {
    try {
      const url = `${APICALL_URL}/expenses`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      const result = await response.json();
      handleSucess(result?.message);
      console.log("--result", result.data);
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      <div className="allexpenses">
        <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt} ontaggle={ontaggle} />
        <ExpensesForm addTransition={addTransaction} show={show} ontaggle={ontaggle} />
        <ExpenseTable expenses={expenses} deletTransition={deleteExpens} />
      </div>
    </>
  );
};

export default MainExpenses;
