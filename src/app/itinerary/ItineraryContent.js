"use client";

import Link from "next/link";
import { destinations } from "@/data/tripData";
import { useTripContext } from "@/context/TripContext";

const samplePlans = {
  coorg: [
    ["Day 1", "Check in and unwind", "Settle into your homestay and enjoy a relaxed evening."],
    ["Day 2", "Coffee country", "Visit a coffee estate, then explore a nearby waterfall."],
    ["Day 3", "A slow morning", "Try a local breakfast and take a scenic walk before heading home."],
  ],
  goa: [
    ["Day 1", "Arrive by the coast", "Check in, find a sunset spot, and enjoy a relaxed dinner."],
    ["Day 2", "Beach day", "Explore the shoreline and leave time for a long seaside lunch."],
    ["Day 3", "Old Goa", "Visit historic neighbourhoods before your journey home."],
  ],
  manali: [
    ["Day 1", "Mountain arrival", "Check in, take it easy, and get used to the mountain air."],
    ["Day 2", "Valley views", "Explore a nearby valley and stop for a warm local lunch."],
    ["Day 3", "Town and trails", "Enjoy a gentle walk and a last look at the mountain views."],
  ],
};

export default function ItineraryContent({ tripId }) {
  const { trips, ready } = useTripContext();
  const trip = trips.find((item) => item.id === tripId) ?? trips[0];
  const destination = destinations.find((item) => item.id === trip?.destinationId);
  const plan = samplePlans[destination?.id] ?? [];

  return (
    <main className="page-container narrow-container">
      <section className="page-intro">
        <p className="eyebrow">A LITTLE INSPIRATION FOR EACH DAY</p>
        <h1>Trip itinerary</h1>
        <p>A flexible sample plan. Make it your own as you go.</p>
      </section>
      {!ready ? (
        <div className="empty-state"><p>Loading your trip plans…</p></div>
      ) : trip ? (
        <section className="itinerary-panel">
          <div className="itinerary-heading">
            <div>
              <p className="eyebrow">{destination?.location}</p>
              <h2>{trip.destination}</h2>
            </div>
            <Link className="button button-outline" href="/trips">All trips</Link>
          </div>
          <p className="itinerary-dates">{trip.startDate} — {trip.endDate}</p>
          <div className="itinerary-days">
            {plan.map(([day, title, description]) => (
              <article className="itinerary-day" key={day}>
                <span className="day-label">{day}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
          <p className="disclaimer">This is an editable-in-spirit sample itinerary, not a reservation or live travel schedule.</p>
        </section>
      ) : (
        <div className="empty-state">
          <p>Create a trip first, and your itinerary will be ready here.</p>
          <Link className="button button-primary" href="/create-trip">Create a trip</Link>
        </div>
      )}
    </main>
  );
}
