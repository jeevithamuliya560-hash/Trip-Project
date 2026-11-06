"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { destinations, foodSpots } from "@/data/tripData";

export default function FoodPage() {
  const [destinationId, setDestinationId] = useState("all");
  const options = useMemo(
    () => destinationId === "all"
      ? foodSpots
      : foodSpots.filter((spot) => spot.destinationId === destinationId),
    [destinationId],
  );

  return (
    <main className="page-container">
      <section className="page-intro">
        <p className="eyebrow">TASTE A LITTLE OF THE PLACE</p>
        <h1>Good food, good journeys</h1>
        <p>Local flavours and cosy stops to look forward to on your trip.</p>
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
          {options.map((spot) => (
            <article className="listing-card" key={spot.id}>
              <div className="listing-art food-art" aria-hidden="true">{spot.emoji}</div>
              <div className="card-content">
                <p className="eyebrow">{spot.destination} · {spot.cuisine}</p>
                <h3>{spot.name}</h3>
                <p>{spot.description}</p>
                <div className="listing-bottom">
                  <strong>About ₹{spot.price.toLocaleString("en-IN")} <small>/ person</small></strong>
                  <Link className="text-link" href={`/create-trip?destination=${encodeURIComponent(spot.destination)}`}>Add to plans →</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="disclaimer">Restaurant details and prices are illustrative sample data.</p>
      </section>
    </main>
  );
}
