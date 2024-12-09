import React from "react";

const ExpenseTable = ({ expenses,deletTransition }) => {
  return (
    <div className="table-conatiners">
      <table>
        <thead>
          <tr>
            <th>DATE</th>
            <th>Text</th>
            <th>Amount</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((item, i) => (
            <tr key={i}>
              <td>{item.createAt}</td>
              <td>{item.text}</td>
              <td
                 className="expense-amount"
                 style={{ color: item.amount > 0 ? '#27ae60' : '#c0392b' }}
             >
                {item.amount}
              </td>
              
              <td className="delet-button" onClick={()=>deletTransition(item._id)}>Deleted</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
