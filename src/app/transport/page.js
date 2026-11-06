"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { destinations, transportOptions } from "@/data/tripData";

export default function TransportPage() {
  const [destinationId, setDestinationId] = useState("all");
  const options = useMemo(
    () => destinationId === "all"
      ? transportOptions
      : transportOptions.filter((option) => option.destinationId === destinationId),
    [destinationId],
  );

  return (
    <main className="page-container">
      <section className="page-intro">
        <p className="eyebrow">GETTING THERE IS PART OF IT</p>
        <h1>Find your way there</h1>
        <p>Sample travel options from Bengaluru to the destinations in TripMate.</p>
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
        <div className="transport-list">
          {options.map((option) => (
            <article className="transport-card" key={option.id}>
              <div className="transport-icon" aria-hidden="true">{option.emoji}</div>
              <div className="transport-details">
                <p className="eyebrow">{option.type} · {option.from} TO {option.destination.toUpperCase()}</p>
                <h3>{option.name}</h3>
                <p>Departure {option.departure} <span aria-hidden="true">→</span> Arrival {option.arrival}</p>
              </div>
              <div className="transport-price">
                <strong>₹{option.price.toLocaleString("en-IN")}</strong>
                <Link
                  className="button button-outline"
                  href={`/create-trip?destination=${encodeURIComponent(option.destination)}`}
                >
                  Add to trip
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="disclaimer">These are sample options for planning only; times and prices are illustrative.</p>
      </section>
    </main>
  );
}
