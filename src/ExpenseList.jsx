import React from "react";

const ExpenseList = ({ expenses }) => {
  if (!expenses.length) {
    return (
      <div className="expense-list">
        <h2>Expenses</h2>
        <p className="muted">No expenses yet. Add one to get started.</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Paid by</th>
              <th>Description</th>
              <th className="numeric">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.participant}</td>
                <td>{exp.description}</td>
                <td className="numeric">
                  {exp.amount.toLocaleString(undefined, {
                    style: "currency",
                    currency: "INR"
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;

