import React, { useMemo } from "react";

const Summary = ({ participants, expenses }) => {
  const { total, perParticipant, balances } = useMemo(() => {
    if (!participants.length) {
      return { total: 0, perParticipant: 0, balances: {} };
    }

    const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

    const spentMap = participants.reduce((acc, p) => {
      acc[p] = 0;
      return acc;
    }, {});

    for (const exp of expenses) {
      if (!spentMap[exp.participant] && spentMap[exp.participant] !== 0) {
        spentMap[exp.participant] = 0;
      }
      spentMap[exp.participant] += exp.amount;
    }

    const share = participants.length ? totalAmount / participants.length : 0;

    const balancesObj = participants.reduce((acc, p) => {
      acc[p] = spentMap[p] - share;
      return acc;
    }, {});

    return {
      total: totalAmount,
      perParticipant: share,
      balances: balancesObj
    };
  }, [participants, expenses]);

  if (!participants.length) {
    return (
      <div>
        <h2>Summary</h2>
        <p className="muted">Add at least one participant to see the summary.</p>
      </div>
    );
  }

  const formatCurrency = (value) =>
    value.toLocaleString(undefined, {
      style: "currency",
      currency: "INR"
    });

  return (
    <div>
      <h2>Summary</h2>
      <div className="summary-grid">
        <div className="summary-card">
          <span className="label">Total spent</span>
          <span className="value">{formatCurrency(total)}</span>
        </div>
        <div className="summary-card">
          <span className="label">Per participant</span>
          <span className="value">{formatCurrency(perParticipant)}</span>
        </div>
      </div>

      <h3 className="summary-subtitle">Balance by participant</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Participant</th>
              <th className="numeric">Spent</th>
              <th className="numeric">Balance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p) => {
              const spent = expenses
                .filter((e) => e.participant === p)
                .reduce((sum, e) => sum + e.amount, 0);
              const bal = balances[p] || 0;
              const status =
                bal > 0.01
                  ? "Should receive"
                  : bal < -0.01
                  ? "Owes"
                  : "Settled";

              return (
                <tr key={p}>
                  <td>{p}</td>
                  <td className="numeric">{formatCurrency(spent)}</td>
                  <td className="numeric">{formatCurrency(bal)}</td>
                  <td
                    className={
                      bal > 0.01
                        ? "status positive"
                        : bal < -0.01
                        ? "status negative"
                        : "status neutral"
                    }
                  >
                    {status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summary;

