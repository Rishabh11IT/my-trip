import React, { useState } from "react";
import TripForm from "./TripForm";
import ExpenseList from "./ExpenseList";
import Summary from "./Summary";

const App = () => {
  const [tripCreated, setTripCreated] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const handleCreateTrip = () => {
    setTripCreated(true);
  };

  const handleAddParticipant = (name) => {
    if (!name.trim()) return;
    if (participants.includes(name.trim())) return;
    setParticipants((prev) => [...prev, name.trim()]);
  };

  const handleAddExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  const handleClearTrip = () => {
    setParticipants([]);
    setExpenses([]);
    setTripCreated(false);
  };

  return (
    <div className="app">
      {!tripCreated ? (
        <main className="landing">
          <h1>Trip Expense Manager</h1>
          <p>
            Track shared expenses with friends or family, see totals, and know
            exactly who owes whom.
          </p>
          <button className="primary-btn" onClick={handleCreateTrip}>
            Create New Trip
          </button>
        </main>
      ) : (
        <main className="trip-page">
          <header className="trip-header">
            <div>
              <h1>Trip Expense Manager</h1>
              <p className="subtitle">
                Add participants and expenses to see a live summary.
              </p>
            </div>
            <button className="secondary-btn" onClick={handleClearTrip}>
              Start Over
            </button>
          </header>

          <section className="trip-layout">
            <div className="panel">
              <TripForm
                participants={participants}
                onAddParticipant={handleAddParticipant}
                onAddExpense={handleAddExpense}
              />
            </div>

            <div className="panel">
              <ExpenseList expenses={expenses} />
            </div>
          </section>

          <section className="panel summary-panel">
            <Summary participants={participants} expenses={expenses} />
          </section>
        </main>
      )}
    </div>
  );
};

export default App;

