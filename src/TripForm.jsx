import React, { useState } from "react";

const TripForm = ({ participants, onAddParticipant, onAddExpense }) => {
  const [newParticipant, setNewParticipant] = useState("");
  const [expenseParticipant, setExpenseParticipant] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddParticipant = (e) => {
    e.preventDefault();
    const name = newParticipant.trim();
    if (!name) return;
    onAddParticipant(name);
    setNewParticipant("");
    if (!expenseParticipant) {
      setExpenseParticipant(name);
    }
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseParticipant || !description.trim() || !amount) return;
    const value = parseFloat(amount);
    if (Number.isNaN(value) || value <= 0) return;

    onAddExpense({
      id: Date.now(),
      participant: expenseParticipant,
      description: description.trim(),
      amount: value
    });

    setDescription("");
    setAmount("");
  };

  return (
    <div className="form-section">
      <h2>Participants & Expenses</h2>

      <form className="inline-form" onSubmit={handleAddParticipant}>
        <div className="field-group">
          <label htmlFor="participant-name">Add participant</label>
          <input
            id="participant-name"
            type="text"
            placeholder="e.g. Family 1"
            value={newParticipant}
            onChange={(e) => setNewParticipant(e.target.value)}
          />
        </div>
        <button type="submit" className="primary-btn">
          Add
        </button>
      </form>

      {participants.length > 0 && (
        <>
          <div className="chips">
            {participants.map((p) => (
              <span key={p} className="chip">
                {p}
              </span>
            ))}
          </div>

          <hr className="divider" />

          <form className="expense-form" onSubmit={handleAddExpense}>
            <h3>Add expense</h3>
            <div className="field-grid">
              <div className="field-group">
                <label htmlFor="expense-participant">Paid by</label>
                <select
                  id="expense-participant"
                  value={expenseParticipant}
                  onChange={(e) => setExpenseParticipant(e.target.value)}
                >
                  <option value="">Select participant</option>
                  {participants.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-group">
                <label htmlFor="expense-description">Description</label>
                <input
                  id="expense-description"
                  type="text"
                  placeholder="e.g. Lunch"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="field-group">
                <label htmlFor="expense-amount">Amount</label>
                <input
                  id="expense-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="primary-btn">
              Add expense
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default TripForm;

