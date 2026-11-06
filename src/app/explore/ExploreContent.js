"use client";

import { useMemo, useState } from "react";
import DestinationCard from "@/components/DestinationCard";
import { destinations } from "@/data/tripData";

export default function ExploreContent({ initialQuery }) {
  const [query, setQuery] = useState(initialQuery);

  const filteredDestinations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return destinations;
    return destinations.filter((destination) =>
      [destination.name, destination.location, destination.description, destination.bestFor]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  return (
    <main className="page-container">
      <section className="page-intro">
        <p className="eyebrow">FIND YOUR KIND OF GETAWAY</p>
        <h1>Explore places</h1>
        <p>Three little starting points for a trip worth remembering.</p>
      </section>
      <section className="section-block">
        <label className="filter-field">
          <span>Search destinations</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Coorg, beaches, mountains..."
            value={query}
          />
        </label>
        {filteredDestinations.length ? (
          <div className="destination-grid">
            {filteredDestinations.map((destination) => (
              <DestinationCard destination={destination} key={destination.id} />
            ))}
          </div>
        ) : (
          <div className="empty-state"><p>No matching destinations. Try Coorg, Goa, or Manali.</p></div>
        )}
      </section>
    </main>
  );
}
