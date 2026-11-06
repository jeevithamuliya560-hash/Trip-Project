"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { destinations, stays } from "@/data/tripData";

export default function StaysPage() {
  const [destinationId, setDestinationId] = useState("all");
  const options = useMemo(
    () => destinationId === "all"
      ? stays
      : stays.filter((stay) => stay.destinationId === destinationId),
    [destinationId],
  );

  return (
    <main className="page-container">
      <section className="page-intro">
        <p className="eyebrow">A PLACE TO PUT YOUR FEET UP</p>
        <h1>Find your stay</h1>
        <p>Small sample stays for Coorg, Goa, and Manali.</p>
      </section>
      <section className="section-block">
        <label className="filter-field compact-filter">
          <span>Destination</span>
          <select onChange={(event) => setDestinationId(event.target.value)} value={destinationId}>
            <option value="all">All destinations</option>
            {destinations.map((destination) => (
              <option key={destination.id} value={destination.id}>{destination.name}</option>
            ))}
          </select>
        </label>
        <div className="listing-grid">
          {options.map((stay) => (
            <article className="listing-card" key={stay.id}>
              <div className="listing-art" aria-hidden="true">{stay.emoji}</div>
              <div className="card-content">
                <p className="eyebrow">{stay.destination} · {stay.type}</p>
                <h3>{stay.name}</h3>
                <p><span className="rating">★ {stay.rating}</span> <span className="muted"> · Sample listing</span></p>
                <div className="listing-bottom">
                  <strong>₹{stay.pricePerNight.toLocaleString("en-IN")} <small>/ night</small></strong>
                  <Link className="text-link" href={`/create-trip?destination=${encodeURIComponent(stay.destination)}`}>Plan stay →</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="disclaimer">Accommodation names, ratings, and prices are illustrative sample data.</p>
      </section>
    </main>
  );
}
