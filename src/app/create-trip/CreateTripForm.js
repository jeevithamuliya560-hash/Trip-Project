"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { destinations } from "@/data/tripData";
import { useTripContext } from "@/context/TripContext";

export default function CreateTripForm({ initialDestination }) {
  const router = useRouter();
  const { addTrip } = useTripContext();
  const matchedDestination = destinations.find((item) => item.name === initialDestination);
  const [form, setForm] = useState({
    destinationId: matchedDestination?.id ?? destinations[0].id,
    startDate: "",
    endDate: "",
    budget: "",
    notes: "",
  });
  const [error, setError] = useState("");

  function updateField(event) {
    setForm((currentForm) => ({ ...currentForm, [event.target.name]: event.target.value }));
  }

  function submitTrip(event) {
    event.preventDefault();
    if (!form.startDate || !form.endDate || !form.budget) {
      setError("Add your travel dates and budget to continue.");
      return;
    }
    if (form.endDate < form.startDate) {
      setError("Your return date must be on or after your departure date.");
      return;
    }

    const destination = destinations.find((item) => item.id === form.destinationId);
    if (!destination) {
      setError("Choose one of the listed TripMate destinations.");
      return;
    }

    addTrip({
      destinationId: destination.id,
      destination: destination.name,
      startDate: form.startDate,
      endDate: form.endDate,
      budget: Number(form.budget),
      notes: form.notes.trim(),
    });
    router.push("/trips");
  }

  return (
    <main className="page-container narrow-container">
      <section className="page-intro">
        <p className="eyebrow">A GOOD TRIP STARTS WITH A LITTLE PLAN</p>
        <h1>Make a trip yours</h1>
        <p>Pick a destination and we’ll keep your plans together.</p>
      </section>
      <form className="form-card" onSubmit={submitTrip}>
        <label className="form-field">
          <span>Where to?</span>
          <select name="destinationId" onChange={updateField} value={form.destinationId}>
            {destinations.map((destination) => (
              <option key={destination.id} value={destination.id}>{destination.name} — {destination.location}</option>
            ))}
          </select>
        </label>
        <div className="form-row">
          <label className="form-field">
            <span>Leaving</span>
            <input name="startDate" onChange={updateField} required type="date" value={form.startDate} />
          </label>
          <label className="form-field">
            <span>Coming back</span>
            <input name="endDate" onChange={updateField} required type="date" value={form.endDate} />
          </label>
        </div>
        <label className="form-field">
          <span>Trip budget (₹)</span>
          <input
            min="1"
            name="budget"
            onChange={updateField}
            placeholder="e.g. 20000"
            required
            type="number"
            value={form.budget}
          />
        </label>
        <label className="form-field">
          <span>Anything you want to remember? <small>Optional</small></span>
          <textarea
            name="notes"
            onChange={updateField}
            placeholder="A place you want to see, who’s coming along..."
            rows="4"
            value={form.notes}
          />
        </label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="form-actions">
          <Link className="button button-quiet" href="/explore">Back to explore</Link>
          <button className="button button-primary" type="submit">Create my trip <span aria-hidden="true">→</span></button>
        </div>
      </form>
    </main>
  );
}
