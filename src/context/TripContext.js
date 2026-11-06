"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { initialExpenses, initialTrips } from "@/data/tripData";

const STORAGE_KEY = "tripmate-state";
const TripContext = createContext(null);

export function TripProvider({ children }) {
  const [trips, setTrips] = useState(initialTrips);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const savedState = window.localStorage.getItem(STORAGE_KEY);
        if (savedState) {
          const parsedState = JSON.parse(savedState);
          if (Array.isArray(parsedState.trips) && Array.isArray(parsedState.expenses)) {
            setTrips(parsedState.trips);
            setExpenses(parsedState.expenses);
          } else {
            throw new Error("Saved TripMate data has an invalid shape.");
          }
        }
      } catch (error) {
        console.error("Could not load saved TripMate data.", error);
      } finally {
        setReady(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!ready) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ trips, expenses }));
    } catch (error) {
      console.error("Could not save TripMate data.", error);
    }
  }, [expenses, ready, trips]);

  function addTrip(trip) {
    const newTrip = {
      ...trip,
      id: globalThis.crypto?.randomUUID?.() ?? `trip-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setTrips((currentTrips) => [newTrip, ...currentTrips]);
    return newTrip;
  }

  function removeTrip(tripId) {
    setTrips((currentTrips) => currentTrips.filter((trip) => trip.id !== tripId));
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.tripId !== tripId),
    );
  }

  function addExpense(expense) {
    setExpenses((currentExpenses) => [
      {
        ...expense,
        id: globalThis.crypto?.randomUUID?.() ?? `expense-${Date.now()}`,
      },
      ...currentExpenses,
    ]);
  }

  const value = useMemo(
    () => ({ trips, expenses, ready, addTrip, removeTrip, addExpense }),
    [trips, expenses, ready],
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTripContext() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTripContext must be used within a TripProvider.");
  }
  return context;
}