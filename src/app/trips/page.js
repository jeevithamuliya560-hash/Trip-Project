"use client";

import Link from "next/link";
import Tripcard from "@/components/Tripcard";
import { useTripContext } from "@/context/TripContext";

export default function TripsPage() {
  const { trips, removeTrip, ready } = useTripContext();
  const sortedTrips = trips.slice().sort((first, second) => first.startDate.localeCompare(second.startDate));

  return (
    <main className="page-container">
      <section className="page-intro">
        <p className="eyebrow">THE GOOD THINGS YOU’RE LOOKING FORWARD TO</p>
        <h1>My trips</h1>
        <p>Keep your dates, notes, and plans in one easy place.</p>
      </section>
      <section className="section-block">
        <div className="section-heading">
          <h2>{trips.length} {trips.length === 1 ? "trip" : "trips"} planned</h2>
          <Link className="button button-primary" href="/create-trip">Create a trip <span aria-hidden="true">+</span></Link>
        </div>
        {!ready ? (
          <div className="empty-state"><p>Loading your trip plans…</p></div>
        ) : sortedTrips.length ? (
          <div className="trip-list">
            {sortedTrips.map((trip) => (
              <Tripcard key={trip.id} onDelete={removeTrip} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No trips just yet. Pick a place and start dreaming.</p>
            <Link className="button button-primary" href="/create-trip">Plan your first trip</Link>
          </div>
        )}
      </section>
    </main>
  );
}
