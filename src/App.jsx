import React, { useState, useEffect } from "react";
import TripForm from "./TripForm";
import ExpenseList from "./ExpenseList";
import Summary from "./Summary";

const STORAGE_KEY = "trip-expense-manager-data";

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || typeof data !== "object") return null;
    return {
      tripCreated: Boolean(data.tripCreated),
      participants: Array.isArray(data.participants) ? data.participants : [],
      expenses: Array.isArray(data.expenses) ? data.expenses : [],
    };
  } catch {
    return null;
  }
};

const saveToStorage = (tripCreated, participants, expenses) => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ tripCreated, participants, expenses })
    );
  } catch (_) {}
};

// Read saved data once so we never overwrite it with empty state on first load
const getInitialState = () => {
  const saved = loadFromStorage();
  return {
    tripCreated: saved?.tripCreated ?? false,
    participants: saved?.participants ?? [],
    expenses: saved?.expenses ?? [],
  };
};

const App = () => {
  const [tripCreated, setTripCreated] = useState(() => getInitialState().tripCreated);
  const [participants, setParticipants] = useState(() => getInitialState().participants);
  const [expenses, setExpenses] = useState(() => getInitialState().expenses);

  // Save to localStorage whenever trip data changes (not on first paint, so we don't overwrite saved data)
  useEffect(() => {
    saveToStorage(tripCreated, participants, expenses);
  }, [tripCreated, participants, expenses]);

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

