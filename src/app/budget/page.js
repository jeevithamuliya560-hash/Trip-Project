"use client";

import { useMemo, useState } from "react";
import ExpenseCard from "@/components/ExpenseCard";
import { useTripContext } from "@/context/TripContext";

const categories = ["Stay", "Transport", "Food", "Activities", "Other"];

export default function BudgetPage() {
  const { trips, expenses, addExpense, ready } = useTripContext();
  const [form, setForm] = useState({
    tripId: "",
    title: "",
    category: "Food",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [error, setError] = useState("");
  const tripBudgets = trips.reduce((total, trip) => total + Number(trip.budget || 0), 0);
  const totalSpent = expenses.reduce((total, expense) => total + Number(expense.amount || 0), 0);
  const remaining = tripBudgets - totalSpent;
  const expensesByCategory = useMemo(
    () => categories.map((category) => ({
      category,
      amount: expenses
        .filter((expense) => expense.category === category)
        .reduce((total, expense) => total + Number(expense.amount || 0), 0),
    })),
    [expenses],
  );

  function submitExpense(event) {
    event.preventDefault();
    if (!trips.length) {
      setError("Create a trip before adding an expense.");
      return;
    }
    if (!form.title.trim() || Number(form.amount) <= 0) {
      setError("Enter an expense name and an amount greater than zero.");
      return;
    }
    const tripId = form.tripId || trips[0].id;
    addExpense({
      ...form,
      tripId,
      title: form.title.trim(),
      amount: Number(form.amount),
    });
    setForm((currentForm) => ({ ...currentForm, title: "", amount: "" }));
    setError("");
  }

  return (
    <main className="page-container">
      <section className="page-intro">
        <p className="eyebrow">SPEND ON WHAT MATTERS TO YOU</p>
        <h1>Your travel budget</h1>
        <p>A simple overview of the budgets and expenses you’ve added.</p>
      </section>
      <section className="budget-summary">
        <article className="summary-card summary-primary">
          <span>Total trip budgets</span>
          <strong>₹{tripBudgets.toLocaleString("en-IN")}</strong>
          <small>Across {trips.length} {trips.length === 1 ? "trip" : "trips"}</small>
        </article>
        <article className="summary-card">
          <span>Recorded expenses</span>
          <strong>₹{totalSpent.toLocaleString("en-IN")}</strong>
          <small>{expenses.length} {expenses.length === 1 ? "expense" : "expenses"} recorded</small>
        </article>
        <article className="summary-card">
          <span>Budget remaining</span>
          <strong className={remaining < 0 ? "over-budget" : ""}>₹{remaining.toLocaleString("en-IN")}</strong>
          <small>{remaining < 0 ? "Over the combined trip budget" : "Across your planned trips"}</small>
        </article>
      </section>
      <section className="budget-layout section-block">
        <div className="budget-panel">
          <div className="section-heading"><h2>Recent expenses</h2></div>
          {ready && expenses.length ? (
            <div className="expense-list">
              {expenses.map((expense) => <ExpenseCard expense={expense} key={expense.id} />)}
            </div>
          ) : (
            <div className="empty-state"><p>Your expenses will show up here.</p></div>
          )}
          <div className="category-breakdown">
            <h3>By category</h3>
            {expensesByCategory.map((item) => (
              <div className="category-row" key={item.category}>
                <span>{item.category}</span>
                <strong>₹{item.amount.toLocaleString("en-IN")}</strong>
              </div>
            ))}
          </div>
        </div>
        <form className="form-card expense-form" onSubmit={submitExpense}>
          <p className="eyebrow">KEEP A LITTLE TRACK</p>
          <h2>Add an expense</h2>
          <label className="form-field">
            <span>Trip</span>
            <select
              disabled={!trips.length}
              onChange={(event) => setForm((currentForm) => ({ ...currentForm, tripId: event.target.value }))}
              value={form.tripId || trips[0]?.id || ""}
            >
              {trips.length ? trips.map((trip) => (
                <option key={trip.id} value={trip.id}>{trip.destination}</option>
              )) : <option value="">Create a trip first</option>}
            </select>
          </label>
          <label className="form-field">
            <span>What was it for?</span>
            <input
              onChange={(event) => setForm((currentForm) => ({ ...currentForm, title: event.target.value }))}
              placeholder="e.g. Dinner"
              value={form.title}
            />
          </label>
          <label className="form-field">
            <span>Category</span>
            <select
              onChange={(event) => setForm((currentForm) => ({ ...currentForm, category: event.target.value }))}
              value={form.category}
            >
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>
          <div className="form-row">
            <label className="form-field">
              <span>Amount (₹)</span>
              <input
                min="1"
                onChange={(event) => setForm((currentForm) => ({ ...currentForm, amount: event.target.value }))}
                type="number"
                value={form.amount}
              />
            </label>
            <label className="form-field">
              <span>Date</span>
              <input
                onChange={(event) => setForm((currentForm) => ({ ...currentForm, date: event.target.value }))}
                type="date"
                value={form.date}
              />
            </label>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-primary button-full" type="submit">Add expense <span aria-hidden="true">+</span></button>
        </form>
      </section>
    </main>
  );
}
